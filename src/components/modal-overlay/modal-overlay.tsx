import styles from './modal-overlay.module.css';
import { useEffect, KeyboardEvent, FC, ReactElement, MouseEvent } from 'react';

import { MouseEventHandler } from 'react';

interface Ioverlay {
	onClick: MouseEventHandler;
	children: ReactElement;
}
export const ModalOverlay: FC<Ioverlay> = ({ children, onClick }) => {
	return (
		<div onClick={onClick} className={styles.modalWrapper}>
			{children}
		</div>
	);
};
