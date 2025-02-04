import styles from './ingredient-details-dlg.module.css';

export const IngredientDlg = (props) => {
	return (
		<>
			<img src={props.image_large} alt={props.name} className='ml-4 mr-4' />
			<p className='text text_type_main-medium mt-4 mb-4'>{props.name}</p>
			<span className={styles.main + ' mb-5'}>
				<p className='text text_type_main-default text_color_inactive'>
					Калории, ккал <br /> {props.calories}
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					Белки, г <br /> {props.proteins}
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					Жиры, г <br /> {props.fat}
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					Углеводы, г <br /> {props.carbohydrates}
				</p>
			</span>
		</>
	);
};

import PropTypes from 'prop-types';

IngredientDlg.propTypes = {
	name: PropTypes.string,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	image_large: PropTypes.string,
};
