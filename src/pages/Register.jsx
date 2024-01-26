import React, { useState, useRef } from "react";
import './Register.css'
import logo from '../assets/logo.png'
import { Form, useNavigate } from "react-router-dom";

const Register = () => {
    const form = useRef();

    const navigate = useNavigate();


    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const [isIdCheck, setIsIdCheck] = useState(false); // 중복 검사를 했는지 안했는지
    const [isIdAvailable, setIsIdAvailable] = useState(false); // 아이디 사용 가능한지 아닌지
    const onChangeIdHandler = (e) => {
        const idValue = e.target.value;
        setId(idValue);
        idCheckHandler(idValue);
    }

    const onChangePasswordHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
            passwordCheckHandler(value, confirm);
        } else {
            setConfirm(value);
            passwordCheckHandler(password, value);
        }
    }

    const idCheckHandler = async (id) => {
        const idRegex = /^[a-z\d]{5,10}$/;
        if (id === '') {
            setIdError('아이디를 입력해주세요.');
            setIsIdAvailable(false);
            return false;
        } else if (!idRegex.test(id)) {
            setIdError('아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
            setIsIdAvailable(false);
            return false;
        }
        try {
            const responseData = await idDuplicateCheck(id);
            if (responseData) {
                setIdError('사용 가능한 아이디입니다.');
                setIsIdCheck(true);
                setIsIdAvailable(true);
                return true;
            } else {
                setIdError('이미 사용중인 아이디입니다.');
                setIsIdAvailable(false);
                return false;
            }
        } catch (error) {
            alert('서버 오류입니다. 관리자에게 문의하세요.');
            console.error(error);
            return false;
        }
    }


    const passwordCheckHandler = (password, confirm) => {
        const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
        if (password === '') {
            setPasswordError('비밀번호를 입력해주세요.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
            return false;
        } else if (confirm !== password) {
            setPasswordError('');
            setConfirmError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setPasswordError('');
            setConfirmError('');
            return true;
        }
    }

    const signupHandler = async (e) => {
        e.preventDefault();

        const idCheckresult = await idCheckHandler(id);
        if (idCheckresult) setIdError('');
        else return;
        if (!isIdCheck || !isIdAvailable) {
            alert('아이디 중복 검사를 해주세요.');
            return;
        }

        const passwordCheckResult = passwordCheckHandler(password, confirm);
        if (passwordCheckResult) { setPasswordError(''); setConfirmError(''); }
        else return;

        try {
            const responseData = await signup(id, password, confirm);
            if (responseData) {
                localStorage.setItem('loginId', id);
                setOpenModal(true);
            } else {
                alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
            console.error(error);
        }
    }
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
                <Form onSubmit={signupHandler}>
                    <div className="inputs">
                        <div className="input">
                            <input type="text" placeholder="닉네임" />
                        </div>
                        <div className="input">
                            <input
                                onChange={onChangeIdHandler}
                                type="text"
                                maxLength={10}
                                placeholder="아이디" />
                            {idError && <small className={isIdAvailable ? 'idAvailable' : ''}>{idError}</small>}
                        </div>
                        <div className="input">
                            <input
                                onChange={onChangePasswordHandler}
                                type="text"
                                maxLength={15}
                                placeholder="비밀번호" />
                            {passwordError && <small>{passwordError}</small>}
                        </div>
                        <div className="input">
                            <input
                                onChange={onChangePasswordHandler}
                                maxLength={15}
                                type="text"
                                placeholder="비밀번호 확인" />
                            {confirmError && <small>{confirmError}</small>}
                        </div>
                    </div>
                    <div className="submit-container">
                        <div className="submit">회원가입</div>
                    </div>
                </Form>
                {setOpenModal ? openModal && (<SingupModal />) : null}
            </div>

        </React.Fragment>
    );
}

export default Register;