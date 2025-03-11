import styles from './ingredient-details-dlg.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../index';
import { Iingredient } from '../../services/types';

export const IngredientDlg = ({ header }: { header?: string }) => {
	const data: Iingredient[] = useSelector(
		(state: RootState) => state.ingredients.data || []
	);

	const ingredient = data
		? data.find((Item) => useParams().ingId === Item._id)
		: null;

	return (
		ingredient && (
			<div className={styles.main}>
				{header && (
					<p className={'text text_type_main-large ' + styles.modalHeader}>
						{header}
					</p>
				)}
				<img
					src={ingredient.image_large}
					alt={ingredient.name}
					className='ml-4 mr-4'
				/>
				<p className='text text_type_main-medium mt-4 mb-4'>
					{ingredient.name}
				</p>
				<span className={styles.card + ' mb-5'}>
					<p className='text text_type_main-default text_color_inactive'>
						Калории, ккал <br /> {ingredient.calories}
					</p>
					<p className='text text_type_main-default text_color_inactive'>
						Белки, г <br /> {ingredient.proteins}
					</p>
					<p className='text text_type_main-default text_color_inactive'>
						Жиры, г <br /> {ingredient.fat}
					</p>
					<p className='text text_type_main-default text_color_inactive'>
						Углеводы, г <br /> {ingredient.carbohydrates}
					</p>
				</span>
			</div>
		)
	);
};
