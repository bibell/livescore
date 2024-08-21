import React, { useEffect } from 'react';
import {KanbanComponent,ColumnDirective,ColumnsDirective} from '@syncfusion/ej2-react-kanban'
import {kanbanData,kanbanGrid} from '../data/dummy';
import {Box, Input, ListItem, TextareaAutosize, TextField, Typography,Stack,List} from '@mui/material'
import CircularProgress from '@mui/joy/CircularProgress';
//import {ToastContainer} from 'react-toastify'
import { useState } from 'react';
import authAxois from '../requestHandler';
import {Header} from '../components'

const Kanban = () => {
  const [title,setTitle]=useState();
  const [name,setName]=useState();
  const [myData,setmyData]=useState();
  const [myfiles,setMyfiles]=useState(null)
  const [progress,setProgress]=useState('none')
  const [news,setNews]=useState([]);
  const [auther,setAuther]=useState();


  useEffect(()=>{
    fetchData()
  },[])

const fetchData=async()=>{
  const response=await authAxois.get('/admin/users/adds')
  console.log(response.data)
  setNews(response.data.data) 
} 
   
/**** 
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
        window.location.reload();
      }
  } catch (error) {
      console.error('Error uploading file:', error.response.data);
  }
};
***/


const onFileUpload = async () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  setProgress('block');

  const isAM = hours < 12;
  const period = isAM ? 'AM' : 'PM';
  const hours12 = hours % 12 || 12;

  const info = {
    title: title,
    auther: auther,
    mydata: myData,
    date: Date().slice(0, 15),
    time: `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`, 
  };

  //const formData = new FormData();

  // Assuming myfiles is an array of selected files
  const formData = new FormData();
  formData.append("image", myfiles);
  formData.append("auther", info.auther);
  formData.append("title", info.title);
  formData.append("mydata", info.mydata);
  formData.append("date", info.date);
  formData.append("time", info.time);

  try {
    const response = await authAxois.post("/admin/save/adds", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log('Server response:', response.data);

    if (response.status === 200) {
      setProgress('none');
      //window.location.reload();
    }
  } catch (error) {
    console.error('Error uploading file:', error.response?.data);
  }
};


  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="App" title="Add Placement"/>
      <Box>
           <Box>
               <Typography variant='h6'>Add Source</Typography>
                <TextField value={auther} onChange={(e)=>{setAuther(e.target.value)}} placeholder='Place the Source' sx={{
                  border:'none',
                  borderBottom:'2px solid green',
                  width:'320px'
                }}/>
               <Typography variant='h6'>Add Title</Typography>
               <TextField value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='publish your title...' sx={{
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

<Typography variant='h6'>Attach Photos</Typography>
<TextField
  type='file'
   // Allows multiple file selection
  onChange={(e) => {setMyfiles(e.target.files[0])}} // Updates state with multiple files
/><br/>

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
  backgroundColor:'#fff',
  width:'300px',
  height:'560px',
  marginLeft:{md:'450px',xs:'20px'},
  marginTop:{md:'-600px',xs:'100px'},
  border:'1px solid gray',
  padding:'10px',
  overflow:'scroll',
  borderRadius:'20px'
}}>
   <Typography variant='h4' sx={{
   
   }}>Recent Post</Typography>
     {news.map((item, index) => (
         <Stack>
             <List>
             <Box sx={{
                  backgroundColor:'#f4f4f4',
                  padding:'10px',
                  margin:'10px',
                  borderRadius:'10px',
                  }}> 
      
            
                <img src={item.imgUrl} style={{
                   width:'50px',
                   height:'50px',
                   borderRadius:'30px'
                }}/>
                 <ListItem key={index} sx={{
                  position:'absolute',
                  fontSize:'12px',
                  marginLeft:'50px',
                  marginTop:'-50px',
                  fontWeight:'bold'
                }}>{item.source}</ListItem>

               <ListItem key={index} sx={{
                  position:'absolute',
                  fontSize:'15px',
                  marginLeft:'50px',
                  marginTop:'-30px',
                  
                }}>{item.title}</ListItem>

                <ListItem sx={{
                  fontSize:'9px',
                  marginLeft:'50px',
                  marginTop:'0px'
                }}>On :{item.date} at {item.time}</ListItem>
                <Typography>{item.body}</Typography>      
               </Box>
             </List>
         </Stack>
          // Assuming each news item has a "title" field
        ))}
</Box>


        </Box>
    </div>
  )
}

export default Kanban