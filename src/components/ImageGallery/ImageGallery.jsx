import { Component } from "react";
import PropTypes from 'prop-types';
import css from "./ImageGallery.module.css"


import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends Component {

    render() {
        return (<section className={css.Section}>
            <div className={css.Section}>
                <ul className={css.Gallery}>
                    {this.props.pictureArray.map(({id, webformatURL, largeImageURL, tags }) =>
                        <ImageGalleryItem
                            key={id}
                            samallPicture={webformatURL}
                            largePicture={largeImageURL}
                            name={tags}
                        />
                    )}
                </ul>
                {this.props.pictureArray.length >= 12 && this.props.children}
            </div>
        </section>)    
    }
};

ImageGallery.propTypes = {
    children: PropTypes.element.isRequired,
}

export default ImageGallery;