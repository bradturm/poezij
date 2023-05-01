import { useLocation, Navigate, Outlet } from "react-router-dom";

import { accountService } from '../../../services/account-service';

const RequireAuth = ({ allowedRoles }) => {

    //  const auth = {};
    //  auth.user = null;

    const user = accountService.userValue;

    const location = useLocation();

    return (
        allowedRoles?.includes(user?.role)
            ? <Outlet />
            : <Navigate to="/account/login" state={{ from: location }} replace />

    );
}

export default RequireAuth;