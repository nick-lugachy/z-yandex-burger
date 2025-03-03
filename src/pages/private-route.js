import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PrivateRoute(props) {
	const { authorized } = useSelector((store) => store.profile);

	const location = useLocation();

	if (authorized) {
		return props.children;
	} else {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}
}
