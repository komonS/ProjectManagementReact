import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'

function GroupProject() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const [group, setGroup] = useState([])

    const [projectUser, setProjectUser] = useState([])

    const [projectName, setProjectName] = useState('')

    const getData = async () => {
        let res = await axios.get(url + '/group/project', {
            params: {
                memberID: localStorage.userID
            }
        })
        setGroup(res.data)
    }

    const getProjectuser = async (projectID) => {
        let res = await axios.get(url+'/group/project',{
            params:{
                projectID:projectID
            }
        })
        console.log(res.data)
        setProjectUser(res.data)
        setProjectName(res.data[0].projectName)
    }

    useEffect(() => {
        getData()

    }, [])
    return (
        <div className="row">
            <h3 className="text-center">Projects where you are a member</h3>
            <div className="col-md-8">
            {group.map((item, index) => (
                <div className="card col-md-4 project-list btn btn-info" key={index} onClick={()=>getProjectuser(item.projectID)}>
                    <div className="card-body">
                        <b>{item.projectName}</b>
                        <br/>
                        {item.memberStatusName}
                    </div>
                </div>
            ))}
            </div>
            <div className="col-md-4">
                <table>
                    <thead>
                        <tr>
                            <th>
                                User in a project {projectName}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectUser.map((item,index)=>(
                            <tr key={index}>
                                <td>
                                    {item.fname} {item.lname} ({item.email}) : {item.memberStatusName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

export default GroupProject;
