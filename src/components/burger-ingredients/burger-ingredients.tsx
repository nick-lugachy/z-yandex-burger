import {
	useState,
	useEffect,
	useRef,
	createRef,
	UIEvent,
	RefObject,
} from 'react';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../ingrediedt-card/ingrediedt-card';

import { Iingredient } from '../../services/types';
import {
	RootState,
	AppDispatch,
	useSelectorTp,
	useDispatchTp,
} from '../../index';

const ItemGroups = [
	{ id: 'bun', name: 'Булки' },
	{ id: 'sauce', name: 'Соусы' },
	{ id: 'main', name: 'Начинки' },
];

export function BurgerIngredients() {
	const [curTab, setCurTab] = useState(ItemGroups[0].id);

	const scrollRef = useRef<HTMLDivElement>(null);
	const headersRefs = useRef<RefObject<HTMLHeadingElement>[]>([]);

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		if (!headersRefs.current[1].current) return;
		if (!headersRefs.current[2].current) return;

		if (
			headersRefs.current[1].current.offsetTop / 2 >
			e.currentTarget.scrollTop
		) {
			setCurTab(ItemGroups[0].id);
		} else if (
			headersRefs.current[2].current.offsetTop / 2 >
			e.currentTarget.scrollTop
		) {
			setCurTab(ItemGroups[1].id);
		} else {
			setCurTab(ItemGroups[2].id);
		}
	};

	useEffect(() => {
		headersRefs.current = ItemGroups.map(
			(_, i) => headersRefs.current[i] ?? createRef<HTMLHeadingElement>()
		);
	}, []);

	const data: Array<Iingredient> = useSelectorTp(
		(state) => state.ingredients.data
	);

	const tabClic = (tab: string) => {
		setCurTab(tab);
		const h = headersRefs.current[ItemGroups.findIndex((a) => a.id === tab)];

		if (scrollRef.current && h.current) {
			scrollRef.current.scrollTo(
				0,
				h.current.offsetTop - scrollRef.current.offsetTop
			);
		}
	};

	return (
		<section className={styles.panel}>
			<h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
			<div className={styles.tabBar}>
				{ItemGroups.map((group, i) => (
					<Tab
						key={group.id}
						value={group.id}
						active={group.id === curTab}
						onClick={tabClic}>
						{group.name}
					</Tab>
				))}
			</div>
			<section
				ref={scrollRef}
				onScroll={handleScroll}
				className={styles.scroll}>
				{ItemGroups.map((item, i) => (
					<section key={item.id}>
						<h2
							ref={headersRefs.current[i]}
							id={item.id}
							className='text text_type_main-medium mt-6 mb-2'>
							{item.name}
						</h2>
						<section className={styles.ingredientGrid}>
							{data !== null &&
								data.map(
									(Ing: Iingredient) =>
										item.id === Ing.type && (
											<Ingredient
												//ref={headersRefs.current[i]}
												key={Ing._id}
												{...Ing}
											/>
										)
								)}
						</section>
					</section>
				))}
			</section>
		</section>
	);
}
