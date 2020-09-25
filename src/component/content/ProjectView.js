import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'

function ProjectView() {
  const { login, setLogin } = useContext(LoginContext)
  const { user, setUser } = useContext(UserContext)
  const { url } = useContext(UrlContext)
  const {id} = useParams()
  return (
    <div>
        <Link to={'/project/manage/'+id}>
            <button className="btn btn-info btn-sm">Manage</button>
        </Link>
    </div>
  );
}

export default ProjectView;
