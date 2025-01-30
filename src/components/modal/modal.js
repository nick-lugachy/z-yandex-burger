import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay.js';

export const Modal = ({ isOpen, onClose, children, header }) => {
	const handleClose = (e) => {
		if (e.target === e.currentTarget || e.keyCode === 27) onClose();
	};

	useEffect(() => {
		window.addEventListener('keydown', handleClose);
		return () => window.removeEventListener('keydown', handleClose);
	}, []);

	if (!isOpen) {
		return null;
	}

	return ReactDOM.createPortal(
		<ModalOverlay onClick={handleClose}>
			<div className={styles.modalFrame}>
				<div className={styles.modalHeader}>
					<p className={'text text_type_main-large ' + styles.modalHeader}>
						{header}
					</p>
					<CloseIcon onClick={handleClose} />
				</div>
				<div className={styles.modalBody}>{children}</div>
			</div>
		</ModalOverlay>,
		document.getElementById('modal')
	);
};
