import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import { SubprojectContext } from '../../../store/SubprojectProvider'
import axios from 'axios'

function Subproject(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    
    const [id, setId] = useState('')
    
    const { subproject, setSubproject } = useContext(SubprojectContext)

    const getData = async () => {
        let res = await axios.get(url + '/subproject', {
            params: {
                projectID: props.projectID
            }
        })

        setSubproject(res.data)
    }

    const onDel = async (id) => {
        let res = await axios.delete(url+'/subproject/'+id)
        if(res.data.status == 'success'){
            getData()
        }
    }

    useEffect(() => {
        getData()
        setId(props.projectID)
    }, [])

    return (
        <div>
            {subproject.map((item, index) => (
                <div className='col-md-6 col-sm-6 col-xs-12' key={index}>
                    <div className='info-box bg-aqua'>
                        <span className="info-box-icon"><i className="fa fa-bookmark-o"></i></span>
                        <div className='info-box-content'>
                            <span className='info-box-text'>{item.subProjectName}</span>
                            <div className='progress'>
                                <div className='progress-bar'></div>
                            </div>
                            <span className='progress-description'>
                                {item.subProjectDescript}
                            </span>

                            <button className='btn btn-danger btn-sm pull-lift' onClick={()=> onDel(item.subProjectID)}>Delete</button>

                            <Link to={'/subproject/manage/'+id+'/' + item.subProjectID}>
                                <button className='btn btn-warning btn-sm pull-right'>Manage</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))
            }

        </div >
    );
}

export default Subproject;
