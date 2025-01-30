import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ children, onClick }) => {
	return (
		<div onClick={onClick} className={styles.modalWrapper}>
			{children}
		</div>
	);
};
