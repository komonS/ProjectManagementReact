import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'
import { TeamContext } from '../../../store/TeamProvider'

function TeamAdd(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const [friend, setFriend] = useState([])
    const [statusData, setStatusData] = useState([])
    const [userGroup, setUserGroup] = useState('')
    const [status, setStatus] = useState('')

    const { team , setTeam } = useContext(TeamContext)

    const getTeam = async () => {
        let res = await axios.get(url + '/project/member', {
            params:{
                projectID: props.projectID
            }
        })
        setTeam(res.data)
    }

    const getFriend = async() => {
        let res= await axios.get(url+'/friend',{
            params:{
                memberID:localStorage.userID
            }
        })
        setFriend(res.data)
    }

    const getStatus = async() => {
        let res= await axios.get(url+'/group/status',{
            params:{
                memberID:localStorage.userID
            }
        })
        setStatusData(res.data)
    }

    const onAdd = async(e) => {
        e.preventDefault()
        let res = await axios.post(url+'/group/project',{
            projectID:props.projectID,
            memberID:userGroup,
            status:status
        })

        res = await axios.post(url+'/project/detail',{
            projectID:props.projectID,
            memberID:userGroup,
            userStatus:status,
            comment:''
        })

        if(res.data.status == 'success'){
            getTeam()
        }
    }

    useEffect(() => {
        getFriend()
        getStatus()
    }, [])
    return (
        <div className="modal fade" id="team">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Team</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onAdd}>
                            <div className="form-group">
                                <label>User</label>
                                <select name="userID" id="userID" className="form-control" onChange={e => setUserGroup(e.target.value)}>
                                    <option value=""> -- SELECT -- </option>
                                    {friend.map((item,index)=>(
                                        <option key={index} value={item.memberID}>{item.fname} {item.lname}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" id="status" className="form-control" onChange={e => setStatus(e.target.value)}>
                                    <option value=""> -- SELECT -- </option>
                                    {statusData.map((item,index)=>(
                                        <option key={index} value={item.memberStatusID }>{item.memberStatusName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" id="btnaddteam" className="btn btn-success">Add</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>


    );
}

export default TeamAdd;
