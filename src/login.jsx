import './pages/style/login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authAxois from './requestHandler';
//import {ToastContainer,toast} from 'react-toastify'

const Login=()=>{
     const navigate=useNavigate();
     const [name,setName]=useState();
     const [password,setPassword]=useState();

    return(<div>
           <div class="wrapper">
        
  <div class="container">
    <div class="col-left">
      <div class="login-text">
        <h2>Admin Panel</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget eros dapibus, ultricies tellus vitae, consectetur tortor. Etiam rutrum placerat
        </p>
        <a class="btn" href="">Read More</a>
      </div>
    </div>
    <div class="col-right">
      <div class="login-form">
        <h2>Login</h2>
        <div className='form'>
          <p>
            <input type="text" placeholder="Username" required value={name} onChange={(e)=>{setName(e.target.value)}}/>
          </p>
          <p>
            <input type="password" placeholder="Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </p>
          <p>
            <input class="btn" type="submit" value="Sing In"  onClick={()=>{
              const info={
                 phone:name,
                 password:password
              }
              authAxois.post('/admin/login',info).then((res)=>{
                  console.log(res)
                  if(res.status===200){
                     navigate('/home')
                  }else{
                    alert('Wrong User name Password Combination....')
                  }
                  
              }).catch((e)=>{
                 console.log(e)
              })
                 console.log(`name of the users is ${name} and the password is ${password}`)
                
             }}/>
          </p>
          <p>
           
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="credit">
    Designed by <a href="#">Blue Betting</a>
  </div>
</div>          
 
    </div>)
}


export default Login;