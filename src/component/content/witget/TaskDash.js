import React,{useState,useContext,useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'
function TaskDash() {
  const [incoming, setIncoming] = useState(0)
  const [going, setGoing] = useState(0)
  const [delayed, setDelayed] = useState(0)
  const { login, setLogin } = useContext(LoginContext)
  const { user, setUser } = useContext(UserContext)
  const { url } = useContext(UrlContext)

  const getData = async () => {
    let res = await axios.get(url+'/task/count',{
      params:{
        memberID:localStorage.userID,
        status:'incoming'
      }
    })
    setIncoming(res.data[0].counts)

    let res2 = await axios.get(url+'/task/count',{
      params:{
        memberID:localStorage.userID,
        status:'going'
      }
    })
    setGoing(res2.data[0].counts)

    let res3 = await axios.get(url+'/task/count',{
      params:{
        memberID:localStorage.userID,
        status:'delayed'
      }
    })
    setDelayed(res3.data[0].counts)
  }
  useEffect(() => {
    if(login === true){
      getData()
    }
      
  }, [])
  return (
    <div>
      <div className="small-box bg-aqua">
        <div className="inner">
          <h3>Task</h3>
          <h4>All Tasks related to you</h4>
          <p>Only You</p>
        </div>
        <div className="icon">
          <i className="fa fa-list-ol"></i>
        </div>
        <Link to="/task/all" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="small-box bg-green">
            <div className="inner">
              <h4><strong>Tasks Incoming</strong></h4>
              <h4>{incoming } task</h4>
              <p>Only You</p>
            </div>
            <div className="icon">
              <i className="fa fa-list-ol"></i>
            </div>
            <Link to="/task/incoming" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="small-box bg-yellow">
            <div className="inner">
              <h4><strong>Tasks On Going</strong></h4>
              <h4>{ going } task</h4>
              <p>Only You</p>
            </div>
            <div className="icon">
              <i className="fa fa-list-ol"></i>
            </div>
            <Link to="/task/going" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="small-box bg-red">
            <div className="inner">
              <h4><strong>Delayed Tasks</strong></h4>
              <h4>{ delayed } task</h4>
              <p>Only You</p>
            </div>
            <div className="icon">
              <i className="fa fa-list-ol"></i>
            </div>
            <Link to="/task/delayed" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDash;
