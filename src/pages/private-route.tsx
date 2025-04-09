import { Navigate, useNavigate, useLocation } from 'react-router-dom';

import { hasStoredToken } from '../utils';
import { useEffect, useState, ReactNode } from 'react';
import { getUserInfo } from '../services/profile';
import loader from '../app/assets/loader.gif';
import styles from '../components/app/app.module.css';

import { RootState, AppDispatch, useSelectorTp, useDispatchTp } from '../index';

const Loader = () => (
	<div className={styles.fzf}>
		<h1>LOADING...</h1>
		<img src={loader} alt='Осторожно, рентген' />
	</div>
);

export function PrivateRoute({ children }: { children: ReactNode }) {
	const { authorized } = useSelectorTp((state) => state.profile);
	const dispatch = useDispatchTp();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(!authorized && hasStoredToken());

	useEffect(() => {
		//try refresh stored token
		if (loading) {
			dispatch(getUserInfo(() => setLoading(false)));
		}
	}, []);

	const location = useLocation();

	if (!loading && !authorized) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	if (loading) return <Loader />;

	return children;
}
