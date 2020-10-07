import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'

function ProjectAdd() {
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

    const onAdd = async (event) => {
        event.preventDefault()

        let res = await axios.post(url+'/project',{
            projectname:projectName,
            detail:descript,
            start:start,
            end:end,
            priorityID:priority,
            statusID:status,
            typeID:'2'
            
        })

        if(res.data.status === 'success'){
            //alert(res.data.detail)
            onAddDetail(res.data.projectID)
            //history.push('/project/manage/'+res.data.projectID);
        }else{
            alert(res.data.status + '! can\'t create project plase create again or contact to admin')
        }
    }

    const onAddDetail = async (projectID) => {
        let res = await axios.post(url+'/project/detail',{
            memberID:localStorage.userID,
            userStatus:'1',
            comment:comment,
            projectID:projectID
        })
        
        console.log(res.data)
        if(res.data.status === 'success'){
            alert(res.data.detail)
            history.push('/project/manage/'+res.data.projectID);
        }else{
            alert(res.data.status + '! can\'t create project detail plase create again or contact to admin')
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <form onSubmit={onAdd}>
            <div className="form-group">
                <label>Project Name</label>
                <input type="text" name="projectname" className="form-control" onChange={e => setProjectName(e.target.value)}  required />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea name="projectdescript" className="form-control" rows="15" onChange={e => setDescript(e.target.value)} ></textarea>
            </div>

            <div className="form-group">
                <label>Project Start Date</label>
                <input type="date" name="projectstart" className="form-control " onChange={e => setStart(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Project End Date</label>
                <input type="date" name="projectend" className="form-control " onChange={e => setEnd(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Priority</label>
                <select name="priority"  className="form-control" onChange={e => setPriority(e.target.value)}>
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
                <textarea className="form-control" rows="15" onChange={e => setComment(e.target.value)}></textarea>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-success">Create</button>
            </div>
            </form>
        </div>
    );
}

export default ProjectAdd;
