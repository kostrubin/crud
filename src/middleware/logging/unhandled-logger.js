import debug from 'debug';

const logger = debug('app:unhandled-logger');

export default function unhandledLogger(err, p) {
	if (p) {
		logger(`${err}, Unhandled Rejection at Promise, ${p}`);
	} else {
		logger(`${err}, Uncaught Exception thrown`);
	}
}
