import React from "react";
import PropTypes from 'prop-types';

import css from "./Button.module.css"

const Button = ({ onClick }) => (
    <button type="button" onClick={onClick} className={css.Button}>Load more</button>
);

Button.protoTypes = {
    onClick: PropTypes.func.isRequired
}

export default Button;