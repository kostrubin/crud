function errorHandler(schemaErrors) {
	const errors = schemaErrors.map(err => {
		const { path, message } = err;

		return { path, message };
	});

	return {
		status: 'failed',
		errors
	};
}

function validate(schema) {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, {
			abortEarly: false
		});

		if (error) {
			res
				.status(400)
				.json(errorHandler(error.details));
		} else {
			return next();
		}
	};
}

export { validate };
