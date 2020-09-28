import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'

function Template() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    return (
        <div className="modal fade" id="team">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Team</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label>Division</label>
                                <select name="divisionlist" id="divisionlist" className="form-control">
                                </select>
                            </div>
                            <div className="form-group">
                                <label>User</label>
                                <select name="userID" id="userID" className="form-control">

                                </select>
                            </div>
                            <div className="text-center">
                                <button id="btnaddteam" className="btn btn-success">Add</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>


    );
}

export default Template;
