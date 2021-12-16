import React from "react";
import Select from "react-select/base";
import PropTypes from "prop-types";

const MultiSelectField = (options, onChange) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  _id: options[optionName]._id
              }))
            : options;
    return (
        <Select
            isMulti
            options={optionsArray}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChange}
        />
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func
};

export default MultiSelectField;
