import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'

function SubprojectDetail(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const [projectName, setProjectName] = useState('')
    const [sub, setSub] = useState([])
    const [subName, setSubName] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [detail, setDetail] = useState('')
    const [success, setSuccess] = useState('')

    const getData = async () => {
        let res = await axios.get(url+'/subproject',{
            params:{
                subID:props.subID
            }
        })
        setSub(res.data)
        setProjectName(res.data[0].projectName)
        setSubName(res.data[0].subProjectName)
        setDetail(res.data[0].subProjectDescript)
        setStart(res.data[0].subStart)
        setEnd(res.data[0].subEnd)
        setSuccess(res.data[0].subSuccess)
    }

    const onSave = async (event) => {
        event.preventDefault()
        let res = await axios.put(url+'/subproject/'+props.subID,{
            subName:subName,
            detail:detail,
            start:start,
            end:end,
            success:success
        })

        if(res.data.status === 'success'){
            alert(res.data.status +'! '+res.data.detail)
        }else{
            alert(res.data.status + '! please update again or contact to admin')
            console.log(res.data)
        }
    }


    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <form onSubmit={onSave}>
                <div className="form-group">
                    <label>Project Name</label>
                    <input type="text" className="form-control" readOnly={true} defaultValue={projectName} />
                </div>
                <div className="form-group">
                    <label>Subproject Name</label>
                    <input type="text" className="form-control"  defaultValue={subName} onChange={e => setSubName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Detail</label>
                    <textarea  className="form-control" rows="10"  defaultValue={detail} onChange={e => setDetail(e.target.value)} ></textarea>
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" className="form-control"  defaultValue={start} onChange={e => setStart(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Start End</label>
                    <input type="date" className="form-control"  defaultValue={end} onChange={e => setEnd(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Completed Date</label>
                    <input type="date" className="form-control"  defaultValue={success} onChange={e => setSuccess(e.target.value)} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-sm">Save</button>
                </div>
            </form>

        </div>
    );
}

export default SubprojectDetail;
