import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import BoardPersonal from "./pages/board-personal"
import BoardGroup from "./pages/board-group"
import Mypage from "./pages/mypage"
import GroupEventSearch from "./pages/group-event-search"
import PersonalEventSearch from "./pages/personal-event-search"
import Login from "./pages/Group_Login"
import Register from "./pages/Register"
import EventDetail from "./pages/EventDetail"
import EventRegister from "./pages/EventRegister"
import Mycalendar from "./components/Mycalendar"
import EventRegisterP from "./pages/EventRegister-personal"
import EventDetailP from "./pages/EventDetail-personal"

const router = createBrowserRouter([
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/Register",
    element: <Register/>
  },
  {
    path: "/event-detail",
    element: <EventDetail/>
  },
  {
    path: "/event-detail-personal",
    element: <EventDetailP/>
  },
  
  {
    path: "/event-register",
    element: <EventRegister/>
  },
  {
    path: "/event-register-personal",
    element: <EventRegisterP/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/calendar",
    element: <Mycalendar/>
  },
  {
    path: "/board",
    children: [
      {
        path:"personal",
        element:<BoardPersonal/>
      },
      {
        path:"group",
        element:<BoardGroup/>
      },
      {
        path:"group/search/:word",
        element:<GroupEventSearch/>
      },
      {
        path:"personal/search/:word",
        element: <PersonalEventSearch/>
      }
    ]
  },
  {
    path: "/mypage",
    element: <Mypage/>
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App