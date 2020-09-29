import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'
import { OrderContext } from '../../../store/OrderProvider'
function OrderAll(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    //const [order, setOrder] = useState([])

    const { order , setOrder } = useContext(OrderContext)
    const [subID, setSubID] = useState('')

    const getOrder = async (id) => {
        let res = await axios.get(url+'/order',{
            params:{
                subID:id
            }
        })
        setOrder(res.data)
    }

    const onDel = async (id) => {
        let res = await axios.delete(url+'/order/'+id)
        if(res.data.status == 'success'){
            getOrder(subID)
        }
    }

    useEffect(() => {
        setSubID(props.subID)
        getOrder(props.subID)

    }, [])
    return (
        <div className="row">
            {order.map((item,index) => (
                <div className="col-md-6 col-sm-6" key={index}>
                    <div className="info-box bg-green">
                        <span className="info-box-icon"><i className="ion ion-ios-pricetag-outline"></i></span>
                        <div className="info-box-content">
                            <span className="info-box-text">
                                {item.subProjectDetailName}
                            </span>
                            <span className="info-box-number">
                                {item.fname} {item.lname}
                            </span>
                            <button className="btn btn-danger btn-sm pull-right" onClick={() => onDel(item.subProjectDetail_ID )}>Delete</button>
                            <div className="progress">
                                <div className="progress-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default OrderAll;
