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
import { MdAccountCircle } from 'react-icons/md';
import { MdAddShoppingCart } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import { FiSmartphone } from 'react-icons/fi';
import { MdCampaign } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllAdds = () => {
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
  const [loadingx,setLoadingx]=useState(true);
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
  const [thumbnailUrlOne,setThumbnailUrlOne]=useState();
  

const navigate=useNavigate();

 useEffect(()=>{
    fetchData(); 
  
  
    axios.get('https://backend.habeshalivescore.com/api/football_by_date?date=2024-09-09').then((res)=>{
        console.log(res.data.data)
        setRows(res.data.data)
    }).catch(e=>e)
    
    

    authAxois.get('/admin/live-challenge/reserve').then((res)=>{
        setNews(res.data.data)
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
 
/** *
 const fetchData=async()=>{
  setLoading(false)
  const response=await authAxois.get('/admin/user/heighlight')
  console.log(response.data)
  setNews(response.data.data) 
  if(response.data===200){
      setLoading(false)
      
  }
 
 }
 **/

 const fetchData = async () => {
  try {
    setLoadingx(true);
    
    /** 
    const response = await authAxois.get('/admin/user/heighlight');
    const fetchedData = response.data.data;
    console.log(fetchedData);
     setNews(response.data.data)
     ***/
    
     authAxois.get('/admin/user/heighlight').then((res)=>{
       setNews(res.data.data)
       if(res.status=200){
        setLoadingx(false)
       }
     }).catch(e=>e)
    // Assuming your fetched data contains a YouTube URL
    //const videoLink = fetchedData.youtubeLink; // Change this to the actual field containing the link

    // Extract video ID from the YouTube link
    //const videoId = videoLink?.split('v=')[1];
    //const ampersandPosition = videoId.indexOf('&');
    //if (ampersandPosition !== -1) {
    //  videoId = videoId.substring(0, ampersandPosition);
    //}

    // Create the thumbnail URL
    //const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
   // setThumbnailUrlOne(thumbnailUrl)
    // You can now set the thumbnail URL to state or display it in your UI
   /* 
    setNews({
      ...fetchedData,
      thumbnailUrl
    });
    */

  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
};


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
  //toast.error('error has been ocured')
  console.log(info)
     
if(match===undefined || fixtureId===undefined || title===undefined || myData===undefined || club===undefined){
     toast.error('all field is requierd....')
     document.querySelector('.allfields').innerHTML="All Fields Are requierd"
     setProgress('none')  
  }
  else{
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
  


  }

const handleFilterByDate=()=>{}



  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <ToastContainer/>
      <Header category="Adds" title="Advertisment"/>
      <Box sx={{
     backgroundColor:'#eeeeee',
     borderRadius:'10px'
}}>
   <Button onClick={()=>{navigate('/edit/adds')}}>Edit All Adds</Button>      
<Box sx={{
     backgroundColor:'#eeeeee',
     borderRadius:'10px'
}}>

<Stack
      sx={{
        marginTop:{md:'-150px',xs:'50px'},
        float: 'left',
        height:'500px',
        marginLeft: { md: '-60px', xs: '20px' },
        flexDirection:{ xs: 'column', md: 'row' }, // Vertical on small screens, horizontal on medium and up
        alignItems: 'center', // Center items for better appearance
      }}
    >


      <ListItem>
        <div
          className='x1'
          style={{
            width: '250px',
            height: '150px',
            backgroundColor: '#fff',
            padding: '20px',
            cursor: 'pointer',
            margin: '10px',
          }}
          onClick={() => { navigate('/google/adds'); }}
        >
          <MdAddShoppingCart style={{ fontSize: '30px', margin: 'auto' }} />
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '30px',
            textAlign: 'center',
          }}>Google Advertisement</p>
          <Typography variant='h6' sx={{
              marginLeft:'80px',
              fontSize:'10px'
            }}>Big Size 1</Typography>
        </div>
      </ListItem>

      <ListItem>
        <div
          className='x3'
          style={{
            width: '250px',
            height: '150px',
            backgroundColor: '#fff',
            padding: '20px',
            cursor: 'pointer',
            margin: '10px',
          }}
          onClick={() => { navigate('/company/adds'); }}
        >
          <FiShoppingCart style={{ fontSize: '30px', margin: 'auto' }} />
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '30px',
            textAlign: 'center',
          }}>Company Advertisement</p>
            <Typography variant='h6' sx={{
              marginLeft:'80px',
              fontSize:'10px'
            }}>medium Size 1</Typography>
        </div>
      </ListItem>

      <ListItem>
        <div
          className='x2'
          style={{
            width: '250px',
            height: '150px',
            backgroundColor: '#fff',
            padding: '20px',
            cursor: 'pointer',
            margin: '10px',
          }}
          onClick={() => { navigate('/General/adds'); }}
        >
          <FiSmartphone style={{ fontSize: '30px', margin: 'auto' }} />
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '30px',
            textAlign: 'center',
          }}>General Advertisement</p>
            <Typography variant='h6' sx={{
              marginLeft:'80px',
              fontSize:'10px'
            }}>Small Size 1</Typography>
        </div>
      </ListItem>

<Stack sx={{
    position:'relative',
    marginTop:{md:'500px',xs:'50px'},
    marginLeft:{md:'-900px',xs:'10px'},
    flexDirection:{ xs: 'column', md: 'row' }, // Vertical on small screens, horizontal on medium and up
    alignItems: 'center', // Center items for better appearance
}}>
      <ListItem>
        <div
          className='x1'
          style={{
            width: '250px',
            height: '150px',
            backgroundColor: '#fff',
            padding: '20px',
            cursor: 'pointer',
            margin: '10px',
          }}
          onClick={() => { navigate('/google/adds'); }}
        >
          <MdAddShoppingCart style={{ fontSize: '30px', margin: 'auto' }} />
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '30px',
            textAlign: 'center',
          }}>Google Advertisement</p>
            <Typography variant='h6' sx={{
              marginLeft:'80px',
              fontSize:'10px'
            }}>Big Size 2</Typography>
        </div>
      </ListItem>

      <ListItem>
        <div
          className='x3'
          style={{
            width: '250px',
            height: '150px',
            backgroundColor: '#fff',
            padding: '20px',
            cursor: 'pointer',
            margin: '10px',
          }}
          onClick={() => { navigate('/company/adds'); }}
        >
          <FiShoppingCart style={{ fontSize: '30px', margin: 'auto' }} />
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '30px',
            textAlign: 'center',
          }}>Company Advertisement</p>
            <Typography variant='h6' sx={{
              marginLeft:'80px',
              fontSize:'10px'
            }}>medium Size 2</Typography>
        </div>
      </ListItem>

      <ListItem>
        <div
          className='x2'
          style={{
            width: '250px',
            height: '150px',
            backgroundColor: '#fff',
            padding: '20px',
            cursor: 'pointer',
            margin: '10px',
          }}
          onClick={() => { navigate('/General/adds'); }}
        >
          <FiSmartphone style={{ fontSize: '30px', margin: 'auto' }} />
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '30px',
            textAlign: 'center',
          }}>General Advertisement</p>
            <Typography variant='h6' sx={{
              marginLeft:'80px',
              fontSize:'10px'
            }}>Small Size 2</Typography>
        </div>
      </ListItem>

    
</Stack>


</Stack>

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

export default AllAdds