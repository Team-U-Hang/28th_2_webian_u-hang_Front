import React, { useEffect, useState } from "react";
import './Group_Login.css'
import logo from '../assets/logo.png'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

    onLogin = (email, password) => {
        const data = {
            email,
            password,
        };
        axios.post('/login', data)
            .then(onLoginSuccess)
            .catch(error => {
                // ... 에러 처리
            });
    }

    onSilentRefresh = () => {
        axios.post('/silent-refresh', data)
            .then(onLoginSuccess)
            .catch(error => {
                // ... 로그인 실패 처리
            });
    }

    onLoginSuccess = response => {
        const { accessToken } = response.data;

        // accessToken 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // accessToken 만료하기 1분 전에 로그인 연장
        setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000);
    }

    const navigate = useNavigate();

    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const onClickLogin = () => {
        e.preventDefault();

        console.log('Id', inputId);
        console.log('Pw', inputPw);

        let body = {
            id: inputId,
            pw: inputPw,
        }

        dispatchEvent(loginUser(body));
    }

    const goToRegister = () => {
        navigate("/Register")
    }

    useEffect(() => {
        // axios.get('')
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
                        <input type="text" placeholder="ID" value={inputId} onChange={handleInputId} />
                    </div>
                    <div className="login_input">
                        <input type="text" placeholder="PW" value={inputPw} onChange={handleInputPw} />
                    </div>

                </div>
                <div className="login_submit-container">
                    <button className="login_submit" onClick={onClickLogin}>로그인</button>
                    <button className="register" onClick={goToRegister}>회원가입</button>
                </div>

            </div>
        </React.Fragment>
    );
}

export default Login;