import { Link, Outlet } from "react-router-dom";

const Main = () => {
    
    return (
        <div>

            <Link to={'/all'}>AllProducts</Link>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;