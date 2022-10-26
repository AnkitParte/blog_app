import { Route, Routes } from "react-router-dom";
import Homepage from "../Renders/Homepage";
import Login from "../Renders/Login";
import Signup from "../Renders/Signup";

export default function AllRoutes(){

    return (<>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </>)
}