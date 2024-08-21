//import React from 'react'
import React, { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime,Legend, 
 SplineAreaSeries} from '@syncfusion/ej2-react-charts';

 import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {areaCustomSeries,areaPrimaryXAxis,areaPrimaryYAxis} from '../../data/dummy';
import { Box,Typography,Stack,List,ListItem,TextField,CircularProgress,Button,Modal } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { Header } from '../../components';
import { useState } from 'react';
import authAxois from '../../requestHandler';

const Pyramid = () => {
  const [teamOne,setTeamOne]=useState();
  const [teamTwo,setTeamTwo]=useState();
  const [link,setLink]=useState();
  const [myfiles,setMyfiles]=useState()
  const [selectedItem,setSelectedItem]=useState();
  const [open,setOpen]=useState(false)
  const [news,setNews]=useState([])
  const [formData, setFormData] = useState({
    firstTeamName: '',
    secondTeamName: '',
    date: '',
    time: '',
    link: '',
  });


////// file uploading functionality...
const handleClose = () => {
  setOpen(false); // Close the modal
 };


 const handleEdit = (item) => {
  setCurrentItem(item); // Set the current item to be edited
  setFormData({
    firstTeamName: item.firstTeamName,
    secondTeamName: item.secondTeamName,
    data: item.data,
    time: item.time,
    link: item.link,
  });
  setOpen(true); // Open the modal
 };

 const handleFormChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleFormSubmit = () => {
  // Implement your update logic here
  console.log('Updated data:', formData);
  setOpen(false); // Close the modal after submitting the form
 
  // Optionally, you can update the news state with the new data
  setNews(news.map(item => 
    item.id === currentItem.id ? { ...currentItem, ...formData } : item
  ));
 };


const onFileUpload = async () => {
  let data=[]
  if (!myfiles) {
    toast.error("Please select a file to upload.");
    return;
  }

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const isAM = hours < 12;
  const period = isAM ? 'AM' : 'PM';
  const hours12 = hours % 12 || 12;

  const info = {
    teamOne,
    teamTwo,
    link,
    date: Date().slice(0, 15),
    time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`,
  };

  const formData = new FormData();
  formData.append("image", myfiles);  
  formData.append("teamOne", info.teamOne);
  formData.append("teamTwo", info.teamTwo);
  formData.append("link", info.link);
  formData.append("date", info.date);
  formData.append("time", info.time);
  formData.append("team",selectedItem)

  data.push([...formData.entries()]); // Check the formData content
 console.log(formData)
  try {
    const response = await authAxois.post("/admin/save/live-match", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log('Server response:', response.data);
    if (response.status === 200) {
      toast.success('Live Match has been posted');
    }
  } catch (error) {
    toast.error('Error uploading file: ' + error.response?.data?.message || error.message);
  }
};

const fetch=()=>{
   authAxois.get('/admin/save/live-match').then((res)=>{
    console.log(res.data)
    setNews(res.data.data)
   }).catch(e=>e)
}

useEffect(()=>{
   fetch();
},[])

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <ToastContainer/>
         <Header category="Page" title="Post Live Match"/>
        <Box>
          <Typography variant='h6' sx={{color:'black'}}>Leags</Typography>
           <select value={selectedItem} onChange={(e)=>{setSelectedItem(e.target.value)}} style={{
                     width:'300px',
                     border:'1px solid black',
                     padding:'10px',
                     color:'black'}}>
                <option>English primer Leag</option>
                <option>Spen Leag</option>
                <option>French Leag</option>
                <option>German Leag</option>
                <option>Champions Leag</option>
                <option>Areb Leg</option>
                <option>American Leg</option>
           </select>
           <br/><br/>
           <Typography variant='h6' sx={{color:'black'}}>First Team</Typography>
           <TextField value={teamOne} onChange={(e)=>{setTeamOne(e.target.value)}} placeholder='First team name' sx={{width:'300px'}}/><br/><br/>
           <Typography variant='h6' sx={{color:'black',width:'300px'}}>Second Team</Typography>
           <TextField value={teamTwo} onChange={(e)=>{setTeamTwo(e.target.value)}} placeholder='second team name' sx={{width:'300px'}}/><br/><br/>
           <Typography variant='h6' sx={{color:'black',width:'300px'}}>Links</Typography>
           <TextField value={link} onChange={(e)=>{setLink(e.target.value)}} placeholder='URL' sx={{width:'300px'}}/><br/><br/>
           <Typography>Attach Images</Typography>
           <TextField type='file' sx={{color:'black',width:'300px'}} onChange={(e)=>{setMyfiles(e.target.files[0])}}/><br/><br/>
           <Button sx={{backgroundColor:'#2e81f5',color:'#fff',width:'300px'}} onClick={onFileUpload}>Post</Button>
        </Box>

        <Box sx={{
  position:{md:'absolute',xs:'relative'},
  backgroundColor:'#fff',
  width:{xs:'250px',md:'350px',xl:'400px'},
  height:'560px',
  marginLeft:{md:'450px',xs:'20px'},
  marginTop:{md:'-650px',xs:'100px'},
  border:'1px solid gray',
  padding:'10px',
  overflow:'scroll',
  borderRadius:'20px'
}}>
   <Typography variant='h4' sx={{
      color:'black'
   }}>Recent Post</Typography>
  
   {/*** 
   news?.map((item, index) => {
  // Extract video ID from YouTube link
  const videoId = item.link.split('v=')[1];
  const ampersandPosition = videoId?.indexOf('&');
  if(ampersandPosition !== -1) {
    videoId = videoId.substring(0, ampersandPosition);
  }

  // Construct the thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <Stack key={index}>
      <List>
        <Box
          sx={{
            backgroundColor: '#f4f4f4',
            padding: '10px',
            margin: '10px',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <img
            src={thumbnailUrl}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '30px',
            }}
            alt="YouTube Thumbnail"
          />
          <ListItem
            sx={{
              position: 'absolute',
              fontSize: '12px',
              marginLeft: '60px',
              marginTop: '-50px',
              fontWeight: 'bold',
            }}
          >
            {item.source}
          </ListItem>

          <ListItem
            sx={{
              position: 'absolute',
              fontSize: '10px',
              width:'300px',
              marginLeft: '60px',
              marginTop: '-30px',
            }}
          >
            {item.title}
          </ListItem>

          <ListItem
            sx={{
              fontSize: '9px',
              marginLeft: '60px',
              marginTop: '0px',
            }}
          >
            On: {item.date} at {item.time}
          </ListItem>
          
          <Typography>{item.description}</Typography>
        </Box>
      </List>
    </Stack>
  );
})
*****/}

{news?.map((item, index) => {
        // Extract video ID from YouTube link
       

        // Construct the thumbnail URL
        const thumbnailUrl =''

        return (
          <Stack key={index}>
            <List>
              <Box
                sx={{
                  backgroundColor: '#f4f4f4',
                  padding: '10px',
                  margin: '10px',
                  borderRadius: '10px',
                  position: 'relative',
                  width:{xs:'200px',md:'300px'}
                }}
              >
                <img
                  src={item.images}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '30px',
                  }}
                  alt="YouTube Thumbnail"
                />
                <ListItem
                  sx={{
                    position: 'absolute',
                    fontSize: '12px',
                    marginLeft: '60px',
                    marginTop: '-50px',
                    fontWeight: 'bold',
                  }}
                >
                 <Typography sx={{backgroundColor:'rgb(13, 110, 117)',
                                 color:'#fff',
                                 padding:'5px',
                                 borderRadius:'5px'}}>{item.firstTeamName}</Typography> Vs 
              <Typography sx={{backgroundColor:'gold',
                               padding:'5px',
                               borderRadius:'5px',
                color:'black'}}>{item.secondTeamName}</Typography>
                </ListItem>
        

                <ListItem
                  sx={{
                    fontSize: '9px',
                    marginLeft: '60px',
                    marginTop: '-5px',
                  }}
                >
                  On: {item.data} at {item.time}
                </ListItem>

                 
                <ListItem
                  sx={{
                    position: 'absolute',
                    fontSize: '10px',
                    width: '300px',
                    marginLeft: '30px',
                    marginTop: '-5px',
                    color:'black'
                  }}
                >
                  {item.link}
                </ListItem><br/><br/>

                {/* Edit and Delete Buttons */}
                <Box
                  sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
           
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(item)}
                    sx={{
                      width:'100%',
                      border:'1px solid red',
                      backgroundColor:'#fff',
                      color:'red'

                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </List>
          </Stack>



        );
      })}

</Box>
{/* Modal for Editing */}
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="edit-modal-title"
  aria-describedby="edit-modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%', // Set width to 90% of the screen width
      maxWidth: 400, // Set a maximum width for larger screens
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: { xs: 2, sm: 4 }, // Adjust padding for small screens
    }}
  >
    <Typography id="edit-modal-title" variant="h6" component="h2">
      Edit News Item
    </Typography>

    <TextField
      label="Source"
      name="source"
      value={formData.source}
      onChange={handleFormChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Title"
      name="title"
      value={formData.title}
      onChange={handleFormChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Date"
      name="date"
      value={formData.date}
      onChange={handleFormChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Time"
      name="time"
      value={formData.time}
      onChange={handleFormChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Description"
      name="description"
      value={formData.description}
      onChange={handleFormChange}
      fullWidth
      margin="normal"
      multiline
      rows={4}
    />

    <Box
      sx={{
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons vertically on small screens
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleFormSubmit}
        sx={{ mb: { xs: 1, sm: 0 } }} // Add margin-bottom for small screens
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClose}
      >
        Cancel
      </Button>
    </Box>
  </Box>
</Modal>

       

    </div>
  )
}

export default Pyramid