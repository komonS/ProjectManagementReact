import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { LoginContext } from '../../store/LoginProvider'
import { UrlContext } from '../../store/UrlProvider'
import { UserContext } from '../../store/UserProvider'
function Register() {
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [lname, setLname] = useState('')
    const [fname, setFname] = useState('')
    const [email, setEmail] = useState('')

    const [check, setCheck] = useState(false)
    const [lengthCheck, setLengthCheck] = useState(false)

    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const onSubmit = async (event) => {
        event.preventDefault()
        let res = await axios.post(url + '/users/register', {
            username: username,
            password: password,
            fname: fname,
            lname: lname,
            email: email
        })

        let result = res.data

        if (result.status === 'success') {
            /*
            localStorage.userID = result.memberID
            setLogin(true)
            getuserInfo(result.memberID)
            */
            history.push('/login');
        } else {
            alert(result.status+ "! Plase register again or contact to admin")
        }
    }

    const checkUsername = async (data) => {
        if(data.length >= 4){
            setLengthCheck(false)
            let res = await axios.get(url+'/member',{
                params:{
                    username:data
                }
            })
            console.log(res.data)
            if(res.data.length > 0){
                setCheck(true)
            }else{
                setCheck(false)
                setUsername(data)
            }
        }else{
            setLengthCheck(true)
            console.log('username need 8 char')
        }
    }

    const Alert = () => {
        return <div>
            <small className="text-danger">This username is not available.</small>
        </div>
    }
    const Alert2 = () => {
        return <div>
            <small className="text-danger">username need 8 char.</small>
        </div>
    }

    const getuserInfo = async (memberID) => {
        let res = await axios.get(url + '/users', {
            params: {
                memberID: memberID
            }
        })
        console.log(res.data)
        setUser(res.data)
    }

    return (
        <div className="container-fluid">
            <div className="login-box">
                <form onSubmit={onSubmit}>
                    <div className="login-box-body">
                        <p className="login-box-msg">Sign Up</p>
                        <div className="form-group has-feedback">
                            <input type="text" name="username" className="form-control" placeholder="User Name" onChange={e => checkUsername(e.target.value)} autoComplete="off" />
                            <span className="glyphicon glyphicon-user form-control-feedback"></span>
                        </div>
                        <div>
                            {check ? <Alert/> : null}
                            {lengthCheck ? <Alert2/> : null}
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" name="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} autoComplete="off" />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="text" name="fname" className="form-control" placeholder="First Name" onChange={e => setFname(e.target.value)} autoComplete="off" />
                            <span className="glyphicon glyphicon-user form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="text" name="lname" className="form-control" placeholder="Last Name" onChange={e => setLname(e.target.value)} autoComplete="off" />
                            <span className="glyphicon glyphicon-user form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="email" name="email" className="form-control" placeholder="exam@exam.com" onChange={e => setEmail(e.target.value)} autoComplete="off" />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <button type="submit" className="btn btn-primary btn-block btn-flat" >Sign Up</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
