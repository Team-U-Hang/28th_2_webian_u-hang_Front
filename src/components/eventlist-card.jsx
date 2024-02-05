import styled from "styled-components"
import sookmyung from '../assets/sookmyung.jpg'
import COLOR from "../utils/color";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
    background-color: white;
    border: 2px solid #cecdce;
    border-radius: 10px;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2%;
    width: 15%;
    height: 280px;
    &:hover{
        box-shadow: rgba(165, 163, 163, 0.9) 0px 7px 10px 2px;
        transform: scale(1.05);
    }
    cursor: pointer;
    img{
        width: 100%;
        height: 50%;
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

export default function EventCard(props){

    const navigate = useNavigate();

    return(
        <Box onClick={()=>{navigate("/event-detail/" + props.id)}}>
            <img src={sookmyung}/>
            <text id="text1">{props.writer}</text>
            <text id="title">{props.title}</text>
            <text id="text2">신청: {props.apply}</text>
            <text id="text2">운영: {props.period}</text>
        </Box>
    )
}