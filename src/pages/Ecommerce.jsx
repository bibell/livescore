import React, { useEffect,useState } from 'react';
//import { BsCurrencyDollar } from 'react-icons/bs';
import {GoPrimitiveDot} from 'react-icons/go';

import {Stacked, Pie, Button, SparkLine} from '../components';
import {earningData,SparklineAreaData,ecomPieChartData} from '../data/dummy';
import { ContextProvider, useStateContext } from '../contexts/ContextProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdAccountCircle, MdAddCircle, MdCampaign, MdLiveTv, MdOutlineCancel, MdOutlineTransferWithinAStation, MdPostAdd } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock, AiOutlineAlibaba, AiFillAlert } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid, GiNewspaper, GiSoccerBall } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { CssVarsProvider, ListItem, Typography } from '@mui/joy';
import authAxois from '../requestHandler';
import { Box,Stack} from '@mui/material';

const ECommerce = () => {
const [rowss,setRowss]=useState([])

const navigate=useNavigate();

  const {currentColor} = useStateContext();

  const fetch=()=>{
    authAxois.get('/admin/catagory/reserve').then((res)=>{
      ///setRowss(res.data)
      console.log(res.data.data)
      const filteredRows = res.data.data.filter(row => row.catagory_status === 'yess');
       setRowss(filteredRows);
    }).catch(e=>e)
  }

  useEffect(()=>{
     if(parseInt(sessionStorage.getItem('news'))===0){
       document.querySelector('.post').style.display='none'
     }

     if(parseInt(sessionStorage.getItem('see'))===0){
      document.querySelector('.users').style.display='none'
    }

    if(parseInt(sessionStorage.getItem('see'))===0){
      document.querySelector('.employee').style.display='none'
    }

    if(parseInt(sessionStorage.getItem('Dynamic-Heighlight'))===0){
      document.querySelector('.dynamic_heightlight').style.display='none'
    }

    if(parseInt(sessionStorage.getItem('Live-Match'))===0){
      document.querySelector('.live_match').style.display='none'
    }

    if(parseInt(sessionStorage.getItem('Live-Challenge'))===0){
      document.querySelector('.live_challenge').style.display='none'
    }

    if(parseInt(sessionStorage.getItem('catagory'))===0){
      document.querySelector('.Catagory').style.display='none'
    }
    if(parseInt(sessionStorage.getItem('create'))===0){
      document.querySelector('.create').style.display='none'
    }

    if(parseInt(sessionStorage.getItem('ads'))===0){
      document.querySelector('.ads').style.display='none'
    }
  
fetch();

  },[])

  return (
    <div className='mt-12'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
      

        
        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
          <div className='post' style={{
                        width:'250px',
                        height:'150px',
                        backgroundColor:'#fff',
                        padding:'20px',
                        cursor:'pointer',
                        margin:'10px'}} onClick={()=>{navigate('/Post')}}>
                          <GiNewspaper style={{
                            fontSize:'30px',
                            margin:'auto'
                          }}/>
                <p style={{
                   fontSize:'20px',
                   fontWeight:'bold',
                   marginTop:'30px',
                   textAlign:'center'
                }}>Post News</p>
          </div>

          <div className='users' style={{
                        width:'250px',
                        height:'150px',
                        backgroundColor:'#fff',
                        padding:'20px',
                        cursor:'pointer',
                        margin:'10px'}} onClick={()=>{navigate('/Users')}}>
                          <MdOutlineSupervisorAccount style={{
                            fontSize:'30px',
                            margin:'auto'
                          }}/>
                          <p  style={{
                      fontSize:'20px',
                      fontWeight:'bold',
                      marginTop:'30px',
                      textAlign:'center'
                }}>See Users</p>
          </div>

          <div className='employee' style={{
                        width:'250px',
                        height:'150px',
                        backgroundColor:'#fff',
                        padding:'20px',
                        cursor:'pointer',
                        margin:'10px'}} onClick={()=>{navigate('/employee')}}>
                            <MdOutlineSupervisorAccount style={{
                            fontSize:'30px',
                            margin:'auto'
                          }}/>
                          <p  style={{
                          fontSize:'20px',
                          fontWeight:'bold',
                          marginTop:'30px',
                          textAlign:'center'
                       }}>See Employee</p>
          </div>


          <div className='dynamic_heightlight' style={{
                        width:'250px',
                        height:'150px',
                        backgroundColor:'#fff',
                        padding:'20px',
                        cursor:'pointer',
                        margin:'10px'}} onClick={()=>{navigate('/Dynamic-Heighlight')}}>
                          
                          <MdPostAdd style={{
                            fontSize:'30px',
                            margin:'auto'
                          }}/>
                          <p  style={{
                          fontSize:'20px',
                          fontWeight:'bold',
                          marginTop:'30px',
                          textAlign:'center'
                       }}>Dynamic Heightlight</p></div>

          <div className='live_challenge' style={{
                        width:'250px',
                        height:'150px',
                        backgroundColor:'#fff',
                        padding:'20px',
                        cursor:'pointer',
                        margin:'10px'}} onClick={()=>{navigate('/live-challenge')}}>
                          <GiSoccerBall style={{
                            fontSize:'30px',
                            margin:'auto'
                          }}/>
                          <p  style={{
                          fontSize:'20px',
                          fontWeight:'bold',
                          marginTop:'30px',
                          textAlign:'center'
                       }}>Live Challenge</p></div>

          <div className='live_match' style={{
                        width:'250px',
                        height:'150px',
                        backgroundColor:'#fff',
                        padding:'20px',
                        cursor:'pointer',
                        margin:'10px'}} onClick={()=>{navigate('/live-match')}}>
                          <MdLiveTv style={{
                            fontSize:'30px',
                            margin:'auto'
                          }}/>
                          <p  style={{
                          fontSize:'20px',
                          fontWeight:'bold',
                          marginTop:'30px',
                          textAlign:'center'
                       }}>Live Match</p>
          </div>

          <div className='Catagory' style={{
                        width:'250px',
                        height:'150px',
                        backgroundColor:'#fff',
                        padding:'20px',
                        cursor:'pointer',
                        margin:'10px'}}  onClick={()=>{navigate('/Create-Catagory')}}>
                      <MdAddCircle style={{
                            fontSize:'30px',
                            margin:'auto'
                          }}/>    
                          <p style={{
                          fontSize:'20px',
                          fontWeight:'bold',
                          marginTop:'30px',
                          textAlign:'center'
                       }}>Catagory</p></div>


<div className='create' style={{
                        width:'250px',
                        height:'150px',
                        backgroundColor:'#fff',
                        padding:'20px',
                        cursor:'pointer',
                        margin:'10px'}}  onClick={()=>{navigate('/Create-New-Acount')}}>
                          <MdAccountCircle style={{
                            fontSize:'30px',
                            margin:'auto'
                          }}/>
                          <p  style={{
                          fontSize:'20px',
                          fontWeight:'bold',
                          marginTop:'30px',
                          textAlign:'center'
                       }}>Create Acount</p></div>



          <div className='ads' style={{
                        width:'250px',
                        height:'150px',
                        backgroundColor:'#fff',
                        padding:'20px',
                        cursor:'pointer',
                        margin:'10px'}}  onClick={()=>{navigate('/adds')}}>
                          <MdCampaign style={{
                            fontSize:'30px',
                            margin:'auto'
                          }}/>
                          <p style={{
                          fontSize:'20px',
                          fontWeight:'bold',
                          marginTop:'30px',
                          textAlign:'center'
                       }}>Ads</p></div>



                                          

        </div>
      </div>

      <div className='flex gap-10 flex-wrap justify-center'>
          
            <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780'>
              <div className='flex justify-between'>
                <p className='font-semibold text-xl'>Catagory Lists</p>
                <div className='flex items-center gap-4'>
                  <p className='flex items-center gap-2 text-gray-600 hover:drop-shadow-xl'>
                    <span> <GoPrimitiveDot/> </span>
                    <span>Catagory News</span>
                  </p>
                  <p className='flex items-center gap-2 text-green-400 hover:drop-shadow-xl'>
                    <span> <GoPrimitiveDot/> </span>
                    <span>News</span>
                  </p>
                </div>
              </div>
               {/*
              <div className='mt-10 flex gap-1 flex-wrap justify-center'>
                <div className='border-r-1 border-color m-4 pr-10'>
                  <div>
                    <p>
                      <span className='text-3xl font-semibold'>$93,438</span>
                      <span className='p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs'>
                        23%
                      </span>
                    </p>
                    <p className='text-gray-500 mt-1'>Budget</p>
                  </div>
                   <div className='mt-8'>
                    <p>
                      <span className='text-3xl font-semibold'>$43,438</span>
                    </p>
                    <p className='text-gray-500 mt-1'>Expense</p>
                  </div>

                  <div className='mt-5'>
                  <SparkLine 
                  currentColor={currentColor} 
                  id="line-sparkline" 
                  type="Line" 
                  height="80px"
                  width="250px" data={SparklineAreaData} color={currentColor}/>
                  </div>

                  <div className='mt-10'>
                    <Button color="white" bgColor={currentColor} text="Download Report" borderRadius="10px"/>
                  </div>

                </div>

                <div>
                  <Stacked width="320px" height="360px"/>
                </div>

              </div>
               */}
             {
              rowss?.map((item)=>{
                return(<div>
          
                {/*<Box  flexDirection='horizontal' sx={{width:{xs:'200px',md:'600px'}}}>
                  <Stack flexDirection='horizontal' sx={{
                    width:{xs:'200px'},
                    height:{xs:'100px'},
                    backgroundColor:'rgb(245, 248, 248)',
                   
                  
                  }}>
                <ListItem flexDirection='row'>    
                    
                   <ListItem x={{
                                                        // To align the items horizontally
                                                        flexDirection: { xs: 'column', md: 'horizontal' },  // Stack vertically on small screens, horizontally on medium and above
                                                        alignItems: 'center',  // Center vertically
                                                        justifyContent: { md: 'left' },  // Left-align on medium and above
                                                        margin: 'auto',
                                                 }}>

                      <img src='' alt=''/>
                      <Typography>{item.name}</Typography>
                    </ListItem> 
              </ListItem>      
                  </Stack> <br/><br/> 

                </Box>
              */}
           <ul  style={{
                   float:'left',
                   width:{xs:'200px'},
                    height:{xs:'100px'},
                    cursor:'pointer'
                   }} onClick={()=>{navigate(`/${item.name}`)}}>
              <li style={{
                 backgroundColor:'rgb(245, 248, 248)',
                 width:'150px',
                 height:'100px',
                 padding:'20px',
                 marginTop:'20px',
                 marginLeft:'20px',
                 textAlign:'center'
              }}>
              <ListItem x={{
                        // To align the items horizontally
                        backgroundColor:'rgb(245, 248, 248)',
                        width:{xs:'200px'},
                        height:{xs:'100px'},
                        padding:'20px',
                        flexDirection: { xs: 'column', md: 'horizontal' },  // Stack vertically on small screens, horizontally on medium and above
                        alignItems: 'center',  // Center vertically
                        justifyContent: { md: 'left' },  // Left-align on medium and above
                        margin: 'auto',
                                   }}>

                      <img src='' alt=''/>
                      <Typography sx={{
                         marginLeft:'-90px'
                      }}>{item.name}</Typography>
                    </ListItem> 
              </li>
           </ul>
            
            </div>)
              })
             }
            </div>
           
      </div>
    </div>
  )
}

export default ECommerce