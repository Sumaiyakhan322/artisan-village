import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layouts/Main";
import AllProducts from "../Pages/AllProducts";



  const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children:[{
        path:'/all',
        element:<AllProducts></AllProducts>,
        
      }
    ,
]
    },
  ]);

  export default router