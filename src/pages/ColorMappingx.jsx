import React, { useState } from 'react'
import { Header } from '../components';
import { Typography,Box,TextField, Button } from '@mui/material';
import authAxois from '../requestHandler';
import { toast, ToastContainer } from 'react-toastify';


const ColorMappingx = () => {
  const [name,setName]=useState();
  const [phone,setPhone]=useState();
  const [password,setPassword]=useState();
  const [clube,setClube]=useState();
  const [league,setLeague]=useState();

const handleCreate=()=>{
   const info={
    name:name,
    phone:phone,
    email:'',
    clube:clube,
    catagory_status:'yess',
    league:league,
    password:password,
   }

   authAxois.post('/admin/save/create/catagory',info).then((res)=>{
  
     console.log(res.data)
     if(res.status===200){
      toast.success('Catagory Created Successfully')
     }else{
       toast.error('unable to create catagory')
     }
   }).catch((e)=>{
     console.log(e)
   })

}


  return (
    <div>
          <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
          <Header category="catagories" title="Create Catagory"/>
          <ToastContainer />
          <Box sx={{

          }}>
             <Typography>User Name</Typography>
             <TextField placeholder='User Name' value={name} onChange={(e)=>{setName(e.target.value)}} sx={{
              width:'300px'
             }}/>
             <br/><br/>
             <Typography>Phone</Typography>
             <TextField placeholder='Phone' value={phone} onChange={(e)=>{setPhone(e.target.value)}} sx={{
              width:'300px'
             }}/>

           
            <br/><br/>
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
             <br/><br/>

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
             <br/><br/>
            <TextField type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' sx={{
              width:'300px'
             }}/><br/><br/>

             <Button onClick={handleCreate} sx={{
              backgroundColor:'rgb(26, 190, 190)',
              color:'#fff',
              width:'300px',
              marginTop:'30px'
             }}>Create</Button>


          </Box>
<Box sx={{
  position:'absolute',
  marginLeft:'500px',
  marginTop:'-550px'
}}>
  <Typography variant='h6' sx={{
    fontSize:'30px',
    fontWeight:'bold'
  }}>Catagory Lists</Typography>
   
</Box>

      <></>
    </div>
  </div>  
  )
}

export default ColorMappingx