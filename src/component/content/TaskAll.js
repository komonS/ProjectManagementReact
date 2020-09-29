import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'

function TaskAll() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const { id } = useParams()

    const [task, setTask] = useState([])

    const getTask = async () => {
        let res = await axios.get(url + '/task', {
            params: {
                memberID: localStorage.userID,
                status: id
            }
        })
        setTask(res.data)
    }

    useEffect(() => {
        getTask()

    }, [])
    return (
        <div>
            <h3 className="text-center">Task</h3>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Subject</th>
                            <th>Order Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Completed Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map((item, index) => (
                            <tr key={index}>
                                <td>{item.projectName}</td>
                                <td>{item.subProjectName}</td>
                                <td>{item.subProjectDetailName}</td>
                                <td>{item.subProjectStart}</td>
                                <td>{item.subProjectEnd}</td>
                                <td>{item.subProjectSuccess}</td>
                                <td>{item.priorityName}</td>
                                <td>{item.project_status_Name}</td>
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
        </div>
    );
}

export default TaskAll;
