import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'

function Template(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const [project, setProject] = useState([])
    const [projectName, setProjectName] = useState('')
    const [descript, setDescript] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')
    const [comment, setComment] = useState('')

   

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
        setPriority(res.data[0].priorityName)
        setStatus(res.data[0].project_status_Name)
        setComment(res.data[0].projectComment)
        
    }


    useEffect(() => {
        getProject()
    }, [])

    return (
        <div>
            <div className="form-group">
                <label>Project Name</label>
                <input type="text" className="form-control" readOnly={true} defaultValue={projectName} />
            </div>
            <div>
                <label>Description</label>
                <textarea className="form-control" rows="5" readOnly={true} defaultValue={descript}></textarea>
            </div>
            <div className="form-group">
                <label>Start Date</label>
                <input type="date" className="form-control" readOnly={true} defaultValue={start} />
            </div>
            <div className="form-group">
                <label>End Date</label>
                <input type="text" className="form-control" readOnly={true} defaultValue={end} />
            </div>
            <div className="form-group">
                <label>Priority</label>
                <input type="text" className="form-control" readOnly={true} defaultValue={priority} />
            </div>
            <div className="form-group">
                <label>Status</label>
                <input type="text" className="form-control" readOnly={true} defaultValue={status} />
            </div>
            <div>
                <label>Comment</label>
                <textarea className="form-control" rows="5" readOnly={true} defaultValue={comment}></textarea>
            </div>
        </div>
    );
}

export default Template;
