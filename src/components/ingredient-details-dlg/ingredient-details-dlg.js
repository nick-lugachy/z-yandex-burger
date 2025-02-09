import styles from './ingredient-details-dlg.module.css';
import { useSelector } from 'react-redux';

export const IngredientDlg = () => {
	const ingredient = useSelector((state) => state.ingredientDetail.ingredient);

	return (
		<>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				className='ml-4 mr-4'
			/>
			<p className='text text_type_main-medium mt-4 mb-4'>{ingredient.name}</p>
			<span className={styles.main + ' mb-5'}>
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
		</>
	);
};
