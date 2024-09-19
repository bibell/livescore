import React, { useEffect } from 'react';
import {ScheduleComponent,Day, Week, WorkWeek,Month,Agenda,Inject
,Resize,DragAndDrop} from '@syncfusion/ej2-react-schedule';
import {scheduleData} from './data/dummy';
import {Header} from './components';
import { Box,Typography,Stack,List,ListItem,TextField,CircularProgress,Button,Modal } from '@mui/material';
import { useState } from 'react';
import authAxois from './requestHandler';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
const Dynamic = () => {
  const [title,setTitle]=useState();
  const [source,setSource]=useState();
  const [open, setOpen] = useState(false); // State to control the Modal
  const [myData,setmyData]=useState();
  const [news,setNews]=useState([]);
  const [club,setClub]=useState()
  const [progress,setProgress]=useState('none')
  const [link,setLink]=useState();
  const [auther,setAuther]=useState();
  const [currentItem, setCurrentItem] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    source: '',
    title: '',
    date: '',
    time: '',
    description: '',
  });
  const [selectedDate,setSelectedDate]=useState();
  const [rows,setRows]=useState();
  const [match,setMatch]=useState();
  const [fixtureId,setFixtureId]=useState(); 
  const [filter,setFilter]=useState('none');

 useEffect(()=>{
    fetchData(); 
    axios.get('https://backend.habeshalivescore.com/api/football_by_date?date=2024-09-09').then((res)=>{
        console.log(res.data.data)
        setRows(res.data.data)
    }).catch(e=>e)

 },[])
 




 
const handleDelete=()=>{
   console.log('write code to delete the element')
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

const handleClose = () => {
  setOpen(false); // Close the modal
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
 
 const fetchData=async()=>{
  setLoading(false)
  const response=await authAxois.get('/admin/user/heighlight')
  console.log(response.data)
  setNews(response.data.data) 
  if(response.data===200){
      setLoading(false)
      
  }
 
 }

const handleDateChange = (date) => {
  const formattedDate = format(date, 'yyyy-MM-dd'); // Format date as ISO string or any comparable format
  console.log('Formatted Date:', formattedDate); // Debugging line
  setSelectedDate(formattedDate)

}

const handlePost=()=>{
    setProgress('block')
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
      fixtureId:fixtureId,
      match:match,     
      date: Date().slice(0, 15),
      time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`, 
     }
  
     console.log(info)
     authAxois.post('/admin/user/dynamic/heighlight',info).then((res)=>{
      console.log('user database been send to the backend')
      console.log(res)
      if(res.status===200){
        toast.success('Heighlight Post Success')
        setProgress('none')
      }else{
         toast.error('Unable to post heighlight')
      }
     
     }).catch(e=>e)
  }

const handleFilterByDate=()=>{}



  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <ToastContainer/>
      <Header category="Heigh light" title="Dynamic Clubes Heighlight Post"/>
      <Box>
           <Box>
               <Typography variant='h6'>Source</Typography>
                <TextField value={auther} onChange={(e)=>{setAuther(e.target.value)}} placeholder='Place the Source' sx={{
                  border:'none',
                  borderBottom:'2px solid green',
                  width:'320px'
                }}/>
                <br/><br/>
                <Typography variant='h6'>Game Matchs</Typography>

                <select value={match}  style={{width:'320px',
                                               padding:'10px',
                                               border:'2px solid black'
                                               }}>
                     <option>{match}</option>
                     
                </select>
                 <br/><br/>
                <Typography variant='h5' sx={{padding:'5px',margin:'5px'}}>Fixture Id Or Match Id</Typography>
                <Typography variant='h6' sx={{
                            padding:'10px',
                            margin:'10px',
                            border:'1px solid black',
                            width:'320px'}}>{fixtureId}</Typography> 
                 <Typography variant='h6'>Title</Typography>
                <TextField value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Place the Source' sx={{
                  border:'none',
                  borderBottom:'2px solid green',
                  width:'320px'
                }}/>
               <Typography variant='h6'>Link</Typography>
               <TextField value={link} onChange={(e)=>{setLink(e.target.value)}} placeholder='publish your title...' sx={{
                border:'none',
                borderBottom:'2px solid green',
                width:'320px'
               }}/>
              <br/><br/>
              <Typography variant='h6'>Description</Typography> 
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


              <button style={{
                backgroundColor:'rgb(0, 152, 247)',
                color:'#fff',
                padding:'10px',
                marginLeft:'0px',
                marginTop:'20px',
                width:'330px'
              }} onClick={handlePost}><CircularProgress sx={{
                  position:'absolute',
                  display:progress,
                  color:"#fff",
                  width:'20px',
                  height:'20px',
                  marginLeft:'130px',
                  marginTop:'-5px'
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

export default Dynamic