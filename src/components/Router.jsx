import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import EventDetail from "../pages/EventDetail";
import EventRegister from "../pages/EventRegister";

export default function Router() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to='/event-detail'>
          개인
        </NavLink><blank/>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to='/event-register'>
          등록
        </NavLink>
      </nav>

      <Routes>
        <Route path='/event-register' element={<EventRegister />} />
        <Route path='/event-detail' element={<EventDetail />} />
      </Routes>
    </BrowserRouter>
  );
}