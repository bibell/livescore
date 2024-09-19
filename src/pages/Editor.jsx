import React, { useEffect } from 'react';
import {HtmlEditor,Image,Inject,Link,QuickToolbar,RichTextEditorComponent,Toolbar} 
from '@syncfusion/ej2-react-richtexteditor';
import {EditorData} from '../data/dummy';
import {Header} from '../components';
import { Box, ListItem, Stack, TextField, Typography,Button,Skeleton,List } from '@mui/material';
import { useState } from 'react';
import authAxois from '../requestHandler';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
//import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { CircularProgress } from '@mui/joy';
//import Skeleton from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';


const Editor = () => {
  
      const [challenge,setChallenge]=useState();
      const [leagues,setLeagues]=useState();
      const [teamOne,setTeamOne]=useState();
      const [teamTwo,setTeamTwo]=useState();
      const [matchTime,setMatchTime]=useState();
      const [matchDate,setMatchDate]=useState();
      const [loading,setLoading]=useState(true);
     const [news,setNews]=useState();
     const [progress,setProgress]=useState('none')
     const [liveChallenges,setLiveChallenge]=useState([]);
     const [selectedDate,setSelectedDate]=useState();
     const [filter,setFilter]=useState('none');
     const [rows,setRows]=useState();
     const [match,setMatch]=useState();
     const [fixtureId,setFixtureId]=useState(); 
     const [selectedValue, setSelectedValue] = useState('');
    

let fixtureEndpoint=`https://api.sportmonks.com/v3/football/fixtures/date/${matchDate}?api_token=QhFFEhlek17JsprpWfysPgaWFygkgwQwMGOkyE6towjF906e8PQFYwp3vkNL&include=participants;events;formations;league;lineups;coaches;state;venue;timeline;sidelined;scores;statistics;referees&per_page=50`
  const handlePost=()=>{
  
      //// date and time formate
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const isAM = hours < 12;
      const period = isAM ? 'AM' : 'PM';
      const hours12 = hours % 12 || 12;


     const info={
          challenge:selectedValue,
          gameMatch:match,
          fixtureId:fixtureId,
          matchDate:matchDate,
          matchTime:matchTime
        }

    authAxois.post('/admin/user/dynamic/challeng',info).then(async(res)=>{
         if(res.status==200){
            toast.success('Post Success')
         }
    }).catch(e=>e)




  }    

  useEffect(()=>{
     fetchData();
     axios.get('https://backend.habeshalivescore.com/api/football_by_date_1?date=2024-09-09').then((res)=>{
      console.log(res.data.data)
      setRows(res.data.data)
  }).catch(e=>e)

  },[])


  const fetchData=()=>{
     authAxois.get('/admin/live-challenge/reserve').then((res)=>{
          if(res.status==200){
               setLoading(false)
          }
         // setNews(res.data.data)
     }).catch(e=>e)
  }


  const handleDateChange = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd'); // Format date as ISO string or any comparable format
    console.log('Formatted Date:', formattedDate); // Debugging line
    setSelectedDate(formattedDate)
  
  }

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-1x1' ><br/><br/>
    <Box sx={{width:{xs:"550px"},
                backgroundColor:'#fff'
               }}> 
      <Header category="Challenges" title="Game Related Challenge" />
      <ToastContainer />
   {/*   
      <RichTextEditorComponent>
        <Inject services={[HtmlEditor,Toolbar,Image,Link,QuickToolbar]}/>
      </RichTextEditorComponent>
   */}
   <Box sx={{
     
   }}>
      <Stack sx={{
        backgroundColor:'#fff',
        width:{xs:'500px'}
      }}>
        <ListItem sx={{
                      width:{xs:'400px',md:'700px'},
                      }}>
   

<FormControl sx={{width:{xs:'100%',md:'50%'}}}>
      <InputLabel id="demo-simple-select-label">Challenges</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label="Select Option"
        onChange={(e)=>{setSelectedValue(e.target.value)}}
      >
        <MenuItem value="who will win">Who Will Win</MenuItem>
        <MenuItem value="Will both score">Will both score</MenuItem>
        <MenuItem value="Equlaizer">Equlaizer</MenuItem>
        <MenuItem value="Top Score">Top Score</MenuItem>
        <MenuItem value="who will Score First">Who Will Score First</MenuItem>
      </Select>
    </FormControl>
 
        </ListItem >   



        <ListItem sx={{
                      width:'700px',
                      }}>
             <Typography variant='h6' sx={{
                     marginLeft:{xs:'-20px',md:'10px'},
                     padding:'20px',
                     color:'black',
            }}>Game Match</Typography>
             <Typography value={teamOne} onChange={(e)=>{setTeamOne(e.target.value)}} sx={{
                  position:'absolute',
                  lineHeight:'30px',
                  marginLeft:{xs:'200px',md:'200px'},
                  borderTop:'none',
             }}>{match}</Typography>
        </ListItem>


        <ListItem sx={{
                      width:'700px',
                      }}>
             <Typography variant='h6' sx={{
                  marginLeft:{xs:'-20px',md:'10px'},
                  padding:'20px',
                  color:'black',
            }}>Game Id</Typography>
             <Typography sx={{
                   position:'absolute',
                   lineHeight:'30px',
                   marginLeft:{xs:'100px',md:'200px'},
                   borderTop:'none',
             }}>{fixtureId}</Typography>
        </ListItem>


        
        <ListItem sx={{
                      width:'700px',
                      }}>
             <Typography variant='h6' sx={{
                  marginLeft:{xs:'-20px',md:'10px'},
                  padding:'20px',
                  color:'black',
            }}>Game Match Date</Typography>
             <Typography sx={{
                   position:'absolute',
                   lineHeight:'30px',
                   marginLeft:{xs:'200px',md:'230px'},
                   borderTop:'none',
             }}>{matchDate}</Typography>
        </ListItem>



        
        <ListItem sx={{
                      width:'700px',
                      }}>
             <Typography variant='h6' sx={{
                  marginLeft:{xs:'-20px',md:'10px'},
                  padding:'20px',
                  color:'black',
            }}>Game Match Time</Typography>
             <Typography sx={{
                   position:'absolute',
                   lineHeight:'30px',
                   marginLeft:{xs:'200px',md:'230px'},
                   borderTop:'none',
             }}>{matchTime}</Typography>
        </ListItem>



<Button onClick={handlePost} sx={{
                             backgroundColor:'rgb(34, 179, 184)',
                             color:'#fff',
                             width:'200px'}}>Post Challenge</Button>

      </Stack>
   </Box>

   <Box sx={{
  position:{md:'absolute',xs:'relative'},
  backgroundColor:'#f4f4f4',
  width:{xs:'500px',md:'300px'},
  height:{md:'600px',xs:'800px'},
  marginLeft:{md:'450px',xs:'20px'},
  marginTop:{md:'-530px',xs:'100px'},
  border:'1px solid gray',
  padding:'10px',
  overflow:'scroll',
  borderRadius:'20px'
}}>
   
   
   <Typography variant='h6'>
       Filter Games By Dates
       <DatePicker
          selected={selectedDate}
          value={selectedDate}
          onChange={handleDateChange}
          dateFormat="EEE MMM dd yyyy"
          placeholderText="Select Date"
         
		  style={{
			padding:'20px',
			marginLeft:'50px',
            width:'150px'
		  }}
        />
        <Button onClick={()=>{
            setFilter('block')
            setLoading(true)
          axios.get(`https://backend.habeshalivescore.com/api/football_by_date_1?date=${selectedDate}`).then((res)=>{
                console.log(res)
                setRows(res.data.data)
                setFilter('none')
                setLoading(false)
            }).catch(e=>e)
        }} sx={{backgroundColor:'red',
                color:'#fff',
                width:'200px',
                padding:'10px',
                margin:'10px'
                }}>
                    <CircularProgress sx={{display:filter}}/>Filter</Button>
   </Typography>


   {loading ? (
  // Show Skeletons while loading
  <Stack spacing={2}>
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <Skeleton variant="circular" width={50} height={50} /><br/>
      <Skeleton variant="text" sx={{ fontSize: '12px', marginLeft: '60px', marginTop: '-50px' }} width="60%" />
      <Skeleton variant="text" sx={{ fontSize: '10px', marginLeft: '60px', marginTop: '-30px' }} width="80%" />
      <Skeleton variant="text" sx={{ fontSize: '9px', marginLeft: '60px', marginTop: '15px' }} width="40%" />
      <Skeleton variant="rectangular" height={50} />
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton variant="rectangular" width="45%" height={36} />
        <Skeleton variant="rectangular" width="45%" height={36} />
      </Box>
    </Box>

    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <Skeleton variant="circular" width={50} height={50} /><br/>
      <Skeleton variant="text" sx={{ fontSize: '12px', marginLeft: '60px', marginTop: '-50px' }} width="60%" />
      <Skeleton variant="text" sx={{ fontSize: '10px', marginLeft: '60px', marginTop: '-30px' }} width="80%" />
      <Skeleton variant="text" sx={{ fontSize: '9px', marginLeft: '60px', marginTop: '15px' }} width="40%" />
      <Skeleton variant="rectangular" height={50} />
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton variant="rectangular" width="45%" height={36} />
        <Skeleton variant="rectangular" width="45%" height={36} />
      </Box>
    </Box>


    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <Skeleton variant="circular" width={50} height={50} /><br/>
      <Skeleton variant="text" sx={{ fontSize: '12px', marginLeft: '60px', marginTop: '-50px' }} width="60%" />
      <Skeleton variant="text" sx={{ fontSize: '10px', marginLeft: '60px', marginTop: '-30px' }} width="80%" />
      <Skeleton variant="text" sx={{ fontSize: '9px', marginLeft: '60px', marginTop: '15px' }} width="40%" />
      <Skeleton variant="rectangular" height={50} />
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton variant="rectangular" width="45%" height={36} />
        <Skeleton variant="rectangular" width="45%" height={36} />
      </Box>
    </Box>
  </Stack>
) : (
  // Render actual content when data is loaded
  rows?.map((item, index) => {
    // Ensure that the link exists before processing


    return (
      <Stack key={index}>
        <List>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '10px',
              margin: '10px',
              borderRadius: '10px',
              position: 'relative',
            }}
          >
            
     

            <ListItem
              sx={{
                position: 'absolute',
                fontSize: '10px',
                width: '200px',
                marginLeft: '60px',
                marginTop: '-30px',
              }}
            >
              {item.title}
            </ListItem>
  
            <ListItem
              sx={{
                cursor:'pointer',
                fontSize: '15px',
                marginLeft: '-30px',
                marginTop: '15px',
              }}
              onClick={()=>{
                 console.log("all information included the fixture id")
                 console.log(item)
                 setMatch(item.name)
                 setFixtureId(item.coaches[0].meta.fixture_id)
                 setMatchDate(item.starting_at.slice(0,11))
                 setMatchTime(item.starting_at.slice(12,23))
                 console.log(item)
              }}
            >
<img src={item.participants[0].image_path} style={{
        width:'60px',
        height:'60px',
      
        padding:'10px',
        margin:'10px'
     }}/>
             {item.name}
    <img src={item.participants[1].image_path} style={{
        width:'60px',
        height:'60px',
      
        padding:'10px',
        margin:'10px'
     }}/>


            </ListItem>

         

            {/* Edit and Delete Buttons */}
     
          </Box>
        </List>
      </Stack>
    );
  })
)}


</Box>

    </Box></div>
  )
}

export default Editor