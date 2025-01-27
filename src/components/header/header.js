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
			<AppHeaderButton icon={BurgerIcon}>Конструктор</AppHeaderButton>
			<AppHeaderButton icon={ListIcon}>Лента заказов</AppHeaderButton>
			<Logo className={s.logo} />
			<AppHeaderButton icon={ProfileIcon}>Личный кабинет</AppHeaderButton>
		</header>
	);
}
