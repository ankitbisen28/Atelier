import { Navigate } from "react-router-dom"
import { useAppStore } from "./store";


export const ProtectedRoute = ({ children }) => {
    const { token } = useAppStore((state) => ({ token: state.token }));

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