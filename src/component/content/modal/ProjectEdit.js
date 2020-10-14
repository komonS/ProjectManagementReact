import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'

export default function ProjectEdit(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const history = useHistory();


    const [projectName, setProjectName] = useState('')
    const [descript, setDescript] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')
    const [comment, setComment] = useState('')
    const [priorityData, setPriorityData] = useState([])
    const [statusData, setStatusData] = useState([])

    const getData = async () => {
        let res = await axios.get(url + '/status')
        setStatusData(res.data)

        res = await axios.get(url + '/priority')
        setPriorityData(res.data)
    }

    const getProject = async () => {
        let res = await axios.get(url + '/project', {
            params: {
                memberID: localStorage.userID,
                projectID: props.projectID
            }
        })

        setProjectName(res.data[0].projectName)
        setDescript(res.data[0].descript)
        setStart(res.data[0].projectStart)
        setEnd(res.data[0].projectEnd)
        setPriority(res.data[0].priorityID)
        setStatus(res.data[0].project_status_ID )
        setComment(res.data[0].projectComment)

    }

    const onSave = async (event) => {
        event.preventDefault()

        let res = await axios.put(url + '/project', {
            projectname: projectName,
            detail: descript,
            start: start,
            end: end,
            priorityID: priority,
            statusID: status,
            projectID: props.projectID

        })

        if (res.data.status === 'success') {
            
        } else {
            
        }
    }

    useEffect(() => {
        getData()
        getProject()
    }, [])
    return (
        <div className="modal fade" id="project-edit">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Project</h4>
                        <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body">
                        <form onSubmit={onSave}>
                            <div className="form-group">
                                <label>Project Name</label>
                                <input type="text" className="form-control" defaultValue={projectName} />
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea className="form-control" rows="5" defaultValue={descript}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Start Date</label>
                                <input type="date" className="form-control" defaultValue={start} />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input type="text" className="form-control" defaultValue={end} />
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
                            <div>
                                <label>Comment</label>
                                <textarea className="form-control" rows="5" defaultValue={comment}></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                        </form>
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
