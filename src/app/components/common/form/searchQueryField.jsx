import React from "react";
import PropTypes from "prop-types";

const SearchQueryField = ({ type, name, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

SearchQueryField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};

export default SearchQueryField;
