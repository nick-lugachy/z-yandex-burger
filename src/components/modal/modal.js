import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Modal = ({ isOpen, onClose, children, header }) => {
	if (!isOpen) {
		return null;
	}

	const handleClose = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	return ReactDOM.createPortal(
		<div onClick={handleClose} className={styles.modalWrapper}>
			<div className={styles.modalFrame}>
				<div className={styles.modalHeader}>
					<p className={'text text_type_main-large ' + styles.modalHeader}>
						{header}
					</p>
					<CloseIcon onClick={handleClose} />
				</div>
				<div className={styles.modalBody}>{children}</div>
			</div>
		</div>,
		document.getElementById('modal')
	);
};
