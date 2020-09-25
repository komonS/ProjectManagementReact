import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import ProjectDetail from './witget/ProjectDetail'
import Team from './witget/Team'
import '../css/ProjectManagement.css'
function Template() {
  const { login, setLogin } = useContext(LoginContext)
  const { user, setUser } = useContext(UserContext)
  const { url } = useContext(UrlContext)
  const {id} = useParams()
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="box-detail">
            <ProjectDetail projectID={id} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="box-detail">
            <Team projectID={id} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          
        </div>
      </div>
    </div>
  );
}

export default Template;