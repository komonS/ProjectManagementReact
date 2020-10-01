import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'

function ProfileDetail() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const [username, setUsername] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')

    const getProfile = async () => {
        let res = await axios.get(url+'/member',{
            params:{
                memberID:localStorage.userID
            }
        })
        setUser(res.data[0])
        setFname(res.data[0].fname)
        setLname(res.data[0].lname)
        setEmail(res.data[0].email)
        setUsername(res.data[0].username)
    }

    const onSave = async (event) => {
        event.preventDefault()
        let res = await axios.put(url+'/member/'+localStorage.userID,{
            fname:fname,
            lname:lname,
            email:email
        })

        if(res.data.status == 'success'){
            getProfile()
            alert(res.data.status + '! '+res.data.detail)
        }else{
            alert(res.data.status + '! '+'please contact to admin')
        }
    }

    useEffect(() => {
        getProfile()
    }, [])
    return (
        <div>
            <form onSubmit={onSave}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" defaultValue={fname} onChange={e => setFname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" defaultValue={lname} onChange={e => setLname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" className="form-control" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success">Save</button>
                </div>
            </form>

        </div>
    );
}

export default ProfileDetail;
