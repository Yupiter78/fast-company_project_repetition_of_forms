export function validator(data, config) {
    const errors = {};

    function validate(validateMethod, data, config) {
        switch (validateMethod) {
            case "isRequired":
                if (data.trim() === "") return config.message;
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                if (!emailRegExp.test(data)) return config.message;
                break;
            }
            default:
                break;
        }
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                console.log("error:", error);
                errors[fieldName] = error;
            }
        }
    }
    console.log("errors.length:", Object.keys(errors).length);
    return errors;
}
