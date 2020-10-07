import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import { FriendContext } from '../../../store/FriendProvider'
import axios from 'axios'

function GroupUser() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const { friend, setFriend } = useContext(FriendContext)

    const getData = async () => {
        let res = await axios.get(url + '/friend', {
            params: {
                memberID: localStorage.userID
            }
        })
        setFriend(res.data)
    }

    const onDel = async(fID) => {
        let res = await axios.delete(url+'/friend',{
            params:{
                fID:fID
            }
        })

        if(res.data.status === 'success'){
            getData()
        }else{
            alert(res.data.status + '! Please contact to admin')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div>
                <div className="text-center">
                    <h4>User List</h4>
                </div>
                <div className="friend-list">
                    {friend.map((item, index) => (
                        <div className="friend-list-item" key={index}>
                            <div>
                                {item.fname} {item.lname} ({item.email}
                                <button className="btn btn-danger btn-sm friend-list-btn" onClick={()=>onDel(item.fID)}>Delete</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div >
    );
}

export default GroupUser;
