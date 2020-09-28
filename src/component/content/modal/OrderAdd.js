import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import { SubprojectContext } from '../../../store/SubprojectProvider'
import axios from 'axios'
import $ from 'jquery'
function OrderAdd(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const { subproject, setSubproject } = useContext(SubprojectContext)

    const [subName, setSubName] = useState('')
    const [detail, setDetail] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [projectID, setProjectID] = useState('')
    const [status, setStatus] = useState(false)
    const [alertDetail, setAlertDetail] = useState([])

    const Alert = () => {
        let d
        if(alertDetail.status === 'success'){
            d = <div className="alert alert-success">
            <strong>{alertDetail.status}</strong> {alertDetail.detail}
          </div>
        }else{
            d = <div className="alert alert-danger">
            <strong>{alertDetail.status} !</strong> Please contact admin
          </div>
        }
        return d
    }

    const getData = async () => {
        let res = await axios.get(url + '/subproject', {
            params: {
                projectID: props.projectID
            }
        })

        setSubproject(res.data)
        console.log(res.data)
    }

    const onAdd = async (event) => {
        event.preventDefault()
        let res = await axios.post(url + '/subproject', {
            projectID: projectID,
            subName: subName,
            detail: detail,
            start: start,
            end: end
        })
        setAlertDetail(res.data)
        if (res.data.status === 'success') {
            setStatus(true)
            getData()
            console.log(res.data)
        }else{
            setStatus(true)
            console.log(res.data)
        }
    }
    useEffect(() => {
        setProjectID(props.projectID)
    }, [])

    return (
        <div className="modal fade" id="suborder">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <form onSubmit={onAdd}>
                        <div className="modal-header">
                            <h4 className="modal-title">Sub Project Order</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            {status ? <Alert/> : null}
                            <div className="form-group">
                                <label>Sub Project Order Name</label>
                                <input type="text" name="subprojectname" id="subprojectname" className="form-control" onChange={e => setSubName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Detail</label>
                                <textarea name="detail" id="detail" className="form-control" onChange={e => setDetail(e.target.value)}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Start Date</label>
                                <input type="date" name="subStart" id="subStart" className="form-control datepickerStartP" onChange={e => setStart(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input type="date" name="subEnd" id="subEnd" className="form-control datepickerEndP" onChange={e => setEnd(e.target.value)} />
                            </div>
                            <div className="text-center">
                                <button type="submit" id="btnSubjectCreate" className="btn btn-success" >Save</button>
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

export default OrderAdd;
