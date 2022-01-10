import debug from 'debug';

const logger = debug('app:service-logger');

export default function serviceLogger(req, res, next) {
	logger(`Service ${req.method} ${req.url} was invoked with` +
		'\nheaders:\n' +
		`${JSON.stringify(req.headers, null, 2)}` +
		'\nand body:\n' +
		`${JSON.stringify(req.body, null, 2)}`
	);
	next();
}
