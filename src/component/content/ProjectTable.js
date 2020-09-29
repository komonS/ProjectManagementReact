import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'

function ProjectTable() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const {id} = useParams()

    const [project, setProject] = useState([])

    const getData = async () => {
        let res = await axios.get(url+"/project/table",{
            params:{
                memberID:localStorage.userID,
                status:id
            }
        })
        setProject(res.data)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <h3>Project</h3>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Success Date</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {project.map((item,index)=>(
                            <tr key={index}>
                                <td>
                                    {item.projectName}
                                </td>
                                <td>
                                    {item.projectStart}
                                </td>
                                <td>
                                    {item.projectEnd}
                                </td>
                                <td>
                                    {item.projectSuccess}
                                </td>
                                <td>
                                    {item.project_status_Name}
                                </td>
                                <td>
                                   <Link to={'/project/view/'+item.projectID}>
                                       <button className="btn btn-info">View</button>
                                   </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProjectTable;
