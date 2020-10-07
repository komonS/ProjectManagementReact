import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import GroupProject from './witget/GroupProject'
import GroupUser from './witget/GroupUser'
import '../css/Group.css'
import FriendAdd from './witget/FriendAdd'
import '../css/Group.css'
function Group() {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    return (
        <div>
            <div className="row">
                <div className="col-md-3 ">
                    <div className="data-box">
                        <FriendAdd />
                        <GroupUser />
                    </div>

                </div>
                <div className="col-md-9">
                    <div className="group-list data-box">
                        <GroupProject />
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Group;
