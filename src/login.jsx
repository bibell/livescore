import React from "react"
import './pages/style/login.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import authAxois from "./requestHandler"
//import { toast,ToastContainer } from "react-toastify"
import { CircularProgress } from "@mui/material"
import { toast,ToastContainer } from "react-toastify"

const Login=()=>{

  const navigate=useNavigate();
 const [name,setName]=useState();
 const [password,setPassword]=useState();
 const [progress,setProgress]=useState('none');
 const [phone,setPhone]=useState();


     return(<div>

<main class="main">
	<ToastContainer />
	<div class="container">
		<section class="wrapper">
			<div class="heading">
				<h1 class="text text-large">Sign In</h1>
				<p class="text text-normal">Admin Panel <span><a href="#" class="text text-links">@Login Panel</a></span>
				</p>
			</div>
			<div name="signin" class="form">
				<div class="input-control">
					<label for="email" class="input-label" hidden>Phone Number</label>
					<input type="email" name="email" id="email" class="input-field" placeholder="Phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
				</div>
				<div class="input-control">
					<label for="password" class="input-label" hidden>Password</label>
					<input type="password" name="password" id="password" class="input-field" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
				</div>

				<div class="input-control">
				   <button className="loginbtn" onClick={()=>{
				////////////////////////////////////
				//navigate('/user/home')
				setProgress('block')
               // document.querySelector('.loginbtn').innerHTML=''
				 const info={
					phone:phone,
					password:password
				 }
			if(info.phone && info.password){	
				     if(info.phone==='0900766703'){ 
				 authAxois.post('/admin/login',info).then((res)=>{
                        console.log(res.data);
						if(info.phone===res.data.r[0].phone && info.password===res.data.r[0].password){
							sessionStorage.setItem('adminuser',1)
							sessionStorage.setItem('adminemployee',1)
						   
                           //// set every element privilege true
						   //console.log(res.data.data[0])
						  /* 
							sessionStorage.setItem('id',1)
							sessionStorage.setItem('news',1)
							sessionStorage.setItem('heighlight',1)
							sessionStorage.setItem('block',1)
							sessionStorage.setItem('create',1)
							sessionStorage.setItem('see',1)
							sessionStorage.setItem('ads',1)
                            */ 

							sessionStorage.setItem('id',1)
							sessionStorage.setItem('news',1)
							sessionStorage.setItem('heighlight',1)
							sessionStorage.setItem('block',1)
							sessionStorage.setItem('create',1)
							sessionStorage.setItem('see',1)
							sessionStorage.setItem('Live-Match',1)
							sessionStorage.setItem('Live-Challenge',1)
							sessionStorage.setItem('Dynamic-Heighlight',1)
							sessionStorage.setItem('ads',1)




                            //navigate('/home')
                            window.location='./#/home'
							sessionStorage.setItem('userid','b068931cc450442b63f5b3d276ea4297')
							sessionStorage.setItem('phone',info.phone)
						}else{
							toast.error('Incorrect Credential....')
                             alert('Incorrect Credential')
						}

				 }).catch((e)=>{
					 console.log('error has been ocured......')
					 toast.error('Wrong Credentials')
					 console.log(e)
					   setProgress('none')
                       document.querySelector('.loginbtn').innerHTML='LogIn'
				 })
				       
				     }else{
						console.log(info)
						sessionStorage.setItem('phone',info.phone)
						 authAxois.post('/admin/users/login',info).then((res)=>{
							console.log('response is comming from the server side.....')
							console.log(res.data.data[0])
					  if(res.status===200){		  
							console.log(res.data)
							//sessionStorage.setItem('id',res.data[0].privilege_id)
							sessionStorage.setItem('news',res.data.data[0].post_news)
							sessionStorage.setItem('heighlight',res.data.data[0].post_heighlight)
							sessionStorage.setItem('block',res.data.data[0].block_user)
							sessionStorage.setItem('create',res.data.data[0].create_user)
							sessionStorage.setItem('see',res.data.data[0].see_user)
							sessionStorage.setItem('Live-Match',res.data.data[0].live_match)
							sessionStorage.setItem('Live-Challenge',res.data.data[0].live_challenge)
							sessionStorage.setItem('Dynamic-Heighlight',res.data.data[0].dynamic_heighlight)
							sessionStorage.setItem('ads',res.data.data[0].create_ads)
							sessionStorage.setItem('catagory',res.data.data[0].create_catagory)
							navigate('/home')
					   }	
						 }).catch((e)=>{
							  console.log(e)
							  console.log('error during privilege')
							  toast.error('wrong phone, password combination')
						 })
					 }

			}else{
				toast.error('All Field Is Requierd...')
			   // document.querySelector('.circule').style.display='block'
                //document.querySelector('.loginbtn').innerHTML='Login'
                toast.error('All field is requierd')
			} 
				   }} style={{
					width:"400px",
					backgroundColor:'#204060',
					color:'#fff',
					padding:'10px'
				   }}><CircularProgress sx={{
					 display:progress,
					 width:"10px",
					 height:'10px',
           marginLeft:'150px',
           position:'absolute'
				   }}/>Login</button>
				</div>
			</div>
			
		</section>
	</div>
</main>

        
     </div>)
}
        
       
export default Login;