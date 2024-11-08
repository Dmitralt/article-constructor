import React from 'react';
import { modalStyles } from './modalStyles';
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
                <div style={modalStyles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};


export default Modal;
