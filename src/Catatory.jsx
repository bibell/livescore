
import { useState,useEffect } from 'react'
import { Header } from './components';
import { Typography,Box,TextField, Button } from '@mui/material';
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

const {name}=useParams()
console.log(name)


/// fetch reserve method
const fetchData=()=>{
authAxois.get(`/admin/catagory/post/${name}`).then((res)=>{
   console.log(res.data)
   setUsersPost(res.data.data)
}).catch((e)=>e)

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
     

   // const info = new FormData();
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
            <Typography sx={{
                padding:'10px'
              }}>League Clube</Typography>
                <select value={league} onChange={(e)=>{setLeague(e.target.value)}} style={{
                  width:'300px',
                  border:'1px solid black',
                  padding:'10px'
                }}>
                    <option>Primier League</option>
                    <option>Spain Lalig</option>
                    <option>Bundeslega</option>
                    <option>France League</option>
                    <option>Germen League</option>
                    
                    
                </select><br/>
             <br/>

              <Typography sx={{
                padding:'10px'
              }}>Catagory Clube</Typography>
                <select value={clube} onChange={(e)=>{setClube(e.target.value)}} style={{
                  width:'300px',
                  border:'1px solid black',
                  padding:'10px'
                }}>
                    <option>Man City</option>
                    <option>Arsenal</option>
                    <option>Man united</option>
                    <option>Liverpool</option>
                    <option>Chelsee</option>
                    <option>Totunam</option>
                    <option>westhum</option>
                    
                </select><br/>
             <br/>
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
  position:'absolute',
  marginLeft:'500px',
  marginTop:'-800px'
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
        <Typography variant='h6' sx={{
           fontFamily:'arial',
           fontSize:'15px'
        }}>{item.content}</Typography>
      </Box>)
    })
   }
</Box>

      <></>
    </div>
  </div>  
  )
}

export default Catagory;