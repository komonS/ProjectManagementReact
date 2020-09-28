import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import { TeamContext } from '../../../store/TeamProvider'
import axios from 'axios'

function Team(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const { team , setTeam } = useContext(TeamContext)

    const [id, setId] = useState('')
    //const [team, setTeam] = useState([])
    const getTeam = async () => {
        let res = await axios.get(url + '/project/member', {
            params:{
                projectID: props.projectID
            }
        })
        setTeam(res.data)
    }

    useEffect(() => {
        getTeam()
        setId(props.projectID)
    }, [])
    return (
        <div>
            <label>Team</label>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.fname} {item.lname}
                                </td>
                                <td>
                                    {item.user_project_status}
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm">Del</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Team;
