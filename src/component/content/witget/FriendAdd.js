import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'
import '../../css/Friend.css'
import { FriendContext } from '../../../store/FriendProvider'
function FriendAdd() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const { friend, setFriend } = useContext(FriendContext)

    const [friendData, setFriendData] = useState('')

    const getData = async () => {
        let res = await axios.get(url + '/friend', {
            params: {
                memberID: localStorage.userID
            }
        })
        setFriend(res.data)
    }

    const addFirend = async () => {
        let res = await axios.get(url + '/member', {
            params: {
                email: friendData
            }

        })
        console.log(res.data)
        
        if (res.data > 0) {
            let fID = res.data[0].memberID
            res = await axios.post(url + '/friend', {
                memberID:localStorage.userID,
                friendID: fID
            })
            console.log(res.data)
            if(res.data.status === 'error'){
                alert('can not add this friend')
            }else{
                getData()
                setFriendData('')
            }
        }else{
            alert('this email not in the system')
        }
    }


    return (
        <div>
            <div className="input-group">
                <div className="input-group-addon">
                    <i className="fa fa-envelope-o"></i>
                </div>
                <input type="text" className="form-control friend-input" value={friendData} onChange={e => setFriendData(e.target.value)} />
                <div className="input-group-addon">
                    <button className="btn btn-primary btn-sm" onClick={addFirend}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default FriendAdd;
