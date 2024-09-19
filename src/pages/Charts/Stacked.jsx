import React from 'react'
import { Header } from '../../components';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime,Legend, 
  SplineAreaSeries} from '@syncfusion/ej2-react-charts';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import {areaCustomSeries,areaPrimaryXAxis,areaPrimaryYAxis} from '../../data/dummy';
 import { useStateContext } from '../../contexts/ContextProvider';
import { TextField,Box,Typography, Button, ListItem,Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import authAxois from '../../requestHandler';

const Stacked = () => {
   const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6,setIsChecked6]=useState(false);
  const [isChecked7,setIsChecked7]=useState(false);
  const [isChecked8,setIsChecked8]=useState(false);
  const [isChecked9,setIsChecked9]=useState(false);
  const [isChecked10,setIsChecked10]=useState(false);

  const [name,setName]=useState();
  const [phone,setPhone]=useState();
  const [password,setPassword]=useState();
  const [email,setEmail]=useState();
  const [loading,setLoading]=useState(false);

  const {currentMode} = useStateContext(); 






  const handleCheckbox1 = () => {
   setIsChecked1(!isChecked1);
 };

 const handleCheckbox2 = () => {
   setIsChecked2(!isChecked2);
 };

 const handleCheckbox3 = () => {
   setIsChecked3(!isChecked3);
 };

 const handleCheckbox4 = () => {
   setIsChecked4(!isChecked4);
 };

 const handleCheckbox5 = () => {
   setIsChecked5(!isChecked5);
 };

 const handleCheckbox6 = () => {
  setIsChecked6(!isChecked6);
};

const handleCheckbox7 = () => {
  setIsChecked7(!isChecked7);
};

const handleCheckbox8 = () => {
  setIsChecked8(!isChecked8);
};

const handleCheckbox9 = () => {
  setIsChecked9(!isChecked9);
};

const handleCheckbox10 = () => {
  setIsChecked10(!isChecked10);
};

const handleCreate=()=>{
  setLoading(true)
  const info={
    name:name,
    phone:phone,
    email:email,
    isChecked1:isChecked1,
    isChecked2:isChecked2,
    isChecked3:isChecked3,
    isChecked4:isChecked4,
    isChecked5:isChecked5,
    isChecked6:isChecked6,
    isChecked7:isChecked7,
    isChecked8:isChecked8,
    isChecked9:isChecked9,
    isChecked10:isChecked10,
    password:password,
    catagory_status:'no',
    clube:'no',
    league:'no'
  }

  console.log(info)
  authAxois.post('/admin/user/creation',info).then((res)=>{
    console.log(res.data)
    if(res.status===203){
      toast.error('Admin User Already Registerd With These Phone Number.')
      setLoading(false)
    }
    if(res.status===200){
       toast.success('Admin User Created Sucessfully....')
       setLoading(false)
    }
  }).catch((e)=>{
    console.log(e)
    setLoading(false)
  })

}



  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
        <br/><br/>
       
        <Header category="Acount Creation" title="Create New Acount" style={{marginLeft:'50px'}}/>
        <ToastContainer />
        <Box sx={{
           backgroundColor:'#fff',
           marginLeft:{xl:'50px',md:'50px',xs:'10px'},
           width:{xl:'800px',md:'800px',xs:'400px'},
           height:'400px',
        }}>
           <Typography sx={{
              color:'black',
              margin:'10px'
           }}>Employee Name</Typography>
           <input style={{
            border:'1px solid black',
            padding:'7px',
            margin:'10px',
            width:'300px',
            borderRadius:'10px'
           }} value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='name'/>
           <Typography sx={{
              color:'black',
              margin:'10px'
           }}>Phone</Typography>
            <input style={{
            border:'1px solid black',
            padding:'7px',
            margin:'10px',
            width:'300px',
            borderRadius:'10px'
           }} value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder='phone'/>

<Typography sx={{
              color:'black',
              margin:'10px'
           }}>Priviledge</Typography>
   <Stack direction='horizontal' sx={{
     position:{xs:'fixed',md:'absolute'},
     width:{xs:'300px',md:'800px'},
     overflow:{xs:'scroll',md:'none'},
    
   }}>
    <br/><br/>
      <ListItem sx={{
      }}>
        <input type="checkbox" checked={isChecked1} onChange={handleCheckbox1} style={{margin:'5px'}}/>
        Post News
      </ListItem>
      <br />
      <ListItem >
        <input type="checkbox" checked={isChecked2} onChange={handleCheckbox2} style={{margin:'5px'}}/>
        Post Heighlight
      </ListItem>
      <br />
      <ListItem>
        <input type="checkbox" checked={isChecked3} onChange={handleCheckbox3} style={{margin:'5px'}}/>
        Create Users 
      </ListItem>
      <br/>
      <ListItem>
        <input type="checkbox" checked={isChecked4} onChange={handleCheckbox4} style={{margin:'5px'}}/>
       Block User - Not Active Yet
      </ListItem>
      <br />
      <ListItem>
        <input type="checkbox" checked={isChecked5} onChange={handleCheckbox5} style={{margin:'5px'}}/>
       See Chat - Not Active yet
      </ListItem>
      <br />
      <ListItem>
        <input type="checkbox" checked={isChecked6} onChange={handleCheckbox6} style={{margin:'5px'}}/>
        Create Adds
      </ListItem>
       <br/>
       <ListItem>
        <input type="checkbox" checked={isChecked7} onChange={handleCheckbox7} style={{margin:'5px'}}/>
        Create Catagory
      </ListItem>
       <br/>
       <ListItem>
        <input type="checkbox" checked={isChecked8} onChange={handleCheckbox8} style={{margin:'5px'}}/>
        Post Live Match
      </ListItem>
       <br/>
       <ListItem>
        <input type="checkbox" checked={isChecked9} onChange={handleCheckbox9} style={{margin:'5px'}}/>
        Post Live Challenge
      </ListItem>
       <br/>
       <ListItem>
        <input type="checkbox" checked={isChecked10} onChange={handleCheckbox10} style={{margin:'5px'}}/>
        Post Dynamic Heighlight
      </ListItem>
       <br/>

    </Stack>

       <Box sx={{
          position:{xl:'absolute',md:'absolute',xs:'relative'},
          marginLeft:{xl:'400px',xs:'10px',md:'400px'},
          marginTop:{xl:'-300px',md:'-300px',xs:'50px'}
       }}>    
           
           <Typography sx={{
              color:'black',
              margin:'10px',
              marginTop:{xs:'140px',md:'50px'}
           }}>Email</Typography>
           <input style={{
            border:'1px solid black',
            padding:'7px',
            margin:'10px',
            width:'300px',
            borderRadius:'10px'
           }} value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/>
          <Typography sx={{
              color:'black',
              margin:'10px'
           }}>Password</Typography>
           <input style={{
            border:'1px solid black',
            padding:'7px',
            margin:'10px',
            width:'300px',
            borderRadius:'10px'
           }} type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>
           <br/>
   </Box>

          <Button sx={{
            position:{xl:'absolute',md:'relative',xs:'relative'},
            width:{xl:'700px',md:'700px',xs:'300px'},
            marginLeft:{xl:'-300px',md:'50px'},
            marginTop:{xl:'200px',md:'100px',xs:'50px'},
            backgroundColor:'#1171f8',
            color:'#fff'
          }} onClick={handleCreate}>    {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'green',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}Create</Button> 
           
        </Box>  
          
    </div>
  )
}

export default Stacked