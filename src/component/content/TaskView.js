import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'

function TaskView() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

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
    const [subID, setSubID] = useState('')
    const { id } = useParams();
    const getData = async () => {
        let res = await axios.get(url + '/status')
        setStatusData(res.data)

        res = await axios.get(url + '/priority')
        setPriorityData(res.data)
    }

    const getTask = async () => {
        let res = await axios.get(url + "/task/view", {
            params: {
                id: id
            }
        })
        setSubject(res.data[0].subProjectName)
        setDiscript(res.data[0].subProjectDescript)
        setOrder(res.data[0].subProjectDetailName)
        setStart(res.data[0].subProjectStart)
        setEnd(res.data[0].subProjectEnd)
        setSuccess(res.data[0].subProjectSuccess)
        setPriority(res.data[0].priorityID)
        setStatus(res.data[0].project_status_ID)
        setComment(res.data[0].subProjectComment)
        setSubID(res.data[0].subProjectID)
    }

    const onSave = async (event) => {
        event.preventDefault()
        let res = await axios.put(url + '/task/' + id + '/' + subID, {
            subject: subject,
            descript: discript,
            status: status,
            start: start,
            end: end,
            success: success,
            comment: comment,
            priority: priority,
            order: order
        })

        alert(res.data.status + '! ' + res.data.detail)
    }

    useEffect(() => {
        getData()
        getTask()
    }, [])

    return (
        <div>
            <div>
                <form onSubmit={onSave}>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" name="subject" defaultValue={subject} className="form-control" onChange={e => setSubject(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Discription</label>
                        <textarea name="destcript" className="form-control" rows="15" defaultValue={discript} onChange={e => setDiscript(e.target.value)} ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Order Name</label>
                        <input type="text" name="osubject" className="form-control" defaultValue={order} onChange={e => setOrder(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" name="date_from" className="form-control" defaultValue={start} onChange={e => setStart(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <input type="date" name="date_end" className="form-control" defaultValue={end} onChange={e => setEnd(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Completed Date</label>
                        <input type="date" name="date_success" className="form-control" defaultValue={success} onChange={e => setSuccess(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Priority</label>
                        <select name="priority" value={priority} className="form-control" onChange={e => setPriority(e.target.value)}>
                            <option value=""> -- SELECT -- </option>
                            {priorityData.map((item, index) => (
                                <option key={index} value={item.priorityID}>{item.priorityName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={status} className="form-control" onChange={e => setStatus(e.target.value)}>
                            <option value=""> -- SELECT -- </option>
                            {statusData.map((item, index) => (
                                <option key={index} value={item.project_status_ID} >{item.project_status_Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea name="comment" className="form-control" rows="10" defaultValue={comment} onChange={e => setComment(e.target.value)} ></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success"  >Save</button>
                        <button type="button" data-target="#addfile" data-toggle="modal" className="btn btn-success">Addfile</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskView;
