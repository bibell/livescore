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
  const [files,setMyfiles]=useState();
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
      password: password,
    };


    //const formData = new FormData();
    //formData.append('image',files)
   // formData.append('info',info)
    authAxois
      .post('/admin/save/create/catagory', info)
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
            <Typography>User Name</Typography>
            <TextField
              placeholder='User Name'
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
            <Typography sx={{ padding: '10px' }}>League Clube</Typography>
            <select
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              style={{
                width: '300px',
                border: '1px solid black',
                padding: '10px',
              }}
            >
              <option>Primier League</option>
              <option>Spain Lalig</option>
              <option>Bundeslega</option>
              <option>France League</option>
              <option>Germen League</option>
            </select>
            <br /><br />
            <Typography sx={{ padding: '10px' }}>Catagory Clube</Typography>
            <select
              value={clube}
              onChange={(e) => setClube(e.target.value)}
              style={{
                width: '300px',
                border: '1px solid black',
                padding: '10px',
              }}
            >
              <option>Man City</option>
              <option>Arsenal</option>
              <option>Man united</option>
              <option>Liverpool</option>
              <option>Chelsee</option>
              <option>Totunam</option>
              <option>westhum</option>
            </select>
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
            marginLeft: '500px',
            marginTop: '-50px',
            height: '400px',
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontSize: '30px',
              fontWeight: 'bold',
              marginTop: '-670px',
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
                  <Typography variant='h5'>Name: {user.name}</Typography>
                  <Typography variant='h6'>Leagues: {user.league}</Typography>
                  <Typography variant='h6'>Clube: {user.clube}</Typography>
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