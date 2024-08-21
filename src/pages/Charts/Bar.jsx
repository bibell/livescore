//import React from 'react'
import React, { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime,Legend, 
 SplineAreaSeries} from '@syncfusion/ej2-react-charts';

import {areaCustomSeries,areaPrimaryXAxis,areaPrimaryYAxis} from '../../data/dummy';
import { Box,Typography,Stack,List,ListItem,TextField,CircularProgress,Button,Modal } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { Header } from '../../components';
import { useState } from 'react';
import authAxois from '../../requestHandler';


const Bar = () => {
  const [title,setTitle]=useState();
  const [source,setSource]=useState();
  const [myData,setmyData]=useState();
  const [myfiles,setMyfiles]=useState(null)
  const [news,setNews]=useState();
  const [club,setClub]=useState()
  const [open, setOpen] = useState(false);
  const [progress,setProgress]=useState('none')
  const [currentItem, setCurrentItem] = useState(null); 
  const [link,setLink]=useState();
  const [auther,setAuther]=useState();
  const [formData, setFormData] = useState({
    source: '',
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const {currentMode} = useStateContext();
  
useEffect(()=>{  
  fetchData();  
},[])


const fetchData=async()=>{
 const response=await authAxois.get('/admin/users/transfer')
 console.log(response.data)
 setNews(response.data.data) 
}

const handleClose = () => {
  setOpen(false); // Close the modal
 };
 
 const handlePost=()=>{
   const now = new Date();
   const hours = now.getHours();
   const minutes = now.getMinutes();
   const seconds = now.getSeconds();
 
   const isAM = hours < 12;
   const period = isAM ? 'AM' : 'PM';
 
   // Convert to 12-hour format
   const hours12 = hours % 12 || 12;
 
    const info={
     source:auther,
     title:title,
     link:link,
     club:club,
     description:myData,
     
     date: Date().slice(0, 15),
     time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`, 
    }
 
    console.log(info)
    authAxois.post('/admin/save/heightlight',info).then((res)=>{
     console.log('user database been send to the backend')
     console.log(res)
    }).catch(e=>e)
 }

 const handleEdit = (item) => {
  setCurrentItem(item); // Set the current item to be edited
  setFormData({
    source: item.source,
    title: item.title,
    date: item.date,
    time: item.time,
    description: item.description,
  });
  setOpen(true); // Open the modal
 };

 const onFileUpload = async () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  setProgress('block')

  const isAM = hours < 12;
  const period = isAM ? 'AM' : 'PM';

  // Convert to 12-hour format
  const hours12 = hours % 12 || 12;

   const info={
    title:title,
    auther:auther,
    mydata:myData,
    file:myfiles,
    club:club,
    date: Date().slice(0, 15),
    time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`, 
   }
 

  const formData = new FormData();
  formData.append("image", myfiles);  // "image" is the field name in the backend
  formData.append("auther",info.auther);
  formData.append("title",info.title);
  formData.append('club',info.club)
  formData.append("mydata",info.mydata);
  formData.append("date",info.date)
  formData.append("time",info.time)
  
  //const newForm=formData.append("image",myfiles)
 

  try {
      const response = await authAxois.post("/admin/save/transfer", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
      console.log('Server response:', response.data);
      if(response.status===200){
        setProgress('none')
        //alert('sucess')
        //toast.success('Your news has been updated Successfully')
        window.location.reload();
      }
  } catch (error) {
      console.error('Error uploading file:', error.response.data);
  }
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


  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
    <Header category="Transfer News" title="Updated Transfer News"/>
    <Box>
    <Box>
               <Typography variant='h6'>Source</Typography>
                <TextField value={auther} onChange={(e)=>{setAuther(e.target.value)}} placeholder='Place the Source' sx={{
                  border:'none',
                  borderBottom:'2px solid green',
                  width:'320px'
                }}/>
               <Typography variant='h6'>Transfer Title</Typography>
               <TextField value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='publish your title...' sx={{
                border:'none',
                borderBottom:'2px solid green',
                width:'320px'
               }}/>
              <br/><br/>
              <Typography variant='h6'>Send To</Typography>

<select value={club} onChange={(e)=>{setClub(e.target.value)}} style={{width:'300px',
                padding:'10px'
}}>
     <option>All</option>
     <option>Arsenal</option>
     <option>Man city</option>
     <option>Liverpool</option>
     <option>Man United</option>
     <option>chellsee</option>
     <option>wastham</option>
</select>

              <Typography variant='h6'>Contents</Typography> 
             <textarea placeholder='Your Main Content goose here'
               value={myData}
               onChange={(e)=>{setmyData(e.target.value)}}
               style={{
                position:'absolute',
                border:'1px solid black',
                width:'320px',
                height:'100px'
               }}
             ></textarea><br/><br/><br/><br/><br/>

              <Typography variant='h6'>Attach Phone</Typography>
              <TextField type='file' onChange={(e)=>{setMyfiles(e.target.files[0])}}/><br/>

              <button style={{
                backgroundColor:'rgb(0, 152, 247)',
                color:'#fff',
                padding:'10px',
                marginLeft:'0px',
                marginTop:'20px',
                width:'330px'
              }} onClick={()=>{
                //handlePost()
                onFileUpload();
               
                }}><CircularProgress sx={{
                  position:'absolute',
                  display:progress
                }}/>Upload</button>

           </Box>

         <Box sx={{
  position:{md:'absolute',xs:'relative'},
  backgroundColor:'#f4f4f4',
  width:'300px',
  height:'750px',
  marginLeft:{md:'450px',xs:'20px'},
  marginTop:{md:'-730px',xs:'100px'},
  border:'1px solid gray',
  padding:'10px',
  overflow:'scroll',
  borderRadius:'20px'
}}>
   <Typography variant='h4' sx={{
   
   }}>Recent Post</Typography>
   
  {/***
  news?.map((item, index) => {
        // Extract video ID from YouTube link
        let videoId = item.link.split('v=')[1];
        const ampersandPosition = videoId?.indexOf('&');
        if (ampersandPosition !== -1) {
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
                    width: '300px',
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
      ***/}
       {
 news?.map((item, index) => (
     <Stack key={index}>
         <List>
         <Box sx={{
              backgroundColor:'#fff',
              padding:'10px',
              margin:'10px',
              borderRadius:'10px',
              position: 'relative', // Added for positioning
              }}> 
            <img 
              src={item.imgUrl} 
              style={{
                 width:'50px',
                 height:'50px',
                 borderRadius:'30px'
              }}
              alt="News Thumbnail" // Added alt attribute
            />
             <ListItem sx={{
              position:'absolute',
              fontSize:'12px',
              marginLeft:'50px',
              marginTop:'-50px',
              fontWeight:'bold'
            }}>{item.source}</ListItem>

           <ListItem sx={{
              position:'absolute',
              fontSize:'12px',
              marginLeft:'50px',
              marginTop:'-30px',
              
            }}>{item.title}</ListItem>

            <ListItem sx={{
              fontSize:'9px',
              marginLeft:'50px',
              marginTop:'0px'
            }}>On :{item.date} at {item.time}</ListItem>
            <Typography>{item.description}</Typography> 

            {/* Edit and Delete Buttons */}
            <Box
              sx={{
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on small screens
              }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleEdit(item)}
                sx={{ mb: { xs: 1, sm: 0 } }} // Add margin-bottom for small screens
              >
                Edit
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleDelete(item)}
              >
                Delete
              </Button>
            </Box>     
           </Box>
         </List>
     </Stack>
    ))
    }
</Box>


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


      </Box> 
  </div>
  )
}

export default Bar