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
import { RiUser2Line } from 'react-icons/ri';

const Edit = () => {
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
  const [delet,setDelet]=useState('none');
  const [formData, setFormData] = useState({
    source: '',
    title: '',
    date: '',
    time: '',
    description: '',
  });
  const [selectedDate,setSelectedDate]=useState({
    url:'',
    title:'',
    image:''
  });
  const [rows,setRows]=useState();
  const [match,setMatch]=useState();
  const [fixtureId,setFixtureId]=useState(); 
  const [filter,setFilter]=useState('none');
  const [thumbnailUrlOne,setThumbnailUrlOne]=useState();
  const [files,setFiles]=useState(null);
  const [content,setContent]=useState();
  const [referenceId,setReferenceId]=useState();
  const [selectedPosts,setSelectedPosts]=useState(null);

  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [startDate,setStartDate]=useState(new Date());
  
  const [reference2,setReference2]=useState();
  const [title2,setTitle2]=useState()
  const [url2,setUrl2]=useState();
  const [formData2,setFormData2]=useState();
  const [id,setId]=useState();
  const [open2,setOpen2]=useState(false);
  const [preview, setPreview]=useState();
  //const [title,setTitle]=useState();
  //const [open, setOpen] = useState(false);

const navigate=useNavigate();

  
const handleDelete=(item)=>{
   console.log('write code to delete the element')
   //console.log(selectedPosts)
   const info={
      id:selectedPosts.id
   }
   authAxois.post('/admin/delete/data',info).then((res)=>{
      console.log(res.data)
      if(res.status===200){
         toast.success("Item has been deleted successfully")
         setDelet('none')
         setOpen2(false)
         setOpen(false)
         setTimeout(()=>{
          window.location.reload();
         },900)
      }
   }).catch((e)=>{
       console.log("Error has been ocured......")
       console.log(e)
   })

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



const handleOpen = (item) => {
  setSelectedPosts(item);
  setOpen(true);
};


const handleClose = () => {
  setOpen(false);
  setOpen2(false)
  setSelectedPosts(null);
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
 


 const fetchData = async () => {
  try {
    setLoadingx(true);
    
    /** 
    const response = await authAxois.get('/admin/user/heighlight');
    const fetchedData = response.data.data;
    console.log(fetchedData);
     setNews(response.data.data)
     ***/
    
     authAxois.get('/admin/adds/alladds').then((res)=>{
       setNews(res.data.data)
       console.log(res.data)
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

  setProgress('block')

  const isAM = hours < 12;
  const period = isAM ? 'AM' : 'PM';

  // Convert to 12-hour format
  const hours12 = hours % 12 || 12;

  const info={
    refId:1,
    //auther:auther,
    content:content,
    file:files,
    date: Date().slice(0, 15),
    time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`, 
   }

 const formData=new FormData();
 formData.append("image",files);
 formData.append("refId",1);
 formData.append("content",content)
 formData.append("expireDate",startDate)
 formData.append("date",info.date)
 formData.append("time",info.time)
 formData.append("title",title)

 try {
  const response = await authAxois.post("/admin/adds/otheradds", formData, {
      headers:{
          "Content-Type": "multipart/form-data",
      },
  });
  console.log('Server response:', response.data);
  if(response.status===200){
     toast.success("Add Posted Success")
   // setProgress('none')
    //alert('sucess')
    //toast.success('Your news has been updated Successfully')
   // window.location.reload();
  }
}catch(error){
  console.error('Error uploading file:', error.response.data);
  toast.error('Error has been ocured')
}



}

const handleEditPost=async()=>{
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  //setProgress('block')

  const isAM = hours < 12;
  const period = isAM ? 'AM' : 'PM';

  // Convert to 12-hour format
  const hours12 = hours % 12 || 12;

  const info={
    refId:reference2,
    //auther:auther,
    content:url2,
    file:files,
    date: Date().slice(0, 15),
    time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`, 
   }

 const formData=new FormData();
 formData.append("id",id)
 formData.append("image",files);
 formData.append("refId",reference2);
 formData.append("content",url2)
 formData.append("expireDate",startDate)
 formData.append("date",info.date)
 formData.append("time",info.time)
 formData.append("title",title2)

 console.log(formData)

 authAxois.post('/admin/adds/editpost',formData).then((res)=>{
     console.log(res)
 }).catch(e=>e)
/*****  
 try {
  const response = await authAxois.post("/admin/adds/otheradds", formData, {
      headers:{
          "Content-Type": "multipart/form-data",
      },
  });
  console.log('Server response:', response.data);
  if(response.status===200){
     toast.success("Add Posted Success")
   // setProgress('none')
    //alert('sucess')
    //toast.success('Your news has been updated Successfully')
   // window.location.reload();
  }
}catch(error){
  console.error('Error uploading file:', error.response.data);
  toast.error('Error has been ocured')
}
****/



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
    fetchData(); 

 },[])


  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
    
      <Header category="Adds" title="Add Aditional Adds"/>
      <ToastContainer/>
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
<TextField value={referenceId} onChange={(e)=>{setReferenceId(e.target.value)}}/>


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
   position:{md:'fixed'},
   backgroundColor:'#eeeeee',
   marginLeft:{md:'400px',xs:'10px'},
   width:{md:'400px',xs:'300px'},
   height:'400px',
   marginTop:{md:'-650px',xs:'50px'},
   overflow:'scroll'

}}>
   <Typography variant='h6' sx={{
    marginLeft:'20px',
   
   }}>All Adds Posts</Typography>
   <Box sx={{}}>
      {/*
        news?.map((item,key)=>{
             return(<Box onClick={(item)=>{
                     setSelectedPosts({
                        url:item.url,
                        title:item.title,
                        image:item.image
                     })
                     console.log(selectedPosts)
                    }} sx={{
                marginLeft:'50px',
                padding:'10px',

             }}>


            <Box sx={{
              margin:'10px',
              backgroundColor:'#fff'
            }}> 
                <Typography>News Id {item.id}</Typography>
                <Typography>{item.description}</Typography>
                <Typography>{item.url}</Typography>
                <img src={item.image} style={{
                    width:'200px',
                    height:'100px',
                    padding:'20px',
                }}/>
                <Typography>{item.content}</Typography>
                <Button sx={{
                   backgroundColor:'green',
                   color:'#fff',
                   marginLeft:'20px'
                }} 
                 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the Box onClick from firing
                  console.log(item); // Log the current item
              }}

                >Edit</Button>

                <Button sx={{
                   backgroundColor:'red',
                   color:'#fff',
                   marginLeft:'30px'
                }}>Delete</Button>
            </Box>

<Box>
<Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box 
                    sx={{
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px'
                    }}
                >
                    {selectedPosts && (
                        <>
                            <Typography variant="h6" component="h2">
                                {selectedPosts.title}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {selectedPosts.description}
                            </Typography>
                            <img 
                                src={selectedPosts.image} 
                                style={{ width: '100%', height: 'auto', marginTop: '10px' }} 
                                alt="Selected News" 
                            />
                            <Typography sx={{ mt: 2 }}>
                                {selectedPosts.content}
                            </Typography>
                            <Button 
                                onClick={handleClose} 
                                variant="contained" 
                                sx={{ mt: 2 }}
                            >
                                Close
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>

</Box>



             </Box>)
        })
      */}

{news?.map((item, key) => (
                <Box 
                    key={key} 
                    sx={{
                        marginLeft: '50px',
                        padding: '10px',
                        cursor: 'pointer',
                    }}
                >
                    <Box sx={{
                        margin: '10px',
                        backgroundColor: '#fff'
                    }}> 
                        <Typography>News Id {item.id}</Typography>
                        <Typography>{item.description}</Typography>
                        <Typography>{item.url}</Typography>
                        <img 
                            src={item.image} 
                            style={{ width: '200px', height: '100px', padding: '20px' }} 
                            alt="News" 
                        />
                        <Typography>{item.content}</Typography>
                        
                        <Button 
                            sx={{
                                backgroundColor: 'green',
                                color: '#fff',
                                marginLeft: '20px'
                            }} 
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the Box onClick from firing
                                handleOpen(item); // Open modal with selected item
                            }}
                        >
                            Edit
                        </Button>

                        <Button 
                            sx={{
                                backgroundColor: 'red',
                                color: '#fff',
                                marginLeft: '30px'
                            }}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the Box onClick from firing
                                console.log('Delete clicked for:', item);
                                setOpen2(true)
                                setOpen(false)
                               // handleOpen(item)
                                setSelectedPosts(item);
                                // Add your delete logic here

                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            ))}

   </Box>
</Box>


{/* Modal for Editing */}

<Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box 
                    sx={{
                        width: 400,
                        height:600,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        overflow:'scroll'
                    }}
                >
                    {selectedPosts && (
                        <>
                        <Typography>Id</Typography>
                          <TextField placeholder={selectedPosts.id} value={id} onChange={(e)=>{setId(e.target.value)}}/>

                        <Typography>Reference Id</Typography>  
                        <TextField placeholder={selectedPosts.reference_id} value={reference2} onChange={(e)=>{setReference2(e.target.value)}}/> 

                        <Typography>Title</Typography> 
                        <TextField placeholder={selectedPosts.title} value={title2} onChange={(e)=>{setTitle2(e.target.value)}}/>

                        <Typography>Url</Typography>
                        <TextField placeholder={selectedPosts.url} value={url2} onChange={(e)=>{setUrl2(e.target.value)}}/>
                            <img 
                                src={selectedPosts.image} 
                                style={{ width: '100%', height: '150px', marginTop: '10px' }} 
                                alt="Selected News" 
                            /><br/>
                            <Typography sx={{padding:'10px',margin:'5px'}}>Preveiw of changed image</Typography>
                            <img src={ preview} sx={{width:'100px',height:'100px'}}/>
                           
                            <TextField type='file' onChange={(e)=>{
                             let file=e.target.files[0]
                             const objectUrl = URL.createObjectURL(file); // Create a URL for the file
                             setPreview(objectUrl); // Set the preview state to the object URL
                              //console.log(privews)
                            }}/>
                            <Button 
                                onClick={handleEditPost} 
                                variant="contained" 
                                sx={{ mt: 2 }}
                            >
                                Edit post
                            </Button>
                        </>
                    )}
                </Box>
</Modal>

<Modal open={open2}  onClose={handleClose}>
    <Box>
       <Box sx={{
         backgroundColor:'#fff',
         marginLeft:{xs:'30px',md:'500px'},
         marginTop:'250px',
         padding:'20px',
         width:{xs:'80%',md:'30%'},
         height:'30%'
       }}>
          <Typography>Are you sure! Do you want to delete these item</Typography>
         <Box sx={{
          marginLeft:{md:'70px',xs:'30px'}
         }}> 
           <Button onClick={(item)=>{
             console.log(selectedPosts)
             setDelet('block')
             handleDelete();
           }} sx={{backgroundColor:'red',color:'#fff',margin:'10px'}}><CircularProgress sx={{
              position:'absolute',
              display:delet,
              width:'10px',
              height:'10px'
           }}/>Yess</Button>
           <Button onClick={handleClose} sx={{backgroundColor:'green',color:'#fff',margin:'10px'}}>No</Button>
         </Box>
       </Box>
    </Box>
</Modal>


        </Box>  
    </div>
  )
}

export default Edit;