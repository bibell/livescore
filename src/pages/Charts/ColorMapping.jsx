import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import { Typography, Box, TextField, Button } from '@mui/material';
import authAxois from '../../requestHandler';
import { toast, ToastContainer } from 'react-toastify';

const ColorMapping = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [clube, setClube] = useState('');
  const [league, setLeague] = useState('');
  const [adminuser, setAdminuser] = useState([]);
  const [files,setMyfiles]=useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleCreate = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const info = {
      name: name,
      phone: phone,
      email: '',
      clube: clube,
      catagory_status: 'yess',
      league: league,
      file:files,
      password: password,
    };


  console.log(info)
  const formData = new FormData();
  formData.append("image",files);
  formData.append("name",info.name);
  formData.append("phone",info.phone);
  formData.append("email",info.email);
  formData.append("clube",info.clube);
  formData.append("catagory_status",info.catagory_status)
  formData.append("league",info.league)
  formData.append("password",info.password)
  //console.log(formData)
  /*** *  
    authAxois.post('/admin/save/create/catagory',info)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast.success('Category Created Successfully');
          window.location.reload();
        } else {
          toast.error('Unable to create category');
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });

         ***/

 authAxois.post('/admin/save/create/catagory',formData).then((res)=>{
     console.log(res.data)
   if(res.data===200){  
     toast.success('Category Created Successfully');
     window.location.reload(); 
   }
 
    }).catch(e=>e)


  };

  useEffect(() => {
    authAxois
      .get('/admin/catagory/reserve')
      .then((res) => {
        console.log('no error has been occurred.....');
        console.log(res.data.data);
        setAdminuser(res.data.data);
      })
      .catch((e) => {
        console.log('Error during fetching users information');
        console.log(e);
      });
  }, []);

  return (
    <div>
      <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
        <Header category="catagories" title="Create Catagory" />
        <ToastContainer />
        <form onSubmit={handleCreate}>
          <Box>
            <Typography>Clube Name</Typography>
            <TextField
              placeholder='Clube Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: '300px' }}
            />
            <br /><br />
            <Typography>Phone</Typography>
            <TextField
              placeholder='Phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ width: '300px' }}
            />
            <br /><br />
      
         
            <Typography>Your Logo Here</Typography>
            <TextField 
                      type='file' 
                      placeholder='Catagory Logo'
                      onChange={(e)=>{setMyfiles(e.target.files[0])}}
                      sx={{ width: '300px' }}/><br/><br/>

            <TextField
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='password'
              sx={{ width: '300px' }}
            />
            <br /><br />
            <Button
              type='submit'
              disabled={isSubmitting}
              sx={{
                backgroundColor: 'rgb(26, 190, 190)',
                color: '#fff',
                width: '300px',
                marginTop: '30px',
              }}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </Box>
        </form>

        <Box
          sx={{
            position:'absolute',
            marginLeft: {xs:'10px',md:'500px'},
            marginTop:{md:'-40px',xs:'650px'},
            height: '400px',
           // overflow:'scroll'
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontSize: '30px',
              fontWeight: 'bold',
              marginTop: '-570px',
            }}
          >
            Catagory Lists
          </Typography>
          <Box>
            {adminuser?.map((user, index) => (
              <li key={index}>
                <Box
                  sx={{                   
                    backgroundColor: '#eeeeee',
                    padding: '10px',
                    margin: '10px',
                    
                  }}
                >
                  <img src={user.image} style={{
                     width:'100px',
                     height:'100px',
                     padding:'20px',
                     margin:'20px',
                     borderRadius:'20px'
                  }}/>
                  <Typography variant='h5' sx={{
                     fontWeight:'bold',
                     marginLeft:'20px'
                  }}>{user.name}</Typography>
                  
                </Box>
              </li>
            ))}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ColorMapping;