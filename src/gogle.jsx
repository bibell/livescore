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
import { setConsent } from 'firebase/analytics';

const Google = () => {
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
  const [files,setFiles]=useState(null);
  const [content,setContent]=useState();
  const [referenceId,setReferenceId]=useState();

  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [refId,setRefId]=useState();
  const [startDate,setStartDate]=useState(new Date());
  //const [title,setTitle]=useState();

const navigate=useNavigate();

  
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

const handleGoogleAdds=async()=>{
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

 // setProgress('block')

  const isAM = hours < 12;
  const period = isAM ? 'AM' : 'PM';

  // Convert to 12-hour format
  const hours12 = hours % 12 || 12;

  const info={
    
    //auther:auther,
    content:content,
    file:files,
    date: Date().slice(0, 15),
    time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`, 
   }

 const formData=new FormData();
 formData.append("image",files);
 formData.append("refId",refId);
 formData.append("content",content)
 formData.append("expireDate",startDate)
 formData.append("date",info.date)
 formData.append("time",info.time)
 formData.append("title",title)
 //formData.append("referenceId",referenceId)
console.log(formData)

authAxois.post("/admin/adds/alladds", formData, {
  headers: {
      "Content-Type": "multipart/form-data",
      "Accept":"application/json"
  },
}).then((res)=>{
  console.log('response is comming from the server side')
  console.log(res.data)
  if(res.status===200){
      toast.success("Upload Success")
  }
}).catch(e=>e)


}

const handleImageUpload = (event) => {
   let file=event.target.files[0];
  
  if (file) {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      // Check dimensions
      console.log('Image dimensions:', img.width, img.height);
      if (img.width >= 100 && img.width <= 700 && img.height >= 150 && img.height <= 600) {
        setImagePreview(img.src);
        setError('');
      } else {
        setError('Image must have width between 300-400 pixels and height between 250-300 pixels.');
        setImagePreview(null);
      }
    };

    reader.readAsDataURL(file);
  }
};

  useEffect(()=>{
    //fetchData(); 

 },[])


  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <ToastContainer/>
      <Header category="Adds" title="Google Adds"/>
      <Box sx={{
    // backgroundColor:'#eeeeee',
     borderRadius:'10px'
}}>
         
<Box sx={{
    // backgroundColor:'#eeeeee',
     borderRadius:'10px',
     padding:'10px'
}}>
<Typography sx={{
   width:'300px'
}}>URL</Typography>
<TextField value={content} onChange={(e)=>{setContent(e.target.value)}} placeholder='URL' sx={{
   width:'300px'
}}/><br/><br/>

<Typography>Title</Typography>
<TextField value={title} onChange={(e)=>{setTitle(e.target.value)}} sx={{
   width:{md:'300px',xs:'200px'}
}} placeholder='title'/>

<br/><br/>
<Typography>Reference Id</Typography>
<TextField value={refId} onChange={(e)=>{setRefId(e.target.value)}} placeholder='Reference Id' sx={{
    width:{md:'300px',xs:'200px'}
}}/>
<br/><br/>
<Typography sx={{
  border:'1px solid black',
  width:'300px'
}}>Select Expired Date
<DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="MMMM d, yyyy"
       
  />
</Typography>  
  <br/><br/>
<Typography sx={{
   width:'300px'
}}>Your Banner Size Should Be 300x250 PX </Typography><br/>
<TextField type='file' accept="image/*" onChange={handleImageUpload} sx={{
   width:'300px'
}}/>{error && <p style={{ color: 'red' }}>{error}</p>}
      {imagePreview && <img src={imagePreview} alt="Preview" style={{width:'100px',height:'150px'}}/>}<br/><br/>
<Button onClick={()=>{handleGoogleAdds()}} sx={{
   width:'300px',
   backgroundColor:'#0bd4ca',
   color:'#fff',
   padding:'10px'
}}>Upload</Button>
</Box>


<Box sx={{
   position:{md:'absolute'},
   backgroundColor:'#eeeeee',
   marginLeft:{md:'400px',xs:'10px'},
   width:{md:'200px',xs:'300px'},
   height:'400px',
   marginTop:{md:'-650px',xs:'50px'},
   overflow:'scroll'

}}>
   <Typography variant='h6' sx={{
    marginLeft:'20px',
   
   }}>Recent Google Adds Posts</Typography>
   <Box sx={{}}></Box>
</Box>

<Box sx={{
     position:{md:'absolute'},
     backgroundColor:'#e2e6eb',
     marginLeft:{md:'650px',xs:'10px'},
     width:{md:'200px',xs:'300px'},
     height:'400px',
     marginTop:{md:'-650px',xs:'50px'},
     overflow:'scroll'
}}>
   <Typography variant='h6' sx={{
    marginLeft:'20px'
   }}>Expired Adds</Typography>
   <Box sx={{}}></Box>
  

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

export default Google