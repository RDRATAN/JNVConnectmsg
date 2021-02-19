import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions';
import '../../containers/HomePage/index';
/**
* @author
* @function Header
**/
const hideShow=()=>
{
  document.getElementById('UserList').style.display='block';
  document.getElementById('chatArea').style.display='none';

}
const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // const logout = () => {
  //   dispatch(logout())
  // }

  return(
    <header className="header">
        <div style={{display: 'flex'}}>
          <div className="logo">{ auth.authenticated ? <img onClick={()=>hideShow()} height={"40px"} width={'40px'} src={'https://static.thenounproject.com/png/780090-200.png'}></img>:null}</div>
            
            {
              !auth.authenticated ? 
              <ul className="leftMenu">
                <li><NavLink to={'/login'}>Login</NavLink></li>
                <li><NavLink to={'/signup'}>Sign up</NavLink></li>
              </ul> : null
            }
              

            
        </div>
          <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>
            {auth.authenticated ? `Hi ${auth.firstName} ${auth.lastName}` : ''}
          </div>
        <ul className="menu">

            {
              auth.authenticated ?
              <li>
                <Link to={'#'} onClick={() => {
                  dispatch(logout(auth.uid))
                }}>Checkout</Link>
            </li> : null
            }
          
            
             
        </ul>
    </header>
   )

 }

export default Header