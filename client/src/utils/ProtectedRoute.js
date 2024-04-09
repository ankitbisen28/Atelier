import { Navigate }from "react-router-dom"
const token = localStorage.getItem("token");

export const ProtectedRoute = ({ children }) => {
    if (!token) {
        return (
            <Navigate to="/login" replace={true} />
        )
    }
    else {
        return (
            <>{children}</>
        )
    }

}