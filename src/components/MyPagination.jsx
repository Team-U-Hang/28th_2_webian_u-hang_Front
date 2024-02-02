import { useEffect, useState } from "react";
import styled from "styled-components";
import COLOR from "../utils/color";

const Wrapper = styled.div`
    color: #888;
    font-size: 14px;
    margin-top: 5%;
    width: 100%;
    ul{
        list-style: none; //동그라미 없애기
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }
    li{
        display: flex;
        align-items: center;
        justify-content: center;
        float: left;
        margin: 0 5px;
        width: 30px;
        height: 30px;
        text-align: center;
    }

    .pre, .next {
        visibility: hidden;
    }    
    
    .active {
        visibility: visible;
        &:hover{
            font-weight: 700;
            text-decoration: underline;
        }
    }
    .pageNum{
    border: 1px solid rgba(0,0,0,0);
    border-radius: 30px;
    &:hover{
        border: solid 1px #aaa;
        }
    }
    .pageNum.active {
        font-weight: 700;
        color: white;
        background-color: ${COLOR.green};
    } 
`;

export default function MyPagination(props){
    const currentPage = props.currentPage;
    const setCurrentPage = props.setCurrentPage;
    const totalPages = Math.ceil(props.totalItems / props.itemCountPerPage);

    // if(totalPages===1) return;

    const [start, setStart] = useState(1);
    const noPrev = start === 1;
    const noNext = start + 3 - 1 >= totalPages;

    //'이전', '다음' 누를 때 실행되는 함수
    const goPrePage = () => {
        setStart((prev) => prev-3);
        setCurrentPage(start-1);
    };
    const goNextPage = () => {
        setStart((prev) => prev+3);
        setCurrentPage(start+3);
    };

    return(
        <Wrapper>
            <ul>
                <li className={`pre ${noPrev ? '' : 'active'}`} onClick={goPrePage}>이전</li>
            
            {[...Array(3)].map((a,i) => (
                <>
                    {start + i <= totalPages &&(
                        <li key={start+i} className={`pageNum ${currentPage === start+i ? 'active' : ''}`} onClick={() => setCurrentPage(start+i)}>
                            {start + i}
                        </li>    
                    )}
                </>
            ))}
                <li className={`next ${noNext ? '' : 'active'}`} onClick={goNextPage}>다음</li>
            </ul>
        </Wrapper>
    )

}