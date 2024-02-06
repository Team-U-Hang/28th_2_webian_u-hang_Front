import styled from "styled-components"
import sookmyung from '../assets/sookmyung.jpg'
import COLOR from "../utils/color";

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
    img{
        width: 100%;
        height: 40%;
    }
    #text1{
        font-size: 15px;
        font-weight: 600;
        color: ${COLOR.green};
    }
    #title{
        font-size: 20px;
        font-weight: 600;
    }
    #text2{
        font-size: 13px;
    }
`;

export default function CardEvent(props){
    return(
        <Box>
            <img src={sookmyung}/>
            <text id="text1">{props.group}</text>
            <text id="title">{props.title}</text>
            <text id="text2">날짜: {props.apply}</text>
            <text id="text2">시간: {props.period}</text>
        </Box>
    )
}