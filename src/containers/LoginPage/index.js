import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { signin, isLoggedInUser, signup } from '../../actions';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // useEffect(() => {
  //   if(!auth.authenticated){
  //     dispatch(isLoggedInUser())
  //   }
  // }, []);




  const userLogin = (e) => {
    e.preventDefault();

    // if(email == ""){
    //   alert("Email is required");
    //   return;
    // }
    // if(password == ""){
    //   alert("Password is required");
    //   return;
    // }
//{ email, password }
    dispatch(signup());
    




  }


  if(auth.authenticated){
    return <Redirect to={`/`} />
  }



  return(
  
      <div className="loginContainer" style={{width:'100%'}}>
       
          <form onSubmit={userLogin}>
            
            {/* <input 
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            /> */}

            {/* <input 
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
 */} <center> 
            <b>Note:</b>Chat feature is in beta Phase,<br/>please authanticate yourself <br/>with same google account 
           
            <button style={{width:'70%',height:'50px',marginTop:'40%'}} >Login</button></center>
       

          </form>
         
        
      </div>
  
   )

 }

export default LoginPage