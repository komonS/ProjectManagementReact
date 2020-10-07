import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'

function TaskAdd() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const history = useHistory();

    const [subject, setSubject] = useState('')
    const [discript, setDiscript] = useState('')
    const [order, setOrder] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [success, setSuccess] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')
    const [comment, setComment] = useState('')
    const [statusData, setStatusData] = useState([])
    const [priorityData, setPriorityData] = useState([])

    const getData = async () => {
        let res = await axios.get(url + '/status')
        setStatusData(res.data)

        res = await axios.get(url + '/priority')
        setPriorityData(res.data)
    }
    const onAdd = async (event) => {
        event.preventDefault()
        let res = await axios.post(url + "/task", {
            name: subject,
            descript: discript,
            memberID: localStorage.userID,
            status: status,
            start: start,
            end: end,
            success: success,
            comment: comment,
            priority: priority
        })
        console.log(res.data)
        if (res.data.status == 'success') {
            alert('add task is complated')
            history.push('/task/view/'+res.data.taskID);
        } else {
            alert(res.data.status + '! ' + res.data.detail)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <form onSubmit={onAdd}>
                <div>
                    <h3 className="text-center">Personal Task</h3>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" name="subject" className="form-control" onChange={e => setSubject(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Discription</label>
                        <textarea name="destcript" className="form-control" rows="15" onChange={e => setDiscript(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" name="date_from" className="form-control" onChange={e => setStart(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <input type="date" name="date_end" className="form-control " onChange={e => setEnd(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Success Date</label>
                        <input type="date" name="date_success" className="form-control" onChange={e => setSuccess(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Priority</label>
                        <select name="priority" className="form-control" onChange={e => setPriority(e.target.value)}>
                            <option value=""> -- SELECT -- </option>
                            {priorityData.map((item, index) => (
                                <option key={index} value={item.priorityID}>{item.priorityName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" className="form-control" onChange={e => setStatus(e.target.value)}>
                            <option value=""> -- SELECT -- </option>
                            {statusData.map((item, index) => (
                                <option key={index} value={item.project_status_ID} >{item.project_status_Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea name="comment" className="form-control" rows="15" onChange={e => setComment(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label>File</label>
                        <input type="file" name="userfile" className="form-control" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default TaskAdd;
