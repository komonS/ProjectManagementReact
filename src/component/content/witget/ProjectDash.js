import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'

function Project() {
    const [incoming, setIncoming] = useState(0)
    const [going, setGoing] = useState(0)
    const [delayed, setDelayed] = useState(0)
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)


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
                <a to="/project/all" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="small-box bg-green">
                        <div className="inner">
                            <h4><strong>Project Incoming</strong></h4>
                            <h4>{ incoming } projects</h4>
                            <p>Only You</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-list-ol"></i>
                        </div>
                        <a to="/project/incoming" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="small-box bg-yellow">
                        <div className="inner">
                            <h4><strong>Project On Going</strong></h4>
                            <h4>{ going } projects</h4>
                            <p>Only You</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-list-ol"></i>
                        </div>
                        <a to="/project/going" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="small-box bg-red">
                        <div className="inner">
                            <h4><strong>Delayed Projects</strong></h4>
                            <h4>{ delayed } projects</h4>
                            <p>Only You</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-list-ol"></i>
                        </div>
                        <a to="/project/delayed" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
