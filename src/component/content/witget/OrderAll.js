import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginContext } from '../../../store/LoginProvider'
import { UserContext } from '../../../store/UserProvider'
import { UrlContext } from '../../../store/UrlProvider'
import axios from 'axios'

function OrderAll(props) {
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const [order, setOrder] = useState([])

    const getData = async () => {
        let res = await axios.get(url + '/task', {
            subID: props.subID
        })
        if(res.data === undefined){
            setOrder(res.data)
        }
       
    }

    useEffect(() => {
        getData()

    }, [])
    return (
        <div className="row">
            {order.map((item,index) => (
                <div class="col-md-6 col-sm-6" key={index}>
                    <div class="info-box bg-green">
                        <span class="info-box-icon"><i class="ion ion-ios-pricetag-outline"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">

                            </span>
                            <span class="info-box-number">

                            </span>
                            <div class="progress">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default OrderAll;
