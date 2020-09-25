import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'
function TaskTable() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const [task, setTask] = useState([])
    const getData = async () => {
        let res = await axios.get(url + '/task', {
            params: {
                memberID: localStorage.userID,
                status: 'progress'
            }
        })
        setTask(res.data)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <div>
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Task</h3>

                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                            </button>
                            <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div className="box-body">
                        <table className="table table-hover" id="show_task">
                            <thead>
                                <tr>
                                    <th>
                                        Project Name
                                    </th>
                                    <th>
                                        Subject
                                    </th>
                                    <th>
                                        Order Name
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        View
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {task.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {item.projectName}
                                        </td>
                                        <td>
                                            {item.subProjectName}
                                        </td>
                                        <td>
                                            {item.subProjectDetailName}
                                        </td>
                                        <td>
                                            {item.project_status_Name}
                                        </td>
                                        <td>
                                            <Link to={'/task/view/' + item.subProjectDetail_ID}>
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
        </div>
    );
}

export default TaskTable;
