import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'
function ProjectTable() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const [project, setProject] = useState([])

    const getProject = async () => {
        let res = await axios.get(url + '/project', {
            params: {
                memberID: localStorage.userID
            }
        })
        setProject(res.data)
    }

    useEffect(() => {
        getProject()
    }, [])
    return (
        <div>
            <div className="box box-warning">
                <div className="box-header with-border">
                    <h3 className="box-title">Project</h3>
                    <div className="box-tools pull-right">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                    </div>
                </div>
                <div className="box-body">
                    <table className="table table-hover" id="project_table">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Status</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item.projectName}
                                    </td>
                                    <td>
                                        {item.project_status_Name}
                                    </td>
                                    <td>
                                        <Link to={'/project/view/' + item.projectID}>
                                            <button className="btn btn-info">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="box-footer no-padding">

                </div>
            </div>
        </div>
    );
}

export default ProjectTable;
