import { Outlet } from "react-router-dom"

export default function Profile() {
    return (
        <div>
            <h1>Profile goes here!</h1>
            <Outlet />
        </div>
    )
}