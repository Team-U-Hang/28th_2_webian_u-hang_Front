import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import COLOR from "../utils/color"
import logo_color from '../assets/logo-color.png';
import profile from '../assets/profile.png';

const Nav = styled.nav`
    height: 45px;
    color: black;
    font-weight: 600;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: white;
    display: flex;
    flex-direction: row;
    z-index: 1;
    label{
        cursor: pointer;
    }
    img{
        height: 55%;
    }
    #home{
        padding-left: 20px;
        font-size: 30px;
        font-weight: 600;
        #uhang{
            color: ${COLOR.green};
            padding-left: 5px;
            cursor: pointer;
            &:hover{
                color: #6c8668;
            }
        }
    }
    #board{
        margin-left: auto;
        padding-top: 10px;
        #board1{
            margin-right: 100px;
            &:hover{
                color: #636363;
            }
        }
        #board2{
            &:hover{
                color: #636363;
            }
        }

    }

    #mypage{
        position: relative;
        width: 130px;
        margin-left: auto; //오른쪽에 두기
        cursor: pointer;
        #my{
            position: absolute;
            padding-top: 10px;
            padding-left: 85px;
        }
        #mylabel{
            position: absolute;
            margin-top: 10px;
            
        }
        &:hover{
            color: #636363;
        }
    }
`;

export default function NavBar(){
    let navigate = useNavigate();

    return(
        <Nav>
                <div id="home">
                    <img src={logo_color}/>
                    <label id="uhang" onClick={()=>{navigate("/home")}}>U.Hang</label>
                </div>
                <div id="board">
                    <label id="board1" onClick={()=>{navigate("/board/personal")}}>개인 게시판</label>
                    <label id="board2" onClick={()=>{navigate("/board/group")}}>단체 게시판</label>
                </div>
                <div id="mypage" onClick={()=>{navigate("/mypage")}}>
                    <label id="mylabel">마이페이지</label>
                    <img id="my" src={profile}/>
                </div>
            </Nav>
    )
}