module.exports = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            errors: {
                wrap: {
                    label: "",
                },
            },
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};
