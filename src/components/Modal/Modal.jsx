import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import css from "./Modal.module.css"

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleModalClick = evt => {
        if (evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <div className={css.Overlay} onClick={this.handleModalClick}>
                <div className={css.Modal}>
                    <img src={this.props.link} alt={this.props.name} />
                </div>
            </div>, modalRoot
        )
    }
}

Modal.protoTypes = {
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default Modal;