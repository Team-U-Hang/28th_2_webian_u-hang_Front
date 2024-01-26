import React from "react";
import './Personal_Login.css'
import logo from '../assets/logo.png'
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useNavigate } from "react-router-dom";





const Personal_Login = () => {

    const navigate = useNavigate();

    const navigateToGroupLogin = () => {
        navigateToGroupLogin("/Group_Login");
    };

    return (
        <>
        <React.Fragment>
            <div className="logo">
                <img className="logoimg" src={logo} />
                <span className="logotext">U.Hang</span>
            </div>
            <div className="container">

                <div className="header">
                    <button className="btn personal">개인</button>

                    <button className="btn group">단체</button>
                    <div></div>
                </div>
                <div className="google_button">
                    <GoogleLoginButton></GoogleLoginButton>
                </div>
                <div className="text_container">
                    <div className="text">개인이 아니신가요?</div>
                </div>
                <div className="group_login">
                    <button className="btn group_login_button" onClick={navigateToGroupLogin}>단체 로그인 하기</button>
                </div>

            </div>
        </React.Fragment>
        </>
    )
}

export default Personal_Login