import { Component } from "react";
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

class Searchbar extends Component {
    constructor() {
        super();

        this.state = {
            picture: ""
        }
    }

    handleChange = evt => {
        this.setState({picture: evt.target.value.toLowerCase()})
    }

    handleSubmit = evt => {
        evt.preventDefault();
        
        if (this.state.picture.trim() === '') {
            toast('🦄 Write down picture that you want.');
        }

        this.props.onSubmit(this.state.picture);
    }

    render() {
        const{ picture } = this.state;

        return <header className={css.Searchbar}>
            <form className={css.Form} onSubmit={this.handleSubmit}>
                <button type="submit" className={css.Button}>
                    <span className="button-label">Search</span>
                </button>

                <input
                    className={css.Input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={picture}
                    onChange={this.handleChange}
                />
            </form>
        </header>
    }
}

export default Searchbar;