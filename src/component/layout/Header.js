import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
function Header() {
  const history = useHistory();
  const { login, setLogin } = useContext(LoginContext)
  const { user, setUser } = useContext(UserContext)
  const { url } = useContext(UrlContext)
  const getUserInfo = async (userID) => {
    let res = await axios.get(url + '/users', {
      params: {
        memberID: userID
      }
    })
    setUser(res.data[0])
  }
  const logout = () => {
    localStorage.clear()
    setLogin(false)
    let deluser = {
      fullname: '',
      username: '',
      rule: ''
    }
    setUser(deluser)
    history.push('/login')
  }

  const Logined = () => {
    return <li className="dropdown user user-menu">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown">

        <span className="hidden-xs">{user.fname} {user.lname}</span>
      </a>
      <ul className="dropdown-menu">
        <li className="user-header">
        </li>
        <li className="user-body">

        </li>
        <li className="user-footer">
          <div className="pull-left">
            <Link to="/profile" className="btn btn-default btn-flat">
              Profile
            </Link>
          </div>
          <div className="pull-right">
            <a href="#" className="btn btn-default btn-flat" onClick={logout} >Sign out</a>
          </div>
        </li>
      </ul>
    </li>
  }

  const NonLogin = () => {
    return <li>
      <Link to="/login"><i className="fa fa-sign-in"></i> Sign In</Link>
    </li>
  }

  useEffect(() => {
    getUserInfo(localStorage.userID)
  }, [url])

  return (
    <header className="main-header">
      <a className="logo">
        <span className="logo-mini"><b>SCI</b></span>
        <span className="logo-lg"><b>SCI</b></span>
      </a>
      <nav className="navbar navbar-static-top">
        <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
          <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            {login ? <Logined /> : <NonLogin />}
            <li>
              <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
