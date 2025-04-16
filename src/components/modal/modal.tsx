import {
	useEffect,
	KeyboardEvent,
	FC,
	ReactElement,
	MouseEventHandler,
} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

interface Imodal {
	onClose: () => void;
	header?: string;
	children: ReactElement;
}
export const Modal: FC<Imodal> = ({ onClose, children, header }) => {
	const handleClose: MouseEventHandler = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent | Event) => {
			if ((e as KeyboardEvent).key === 'Escape') onClose();
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	const modalRoot = document.getElementById('modal');
	if (!modalRoot) return null;

	return ReactDOM.createPortal(
		<ModalOverlay onClick={handleClose}>
			<div className={styles.modalFrame}>
				<div className={styles.modalHeader}>
					<p className={'text text_type_main-large ' + styles.modalHeader}>
						{header}
					</p>
					<CloseIcon type='primary' onClick={() => onClose()} />
				</div>
				<div className={styles.modalBody}>{children}</div>
			</div>
		</ModalOverlay>,
		modalRoot
	);
};
