import debug from 'debug';

const logger = debug('app:error-logger');

export default function errorLogger(err, req) {
	logger(`${err} in ${req.method} ${req.url} with` +
		'\nheaders:\n' +
		`${JSON.stringify(req.headers, null, 2)}` +
		'\nand body:\n' +
		`${JSON.stringify(req.body, null, 2)}`
	);
}
