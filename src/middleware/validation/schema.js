import Joi from 'joi';

const schema = Joi.object({
	login: Joi.string()
		.alphanum()
		.required(),

	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]+$'))
		.required(),

	age: Joi.number()
		.integer()
		.min(4)
		.max(130)
		.required()
});

export { schema };
