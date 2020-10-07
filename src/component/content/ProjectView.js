import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import ProjectDetail from './witget/ProjectDetail'
import SubprojectProgress from './witget/SubprojectProgress'
import '../css/Project.css'
function ProjectView() {
  const { login, setLogin } = useContext(LoginContext)
  const { user, setUser } = useContext(UserContext)
  const { url } = useContext(UrlContext)
  const { id } = useParams()

  const [master, setMaster] = useState(null)

  const getMaster = async () => {
    let res = await axios.get(url+'/project/master',{
      params:{
        projectID:id,
        memberID:localStorage.userID
      }
    })
    console.log(res.data)
    if(res.data.length > 0){
      setMaster(res.data[0].memberID)
    }
    
  }

  const ManageButton = () => {
    let bm = ""
    if(master != null){
      bm = <Link to={'/project/manage/' + id}>
      <button className="btn btn-info btn-sm">Manage</button>
    </Link>
    }else{
      bm = ""
    }
    return bm
  }

    useEffect(() => {
      getMaster()
    }, [])



  return (
    <div>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <ProjectDetail projectID={id} />
          <div className="text-center button-option">
            <button className="btn btn-success btn-sm">Edit</button>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
      <div className="row button-option">
        <ManageButton />
      </div>
      <div className="row">
        <SubprojectProgress projectID={id}/>
      </div>

    </div>
  );
}

export default ProjectView;
