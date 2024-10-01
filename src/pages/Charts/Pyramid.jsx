//import React from 'react'
import React, { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime,Legend, 
 SplineAreaSeries} from '@syncfusion/ej2-react-charts';

 import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {areaCustomSeries,areaPrimaryXAxis,areaPrimaryYAxis} from '../../data/dummy';
import { Box,Typography,Stack,List,ListItem,TextField,Button,Modal } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { Header } from '../../components';
import { useState } from 'react';
import authAxois from '../../requestHandler';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
//import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { CircularProgress } from '@mui/joy';


const Pyramid = () => {
  const [teamOne,setTeamOne]=useState();
  const [teamTwo,setTeamTwo]=useState();
  const [link,setLink]=useState();
  const [timeHeld,setTimeHeld]=useState();
  const [myfiles,setMyfiles]=useState();
  const [loading,setLoading]=useState(true);
  const [files2,setMyfiles2]=useState();
  const [matchDate,setMatchDate]=useState(); 

  const [selectedItem,setSelectedItem]=useState();
  const [open,setOpen]=useState(false)
  const [news,setNews]=useState([])
  const [selectedDate,setSelectedDate]=useState();
  const [match,setMatch]=useState();
  const [fixtureId,setFixtureId]=useState();
  const [date,setDate]=useState();
  const [filter,setFilter]=useState('none');

  const [homeTeam,setHomeTeam]=useState();
  const [awayTeam,setAwayTeam]=useState();
  const [leagues,setLeagues]=useState();

  const [rows,setRows]=useState();
  const [newRow,setNewRow]=useState();
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


 /// handle selected date
 const handleDateChange = (date) => {
  const formattedDate = format(date, 'yyyy-MM-dd'); // Format date as ISO string or any comparable format
  console.log('Formatted Date:', formattedDate); // Debugging line
  setSelectedDate(formattedDate)

}

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


/*

const onFileUpload = async () => {
  let data=[]
  if (!myfiles || !files2) {
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
    timeHeld,
    date: Date().slice(0, 15),
    time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`,
  };

  const formData = new FormData();
  formData.append("image", myfiles);  
  formData.append("image2",files2);
  formData.append("teamOne",info.teamOne);
  formData.append("teamTwo",info.teamTwo);
  formData.append("link",info.link);
  formData.append("date",info.date);
  formData.append("time",info.time);
  formData.append("timeHeld",timeHeld);
  formData.append("matchDate",matchDate)
  formData.append("team",selectedItem);

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

*/


const onFileUpload=async()=>{

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const isAM = hours < 12;
  const period = isAM ? 'AM' : 'PM';
  const hours12 = hours % 12 || 12;


     const info={
      leagues:leagues,
      fixture_id:fixtureId,
      matchName:match,
      link:link,
      matchDate:matchDate,
      homeTeam:homeTeam,
      awayTeam:awayTeam,
      postedDate: Date().slice(0, 15),
      postedTime: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`,
     } 

     authAxois.post('/admin/save/live-match',info).then((res)=>{
        console.log(res.data)
        if(res.status===200){
           toast.success("Live Match Post Success ")
        }else{
          toast.error('unable to Post Live Match')
        }
     }).catch(e=>e)
}




const fetch=()=>{
  //admin/save/live-match
   authAxois.get('/admin/save/live-match').then((res)=>{
    console.log(res.data)
    setLoading(false);
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
           <Typography>{leagues}</Typography>
           <br/><br/>
           <Typography variant='h6' sx={{color:'black'}}>Fixture Id</Typography>
           <Typography sx={{width:'300px'}}>{fixtureId}</Typography><br/><br/>
           <Typography variant='h6' sx={{color:'black',width:'300px'}}>Match Name</Typography>
           <Typography>{match}</Typography><br/><br/>
           <Typography variant='h6' sx={{color:'black',width:'300px'}}>Links</Typography>
           <TextField value={link} onChange={(e)=>{setLink(e.target.value)}} placeholder='URL' sx={{width:'300px'}}/><br/><br/>

           <Typography>Match Date and Time</Typography>
           <Typography>{matchDate}</Typography><br/>
      
           <Typography>Home Team Logo</Typography>
            <img src={homeTeam} style={{
               width:'60px',
               height:'60px',      
               padding:'10px',
               margin:'10px'
               }}/><br/>

            <Typography>Away Team Logo</Typography><br/>
            <img src={awayTeam} style={{
               width:'60px',
               height:'60px',      
               padding:'10px',
               margin:'10px'
               }}/><br/>

           <Button sx={{backgroundColor:'#2e81f5',color:'#fff',width:'300px'}} onClick={onFileUpload}>Post</Button>
        </Box>

<Box sx={{
  position:{md:'absolute',xs:'relative'},
  backgroundColor:'#fff',
  width:{xs:'250px',md:'250px',xl:'400px'},
  height:'800px',
  marginLeft:{md:'320px',xs:'20px'},
  marginTop:{md:'-850px',xs:'100px'},
  border:'1px solid gray',
  padding:'10px',
  overflow:'scroll',
  borderRadius:'20px'
}}>
   <Typography variant='h4' sx={{
      color:'black'
   }}>Recent Post</Typography>
  
 
{
loading ? (
   // Show Skeletons while loading
   <Stack spacing={2}>
   <Box
     sx={{
       backgroundColor: '#fff',
       padding: '10px',
       margin: '10px',
       borderRadius: '10px',
       position: 'relative',
     }}
   >
     <Skeleton variant="circular" width={50} height={50} /><br/>
     <Skeleton variant="text" sx={{ fontSize: '12px', marginLeft: '60px', marginTop: '-50px' }} width="60%" />
     <Skeleton variant="text" sx={{ fontSize: '10px', marginLeft: '60px', marginTop: '-30px' }} width="80%" />
     <Skeleton variant="text" sx={{ fontSize: '9px', marginLeft: '60px', marginTop: '15px' }} width="40%" />
     <Skeleton variant="rectangular" height={50} />
     <Box
       sx={{
         marginTop: '10px',
         display: 'flex',
         justifyContent: 'space-between',
       }}
     >
       <Skeleton variant="rectangular" width="45%" height={36} />
       <Skeleton variant="rectangular" width="45%" height={36} />
     </Box>
   </Box>
 </Stack>
) :(
news?.map((item, index) => {
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
                  width:{xs:'300px',md:'200px'}
                }}
              >
              
                <ListItem
                  sx={{
                    position: 'absolute',
                    fontSize: '12px',
                    marginLeft: '60px',
                    marginTop: '-50px',
                    fontWeight: 'bold',
                  }}
                >
             <img src={item.homeTeam} style={{
               position:'absolute',
               width:'40px',
               height:"40px",
               marginLeft:'-70px',
               marginTop:'150px'
               
             }} alt=''/>           
                </ListItem>
        

                <ListItem
                  sx={{
                    fontSize: '15px',
                    marginLeft: '60px',
                    width:'100px',
                    marginTop: '-5px',
                  }}
                >
                  {item.matchName}
                </ListItem>

                <img src={item.awayTeam} style={{
                   position:'absolute',
                   width:'40px',
                   height:'40px',
                   borderRadius:'50px',
                   marginLeft:'150px',
                   marginTop:'-85px'
                }} alt=''/>

                 
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
                  Posted On{item.postedDate} <br/>At {item.postedTime}
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
                    onClick={() => setOpen(true)}
                    sx={{
                      width:'30%',
                      border:'none',
                      backgroundColor:'#001632',
                      color:'#fff'

                    }}
                  >
                    Edit
                  </Button>

                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(item)}
                    sx={{
                      width:'30%',
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
      })
      
    )
}

</Box>

<Box sx={{
  position:{md:'absolute',xs:'relative'},
  backgroundColor:'#f4f4f4',
  width:{xs:'200px',md:'250px'},
  height:'800px',
  marginLeft:{md:'600px',xs:'20px'},
  marginTop:{md:'-850px',xs:'100px'},
  border:'1px solid gray',
  padding:'10px',
  overflow:'scroll',
  overflowX:'none',
  borderRadius:'20px'
}}>
   
   
   <Typography variant='h6'>
       Filter Games By Dates
       <DatePicker
          selected={selectedDate}
          value={selectedDate}
          onChange={handleDateChange}
          dateFormat="EEE MMM dd yyyy"
          placeholderText="Select Date"
         
		  style={{
			padding:'20px',
			marginLeft:'50px',
            width:'150px'
		  }}
        />
        <Button onClick={()=>{
            setFilter('block')
            setLoading(true)
          axios.get(`https://backend.habeshalivescore.com/api/football_by_date_1?date=${selectedDate}`).then((res)=>{
                console.log(res)
                setRows(res.data.data)
                setFilter('none')
                setLoading(false)
            }).catch(e=>e)
        }} sx={{backgroundColor:'red',
                color:'#fff',
                width:'200px',
                padding:'10px',
                margin:'10px'
                }}>
                    <CircularProgress sx={{display:filter}}/>Filter</Button>
   </Typography>


   {loading ? (
  // Show Skeletons while loading
  <Stack spacing={2}>
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <Skeleton variant="circular" width={50} height={50} /><br/>
      <Skeleton variant="text" sx={{ fontSize: '12px', marginLeft: '60px', marginTop: '-50px' }} width="60%" />
      <Skeleton variant="text" sx={{ fontSize: '10px', marginLeft: '60px', marginTop: '-30px' }} width="80%" />
      <Skeleton variant="text" sx={{ fontSize: '9px', marginLeft: '60px', marginTop: '15px' }} width="40%" />
      <Skeleton variant="rectangular" height={50} />
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton variant="rectangular" width="45%" height={36} />
        <Skeleton variant="rectangular" width="45%" height={36} />
      </Box>
    </Box>

    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <Skeleton variant="circular" width={50} height={50} /><br/>
      <Skeleton variant="text" sx={{ fontSize: '12px', marginLeft: '60px', marginTop: '-50px' }} width="60%" />
      <Skeleton variant="text" sx={{ fontSize: '10px', marginLeft: '60px', marginTop: '-30px' }} width="80%" />
      <Skeleton variant="text" sx={{ fontSize: '9px', marginLeft: '60px', marginTop: '15px' }} width="40%" />
      <Skeleton variant="rectangular" height={50} />
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton variant="rectangular" width="45%" height={36} />
        <Skeleton variant="rectangular" width="45%" height={36} />
      </Box>
    </Box>


    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <Skeleton variant="circular" width={50} height={50} /><br/>
      <Skeleton variant="text" sx={{ fontSize: '12px', marginLeft: '60px', marginTop: '-50px' }} width="60%" />
      <Skeleton variant="text" sx={{ fontSize: '10px', marginLeft: '60px', marginTop: '-30px' }} width="80%" />
      <Skeleton variant="text" sx={{ fontSize: '9px', marginLeft: '60px', marginTop: '15px' }} width="40%" />
      <Skeleton variant="rectangular" height={50} />
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton variant="rectangular" width="45%" height={36} />
        <Skeleton variant="rectangular" width="45%" height={36} />
      </Box>
    </Box>
  </Stack>
) : (
  // Render actual content when data is loaded
  rows?.map((item, index) => {
    // Ensure that the link exists before processing


    return (
      <Stack key={index}>
        <List>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '10px',
              margin: '10px',
              borderRadius: '10px',
              position: 'relative',
            }}
          >
            
     

            <ListItem
              sx={{
                position: 'absolute',
                fontSize: '10px',
                width: '200px',
                marginLeft: '60px',
                marginTop: '-30px',
              }}
            >
              {item.title}
            </ListItem>
  
            <ListItem
              sx={{
                cursor:'pointer',
                fontSize: '15px',
                marginLeft: '-30px',
                marginTop: '15px',
              }}
              onClick={()=>{
                 console.log("all information included the fixture id")
                 console.log(item)
                 setMatch(item.name)
                 setFixtureId(item.coaches[0].meta.fixture_id)
                 setMatchDate(item.starting_at)
                // setMatchTime(item.starting_at.slice(12,23))
                 setLeagues(item.league_id)
                 
                 setHomeTeam(item.participants[0].image_path)
                 setAwayTeam(item.participants[1].image_path)
                 console.log(item)
              }}
            >
<img src={item.participants[0].image_path} style={{
        width:'60px',
        height:'60px',
      
        padding:'10px',
        margin:'10px'
     }}/>
             {item.name}
    <img src={item.participants[1].image_path} style={{
        width:'60px',
        height:'60px',
      
        padding:'10px',
        margin:'10px'
     }}/>


            </ListItem>

         

            {/* Edit and Delete Buttons */}
     
          </Box>
        </List>
      </Stack>
    );
  })
)}


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
      Edit Live Match Post
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