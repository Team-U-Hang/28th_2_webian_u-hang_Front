import styled from "styled-components";
import COLOR from "../utils/color";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Wrapper = styled.div`
  color: #888;
  font-size: 14px;
  cursor: pointer;

  ul{
    list-style: none; //동그라미 없애기
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

  #pre{
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

export default function Pagination(props){
  const eventsNum = props.eventsNum;
  const eventsPerPage = props.eventsPerPage;
  const setCurrentPage = props.setCurrentPage;
  const currentPage = props.currentPage;
  
  const pageList = [];
  const totalPages = Math.ceil(eventsNum / eventsPerPage);

  for (let i=1; i<= totalPages; i++){
    pageList.push(i);
  }

  const goToNextPage = () => {
    setCurrentPage(currentPage+1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage-1);
  };

  if(totalPages === 1){
    return null;
  }

  return (
    <Wrapper>
      <ul>
        <li id="pre" onClick={goToPrevPage} disabled={currentPage === 1}>이전</li>
        {
          pageList.map((page)=>(
            <li className={`pageNum ${currentPage === page ? 'active' : ''}`} key={page} onClick={() => setCurrentPage(page)}>
              {page}
            </li>
          ))
        }
        <li id="pre" onClick={goToNextPage} disabled={currentPage === pageList.length}>다음</li>
      </ul>
    </Wrapper>
  );

}
