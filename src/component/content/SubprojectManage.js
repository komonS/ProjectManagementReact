import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import '../css/Project.css'
import ProjectDetail from './witget/ProjectDetail'
import SubprojectDetail from './witget/SubprojectDetail'
import OrderAll from './witget/OrderAll'
function SubprojectManage() {
  const { login, setLogin } = useContext(LoginContext)
  const { user, setUser } = useContext(UserContext)
  const { url } = useContext(UrlContext)

  const { id,subID } = useParams()

  return (
    <div>
        <div className="row">
            <div className="col-md-6">
                <div className="box-detail">
                    <SubprojectDetail subID={subID} />
                </div>
            </div>
        </div>
        <div>
            <OrderAll subID={subID} />
        </div>
    </div>
  );
}

export default SubprojectManage;
