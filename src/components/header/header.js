import s from './header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useMatch, useNavigate } from 'react-router-dom';

function AppHeaderButton(props) {
	return (
		<Button
			htmlType='button'
			type='secondary'
			size='medium'
			display='inline'
			extraClass='mr-2 mt-4 mb-4 pr-5 pl-5'>
			<props.icon className={s.icon} type='secondary' />
			{props.children}
		</Button>
	);
}

export function AppHeader(props) {
	const navigate = useNavigate();
	const isProfilePath = useMatch('/profile/*');
	const isFeedPath = useMatch('/order-feed/*');
	const isConcPath = useMatch('/'); //!isProfilePath && !isFeedPath;

	return (
		<header className={s.header}>
			<Button
				htmlType='button'
				onClick={() => navigate('/')}
				type='secondary'
				size='medium'
				display='inline'
				extraClass='mr-2 mt-4 mb-4 pr-5 pl-5'>
				<BurgerIcon
					className={s.icon}
					type={isConcPath ? 'primary' : 'secondary'}
				/>
				<span className={isConcPath ? s.button : s.buttonInactive}>
					Конструктор
				</span>
			</Button>

			<Button
				htmlType='button'
				onClick={() => navigate('/order-feed')}
				type='secondary'
				size='medium'
				display='inline'
				extraClass='mr-2 mt-4 mb-4 pr-5 pl-5'>
				<ListIcon
					className={s.icon}
					type={isFeedPath ? 'primary' : 'secondary'}
				/>
				<span className={isFeedPath ? s.button : s.buttonInactive}>
					Лента заказов
				</span>
			</Button>

			<a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
				<Logo className={s.logo} />
			</a>

			<Button
				htmlType='button'
				onClick={() => navigate('/profile')}
				type='secondary'
				size='medium'
				display='inline'
				extraClass='mr-2 mt-4 mb-4 pr-5 pl-5'>
				<ProfileIcon
					className={s.icon}
					type={isProfilePath ? 'primary' : 'secondary'}
				/>
				<span className={isProfilePath ? s.button : s.buttonInactive}>
					Личный кабинет
				</span>
			</Button>
		</header>
	);
}
