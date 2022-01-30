import React, { useEffect, useState } from "react";
// import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.name);
    };

    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Password isRequired")
            .matches(/(?=.*[A-Z])/, "Password isRequired")
            .matches(/(?=.*[0-9])/, "Password must contain at least one number")
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Password must contain one of the special characters !@#$%^&*"
            )
            .matches(
                /(?=.{8,})/,
                "Password must be at least 8 characters long"
            ),
        email: yup
            .string()
            .required("Email isRequired")
            .email("Email entered incorrectly")
    });

    // const validatorConfig = {
    //     email: {
    //         isRequired: { message: "Email isRequired" },
    //         isEmail: { message: "Email entered incorrectly" }
    //     },
    //     password: {
    //         isRequired: { message: "Password isRequired" },
    //         isCapitalSymbol: {
    //             message: "Password must contain at least one uppercase letter"
    //         },
    //         isContainDigit: {
    //             message: "Password must contain at least one number"
    //         },
    //         min: {
    //             message: "Password must be at least 8 characters long",
    //             value: 8
    //         }
    //     }
    // };

    useEffect(() => {
        console.log(errors);
        validate();
    }, [data]);

    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((error) => setErrors({ [error.path]: error.message }));
        // setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                name="stayOn"
                onChange={handleChange}
                value={data.stayOn}
            >
                <a>Stay logged in</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
