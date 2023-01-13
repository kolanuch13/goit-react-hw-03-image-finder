import { Component } from "react";
import { Blocks } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from "./ImageGallery.module.css"


import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends Component {
    constructor() {
        super();

        this.state = {
            pictureArray: [],
            loading: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const current = this.state.pictureArray
        const prevName = prevProps.picture
        const nextName = this.props.picture
        const prevPage = prevProps.page
        const nextPage = this.props.page

        
        if (prevName !== nextName || prevPage !== nextPage) {

            this.setState({ loading: true })
            
            setTimeout(() => {
                fetch(`https://pixabay.com/api/?key=31702044-2ea23ebf9858467e7c06f0c89&q=${nextName}&page=${nextPage}`)
                    .then(res => res.json())
                    .then(get => get.hits)
                    .then(newArray => {
                        if (newArray.length) {
                            if (prevName !== nextName) {
                                this.setState({ pictureArray: [...newArray] })
                            } else {
                                this.setState({ pictureArray: [...current, ...newArray] })
                            }
                        } else {
                            toast('🦄 there are no pictures that you want.');
                        }
                    })
                    .finally(this.setState({loading: false}))
                
            }, 2000);

        }
    }

    render() {
        return (<section className={css.Section}>
            {this.state.loading && <Blocks />}
            
            {this.state.pictureArray.length && <div className={css.Section}>
                <ul className={css.Gallery}>
                    {this.state.pictureArray.map(({id, webformatURL, largeImageURL, tags }) =>
                        <ImageGalleryItem
                            key={id}
                            samallPicture={webformatURL}
                            largePicture={largeImageURL}
                            name={tags}
                        />
                    )}
                </ul>
                {this.props.children}
            </div>}
        </section>)    
    }
};

ImageGallery.propTypes = {
    children: PropTypes.element.isRequired,
}

export default ImageGallery;