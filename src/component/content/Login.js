import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { LoginContext } from '../../store/LoginProvider'
import { UrlContext } from '../../store/UrlProvider'
import {UserContext} from '../../store/UserProvider'
function Template() {
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login,setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const onSubmit = async (event) => {
        event.preventDefault()
        let res = await axios.get(url+'/login',{
            params:{
                username:username,
                password:password
            }
        })

        let result = res.data[0]
      
        if(result == undefined){
            alert("username or password incorrect")
        }else{
            localStorage.userID = result.memberID
            setLogin(true)
            getuserInfo(result.memberID)
            history.push('/');
        }
    }

    const getuserInfo = async (memberID) => {
        let res = await axios.get(url+'/users',{
            params:{
                memberID:memberID
            }
        })
        console.log(res.data[0])
        setUser(res.data[0])
    }

    return (
        <div className="container-fluid">
            <div className="login-box">
                <form onSubmit={onSubmit}>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign In</p>
                    <div className="form-group has-feedback">
                        <input type="text" name="username" className="form-control" placeholder="User Name" onChange={e=>setUsername(e.target.value)} autoComplete="off"  />
                        <span className="glyphicon glyphicon-user form-control-feedback"></span>
                    </div>
                    <div className="form-group has-feedback">
                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={e=>setPassword(e.target.value)} autoComplete="off"  />
                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <button type="submit" className="btn btn-primary btn-block btn-flat" >Sign In</button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Template;
