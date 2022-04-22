import React from 'react'
import { useSelector } from 'react-redux'
import ReactDOM from 'react-dom';
import './Modal.css'

export const Modal = () => {

    const mount = useSelector(state => state.modals.modalMount)
    const display = useSelector(state => state.modals.display)
    const Current = useSelector(state => state.modals.currentModal)


    return display && mount && ReactDOM.createPortal(
        <div className='modal-background' >
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <Current />
            </div>
        </div>
        , mount)
}

export default Modal;
