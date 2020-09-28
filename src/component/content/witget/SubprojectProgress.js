import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import { SubprojectContext } from '../../../store/SubprojectProvider'
import axios from 'axios'

function SubprojectProgress(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const { subproject, setSubproject } = useContext(SubprojectContext)

    const getData = async () => {
        let res = await axios.get(url + '/subproject', {
            params: {
                projectID: props.projectID
            }
        })

        setSubproject(res.data)
        console.log(res.data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            {subproject.map((item, index) => (
                <div className='col-md-6 col-sm-6 col-xs-12' key={index}>
                    <div className='info-box bg-navy'>
                        <span className="info-box-icon"><i className="fa fa-bookmark-o"></i></span>
                        <div className='info-box-content'>
                            <span className='info-box-text'>{item.subProjectName}</span>
                            <div className='progress'>
                                <div className='progress-bar'></div>
                            </div>
                            {item.subStart} - {item.subEnd}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default SubprojectProgress;
