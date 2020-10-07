import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'

function ProjectDash() {
    const [incoming, setIncoming] = useState(0)
    const [going, setGoing] = useState(0)
    const [delayed, setDelayed] = useState(0)
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const getData = async () => {
        let res
        res = await axios.get(url + "/project/count", {
            params: {
                memberID: localStorage.userID,
                status: 'incoming'
            }
        })
        setIncoming(res.data[0].c)

        res = await axios.get(url + "/project/count", {
            params: {
                memberID: localStorage.userID,
                status: 'going'
            }
        })
        setGoing(res.data[0].c)

        res = await axios.get(url + "/project/count", {
            params: {
                memberID: localStorage.userID,
                status: 'delayed'
            }
        })
        setDelayed(res.data[0].c)
    }

    useEffect(() => {
        getData()

    }, [])
    return (
        <div>
            <div className="small-box bg-aqua">
                <div className="inner">
                    <h3>Project</h3>
                    <h4>Every project related to you</h4>
                    <p>Only You</p>
                </div>
                <div className="icon">
                    <i className="fa fa-list-ol"></i>
                </div>
                <Link to="/project/table/all" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right"></i>
                </Link>

            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="small-box bg-green">
                        <div className="inner">
                            <h4><strong>Project Incoming</strong></h4>
                            <h4>{incoming} projects</h4>
                            <p>Only You</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-list-ol"></i>
                        </div>
                        <Link to="/project/table/incoming" className="small-box-footer">
                            More info <i className="fa fa-arrow-circle-right"></i>
                        </Link>

                    </div>
                </div>
                <div className="col-md-4">
                    <div className="small-box bg-yellow">
                        <div className="inner">
                            <h4><strong>Project On Going</strong></h4>
                            <h4>{going} projects</h4>
                            <p>Only You</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-list-ol"></i>
                        </div>
                        <Link to="/project/table/going" className="small-box-footer">
                            More info <i className="fa fa-arrow-circle-right"></i>
                        </Link>

                    </div>
                </div>
                <div className="col-md-4">
                    <div className="small-box bg-red">
                        <div className="inner">
                            <h4><strong>Delayed Projects</strong></h4>
                            <h4>{delayed} projects</h4>
                            <p>Only You</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-list-ol"></i>
                        </div>
                        <Link to="/project/table/delayed" className="small-box-footer">
                            More info <i className="fa fa-arrow-circle-right"></i>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDash;
