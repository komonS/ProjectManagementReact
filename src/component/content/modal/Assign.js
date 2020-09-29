import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import { SubprojectContext } from '../../../store/SubprojectProvider'
import axios from 'axios'
import { TeamContext } from '../../../store/TeamProvider'
import { OrderContext } from '../../../store/OrderProvider'

function Assign(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const { team , setTeam } = useContext(TeamContext)
    const { order , setOrder } = useContext(OrderContext)

    const [orderData, setOrderData] = useState('')
    const [detail, setDetail] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [status, setStatus] = useState(false)
    const [alertDetail, setAlertDetail] = useState([])
    const [subID, setSubID] = useState('')
    const [username, setUserName] = useState('')
    const [priority, setPriority] = useState('')
    const [priorityData, setPriorityData] = useState([])

    const getData = async () => {
        let res = await axios.get(url + '/priority')
        setPriorityData(res.data)
    }

    const Alert = () => {
        let d
        if (alertDetail.status === 'success') {
            d = <div className="alert alert-success">
                <strong>{alertDetail.status}</strong> {alertDetail.detail}
            </div>
        } else {
            d = <div className="alert alert-danger">
                <strong>{alertDetail.status} !</strong> Please contact admin
          </div>
        }
        return d
    }

    const getOrder = async () => {
        let res = await axios.get(url+'/order',{
            params:{
                subID:subID
            }
        })
        setOrder(res.data)
    }


    const onAdd = async (event) => {
        event.preventDefault()
        
        let res = await axios.post(url+'/order',{
            order:orderData,
            subID:subID,
            memberID:username,
            statusID:'1',
            start:start,
            end:end,
            comment:detail,
            priority:priority,
            requester:''
        })


        setAlertDetail(res.data)
        if (res.data.status === 'success') {
            setStatus(true)
            getOrder()
            console.log(res.data)
        } else {
            setStatus(true)
            console.log(res.data)
        }
    }
    useEffect(() => {
        setSubID(props.subID)
        getData()
    }, [])

    return (
        <div className="modal fade" id="order">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <form onSubmit={onAdd}>
                        <div className="modal-header">
                            <h4 className="modal-title">Assign Order</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            {status ? <Alert /> : null}
                            <div className="form-group">
                                <label>Order Name</label>
                                <input type="text" name="subprojectname" id="subprojectname" className="form-control" onChange={e => setOrderData(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>User</label>
                                <select className="form-control" onChange={e=>setUserName(e.target.value)}>
                                    <option value=""> -- SELECT -- </option>
                                    {team.map((item,index) => (
                                        <option key={index} value={item.memberID}> {item.fname} {item.lname} </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Start Date</label>
                                <input type="date" name="subStart" id="subStart" className="form-control " onChange={e => setStart(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input type="date" name="subEnd" id="subEnd" className="form-control " onChange={e => setEnd(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Priority</label>
                                <select className="form-control" onChange={e=> setPriority(e.target.value)}>
                                    <option value=""> -- SELECT -- </option>
                                    {priorityData.map((item,index)=>(
                                        <option key={index} value={item.priorityID}> {item.priorityName} </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Comment</label>
                                <textarea className="form-control" onChange={e=> setDetail(e.target.value)}></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success" >Save</button>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Assign;
