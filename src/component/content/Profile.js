import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import ProfileDetai from './witget/ProfileDetail'

function Profile() {
  const { login, setLogin } = useContext(LoginContext)
  const { user, setUser } = useContext(UserContext)
  const { url } = useContext(UrlContext)


  return (
    <div>
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div>
                    <ProfileDetai/>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    </div>
  );
}

export default Profile;
