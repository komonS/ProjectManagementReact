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
import Assign from './modal/Assign'
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
            <div className="col-md-6">
                <button className="btn btn-warning" data-toggle="modal" data-target="#order">Assign</button>
            </div>
        </div>
        <div>
            <OrderAll subID={subID} />
        </div>
        <div>
            <Assign subID={subID}/>
        </div>
    </div>
  );
}

export default SubprojectManage;
