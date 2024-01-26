import React, { useState, useRef } from "react";
import './Register.css'
import logo from '../assets/logo.png'
import { Form, useNavigate } from "react-router-dom";

const Register = () => {

    return (

        <React.Fragment>
            <div className="logo">
                <img className="logoimg" src={logo} />
                <span className="logotext">U.Hang</span>
            </div>
            <div className="container">
                <div className="header">
                    <div className="text">회원가입</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <input type="text" placeholder="닉네임" />
                    </div>
                    <div className="input">
                        <input
                            type="email"
                            pattern=".+@sookmyun.ac.kr"
                            placeholder="이메일" />
                    </div>
                    <div className="input">
                        <input
                            type="text"
                            maxLength={15}
                            placeholder="비밀번호" />
                    </div>
                    <div className="input">
                        <input
                            maxLength={15}
                            type="text"
                            placeholder="비밀번호 확인" />
                    </div>
                </div>
                <div className="submit-container">
                    <div className="submit">회원가입</div>
                </div>
            </div>

        </React.Fragment>
    );
}

export default Register;