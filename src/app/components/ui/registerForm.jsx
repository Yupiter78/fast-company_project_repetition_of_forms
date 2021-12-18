import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        gender: "male",
        qualities: [],
        license: false
    });
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const handleChange = (target) => {
        console.log("target:", target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: { message: "Email isRequired" },
            isEmail: { message: "Email entered incorrectly" }
        },
        password: {
            isRequired: { message: "Password isRequired" },
            isCapitalSymbol: {
                message: "Password must contain at least one uppercase letter"
            },
            isContainDigit: {
                message: "Password must contain at least one number"
            },
            min: {
                message: "Password must be at least 8 characters long",
                value: 8
            }
        },
        profession: {
            isRequired: { message: "Be sure to choose your profession" }
        },
        license: {
            isRequired: {
                message:
                    "You cannot use our service without confirming the license agreement"
            }
        }
    };

    useEffect(() => {
        console.log(errors);
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
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
            <SelectField
                label="Profession"
                name="profession"
                value={data.profession}
                defaultOption="Choose..."
                onChange={handleChange}
                options={professions}
                error={errors.profession}
            />
            <RadioField
                label="Gender"
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.gender}
                name="gender"
                onChange={handleChange}
            />
            <MultiSelectField
                options={qualities}
                defaultValue={data.qualities}
                onChange={handleChange}
                name="qualities"
                label="Choose your qualities"
            />
            <CheckBoxField
                name="license"
                onChange={handleChange}
                value={data.license}
                error={errors.license}
            >
                <a>Confirm the license agreement</a>
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

export default RegisterForm;
