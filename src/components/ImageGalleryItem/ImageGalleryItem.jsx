import { Component } from "react";
import Modal from "components/Modal/Modal";
import PropTypes from 'prop-types';

import css from "./ImageGalleryItem.module.css"


class ImageGalleryItem extends Component  {
    constructor() {
        super();

        this.state = {
            showModal: false,
        }
    }

    toggleModal = () => {
        this.setState(prev => ({ showModal: !prev.showModal }))
    }

    render() {
        return (
            <>
                <li className={css.Item} onClick={this.toggleModal}>
                    <img src={this.props.samallPicture} alt={this.props.name} className={css.Picture}/>
                </li>
                {this.state.showModal && (<Modal onClose={this.toggleModal} link={this.props.largePicture} alt={this.props.name} />)}
            </>
        )
    }
};

ImageGalleryItem.propTypes = {
    samallPicture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    largePicture: PropTypes.string.isRequired,
}

export default ImageGalleryItem;
