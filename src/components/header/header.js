import s from './header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

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
	return (
		<header className={s.header}>
			<Button
				htmlType='button'
				type='secondary'
				size='medium'
				display='inline'
				extraClass='mr-2 mt-4 mb-4 pr-5 pl-5'>
				<BurgerIcon className={s.icon} />
				<span className={s.button}>Конструктор</span>
			</Button>

			<Button
				htmlType='button'
				type='secondary'
				size='medium'
				display='inline'
				extraClass='mr-2 mt-4 mb-4 pr-5 pl-5'>
				<ListIcon className={s.icon} type='secondary' />
				<span className={s.buttonInactive}>Лента заказов</span>
			</Button>

			<Logo className={s.logo} />

			<Button
				htmlType='button'
				type='secondary'
				size='medium'
				display='inline'
				extraClass='mr-2 mt-4 mb-4 pr-5 pl-5'>
				<ProfileIcon className={s.icon} type='secondary' />
				<span className={s.buttonInactive}>Личный кабинет</span>
			</Button>
		</header>
	);
}
