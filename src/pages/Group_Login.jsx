import React, { useEffect, useState } from "react";
import './Group_Login.css'
import logo from '../assets/logo.png'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [inputId, setInputId] = useState("")
    const [inputPw, setInputPw] = useState("")

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const onClickLogin = () => {
        console.log('click login')
    }

    const goToRegister = () => {
        navigate ("/Register")
    }

    useEffect(() => {
        axios.get('')
    },
    [])
    return (

        <React.Fragment>
            <div className="login_logo">
                <img className="login_logoimg" src={logo} />
                <span className="login_logotext">U.Hang</span>
            </div>
            <div className="login_container">

                <div className="login_header">
                    <div className="login_btn">로그인</div>
                    <div className="login_underline"></div>
                </div>
                <div className="login_inputs">
                    <div className="login_input">
                        <input type="text" placeholder="ID" /*value={inputId} onChange={handleInputId}*/ />
                    </div>
                    <div className="login_input">
                        <input type="text" placeholder="PW" /*value={inputPw}  onChange={handleInputPw}*//>
                    </div>

                </div>
                <div className="login_submit-container">
                    <button className="login_submit" /*onClick={onClickLogin}*/>로그인</button>
                    <button  className="register" onClick={goToRegister}>회원가입</button>
                </div>

            </div>
        </React.Fragment>
    );
}

export default Register;