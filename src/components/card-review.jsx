import styled from "styled-components"
import COLOR from "../utils/color";
import profile from '../assets/profile.png';
import { FaStar } from 'react-icons/fa';

const Box = styled.div`
    background-color: white;
    border: 1px solid gray;
    border-radius: 10%;
    box-shadow: 3px 5px 10px gray;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2%;
    cursor: pointer;
    &:hover{
        transform: scale(1.05);
    }
    #text1{
        font-size: 15px;
        font-weight: 600;
        color: ${COLOR.green};
        padding: 2% 0 0 1%;
    }
    #title{
        font-size: 20px;
        font-weight: 600;
        padding-left: 1%;
    }
    #div1{
        background-color: #f5f7f6;
        border-radius: 10px;
        flex-direction: column;
        align-items: center;
        width: 100%;
        text-align: start;
        font-weight: 500;
        img{
        width: 30px;
        padding-top: 10%;
        }
        #star{
            display: flex;
            border: none;
            flex-direction: row;
            justify-content: center;
            width: 80%;
            height: 15%;
        }
        text{
            padding-left: 2%;
        }
    }

`;

export default function CardReview(props){
    let starNum = props.star; //후기의 별점 수
    return(
        <Box>
            <text id="text1">{props.group}</text>
            <text id="title">{props.title}</text>
            <div id="div1">
                <img src={profile}/>
                <div id="star">
                    {[...Array(starNum)].map(() =>{
                        return <FaStar size={20} color="#ffc107"/>;
                    })}
                    {[...Array(5-starNum)].map(() =>{
                        return <FaStar size={20} color="#b3b3b3"/>;
                    })}
                </div>
                <text>{props.review}</text>
            </div>
        </Box>
    )
}