
import { useState,useEffect } from 'react'
import { Header } from './components';
import { Typography,Box,TextField, Button,Modal } from '@mui/material';
import authAxois from './requestHandler';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';



const Catagory = () => {
  const [title,setTitle]=useState();
  const [source,setSource]=useState();
  const [link,setLink]=useState();
  const [clube,setClube]=useState();
  const [league,setLeague]=useState();
  const [content,setContent]=useState();
  const [usersPost,setUsersPost]=useState(); 
  const [myfiles,setMyfiles]=useState(null) 
  const [open,setOpen]=useState(false);
  const [selectedPost,setSelectedPost]=useState([]);
  const [formData,setFormData]=useState({
    source:'',
    title:'',
    auther:'',
    description:'',
    time:'',
    date:'',
    content:''

  });

const {name}=useParams()
console.log(name)


const handleOpen = (post) => {
  setSelectedPost(post);
  setOpen(true);
};

const handleFormChange=()=>{}

const handleFormSubmit=()=>{}

/// fetch reserve method
const fetchData=()=>{
authAxois.get(`/admin/catagory/post/${name}`).then((res)=>{
   console.log(res.data)
   setUsersPost(res.data.data)
}).catch((e)=>e)

}


/*** 
const handleCatagory=()=>{

    const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const isAM = hours < 12;
  const period = isAM ? 'AM' : 'PM';
  const hours12 = hours % 12 || 12;


const info={
     name:name,
     title:title,
     source:source,
     clube:clube,
     content:content,
     link:link,
     date: Date().slice(0, 15),
     time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}` 
    }
     

   // const formData = new FormData();
   // info.append("image", myfiles);
   // info.append("name",name);
    //info.append("title",title)
    //info.append("source",source);
    //info.append("content",content);
    //info.append("link",link);
    //info.append("date",Date().slice(0, 15));
    //info.append("time",`${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`);


 authAxois.post('/admin/catagory/save/post',info).then((res)=>{
    if(res.status===200){ 
       toast.success('Post Success')
       window.location.reload();
      }else{
         toast.error('Unable to Post')
      }
 }).catch(e=>e)
 
 
 }
****/

const handleClose=()=>{
   setOpen(false)
}

const handleCatagory=()=>{

  const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const isAM = hours < 12;
const period = isAM ? 'AM' : 'PM';
const hours12 = hours % 12 || 12;


const info={
   name:name,
   title:title,
   source:source,
   clube:clube,
   content:content,
   link:link,
   date: Date().slice(0, 15),
   time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}` 
  }
   

  const formData = new FormData();
  formData.append("image", myfiles);
  formData.append("name",name);
  formData.append("title",title)
  formData.append("source",source);
  formData.append("content",content);
  formData.append("link",link);
  formData.append("date",Date().slice(0, 15));
  formData.append("time",`${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`);


authAxois.post('/admin/catagory/save/post',formData).then((res)=>{
  console.log(res.data)
  if(res.status===200){ 
     toast.success('Post Success')
     window.location.reload();
    }else{
       toast.error('Unable to Post')
    }
}).catch(e=>e)

}

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
    title:selectedPost.title,
    //auther:auther,
    content:selectedPost.content,
    file:myfiles,
    date: Date().slice(0, 15),
    time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`, 
   }
 

  const formData = new FormData();
  formData.append("image", myfiles);  // "image" is the field name in the backend
  formData.append("auther",info.auther);
  formData.append("title",info.title);
  formData.append("mydata",info.mydata);
  formData.append("date",info.date)
  formData.append("time",info.time)
  
  console.log(formData)
  //const newForm=formData.append("image",myfiles)
 

  try {
      const response = await authAxois.post("/admin/save/news", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
      console.log('Server response:', response.data);
      if(response.status===200){
        setProgress('none')
        //alert('sucess')
        //toast.success('Your news has been updated Successfully')
       // window.location.reload();
      }
  } catch (error) {
      console.error('Error uploading file:', error.response.data);
  }
};
 

useEffect(()=>{
  fetchData();
},[])

  return (
    <div>
          <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
          <Header category="catagories" title="Your Catagory Posts"/>
          <ToastContainer />
          <Box sx={{

          }}>
             <Typography>Title</Typography>
             <TextField placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}} sx={{
              width:'300px'
             }}/>
             <br/><br/>
             <Typography>source</Typography>
             <TextField placeholder='Source' value={source} onChange={(e)=>{setSource(e.target.value)}} sx={{
              width:'300px'
             }}/>

           <Typography>Content</Typography>
             <TextField placeholder='Phone' value={content} onChange={(e)=>{setContent(e.target.value)}} sx={{
              width:'300px'
             }}/>
         
         <Typography>links</Typography>
             <TextField placeholder='Phone' value={link} onChange={(e)=>{setLink(e.target.value)}} sx={{
              width:'300px'
             }}/>
           
            <br/>
            <Typography>Atach Images</Typography>
         <TextField type='file' onChange={(e)=>{setMyfiles(e.target.files[0])}} sx={{
           width:'300px'
         }}/><br/><br/>

             <Button onClick={handleCatagory} sx={{
              backgroundColor:'rgb(26, 190, 190)',
              color:'#fff',
              width:'300px',
              marginTop:'30px'
             }}>Post</Button>


          </Box>
<Box sx={{
  position:'fixed',
  marginLeft:'500px',
  height:'500px',
  width:'300px',
  marginTop:'-650px',
  overflow:'scroll'

}}>
  <Typography variant='h6' sx={{
    fontSize:'30px',
    fontWeight:'bold'
  }}>{name} Posts</Typography>
   {
    usersPost?.map((item,key)=>{
      return(<Box sx={{
        padding:'10px',
        margin:'10px',
        backgroundColor:'#054267',
        color:'#fff',
        width:'280px',
        borderRadius:'5px'
      }}>
        <Typography variant='h4' sx={{
          fontSize:'20px',
          fontWeight:'bold',
          margin:'5px'
        }}>{item.title}</Typography>
        <p style={{color:'gray',margin:'5px'}}>on :{item.date} at {item.time}</p>
        <img src={item.image} style={{
           width:'100%',
           height:'100px',
           marginLeft:'0px',
           
        }}/>
        <Typography variant='h6' sx={{
           fontFamily:'arial',
           fontSize:'15px'
        }}>{item.content}</Typography>
<Button sx={{backgroundColor:'red',color:'#fff',border:'1px solid black'}} onClick={()=>{
                                                           handleOpen(item)
                                                           setOpen(true)}}>Edit</Button>
<Button  sx={{backgroundColor:'red',color:'#fff',border:'none',marginLeft:'50px'}}>Delete</Button>
      </Box>)
    })
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
      label="Title"
      name="title"
      value={selectedPost.title}
      onChange={handleFormChange}
      fullWidth
      margin="normal"
    />
    <Typography>Change Image</Typography>
    <TextField
      type="file"
      onChange={(e)=>{setMyfiles(e.target.files[0])}}
      alt="image"
    />

    <TextField
      label="Description"
      name="description"
      value={selectedPost.content}
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
        onClick={onFileUpload}
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
  </div>  
  )
}

export default Catagory;