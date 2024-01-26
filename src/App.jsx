import EventDetail from "./pages/EventDetail"
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import EventRegister from "./pages/EventRegister";

const router = createBrowserRouter([
  
  {
    path:"/event-detail",
    element: <EventDetail/>
  },
  {
    path:"/event-register",
    element: <EventRegister/>
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
