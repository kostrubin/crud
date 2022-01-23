import request from 'supertest';
import { app } from '../../index.js';

describe('users api testing WITHOUT authentication', () => {
	it('returns status code 401 if token not provided', async () => {
		const result = await request(app)
			.get('/users')
			.send();

		expect(result.statusCode).toEqual(401);
		expect(result.text).toEqual('No token provided');
	});

	it('returns status code 403 if token is wrong', async () => {
		const result = await request(app)
			.get('/users')
			.set('x-access-token', 'wrong token')
			.send();

		expect(result.statusCode).toEqual(403);
		expect(result.text).toEqual('Failed to authenticate token');
	});
});

describe('users api testing WITH authentication', () => {
	let testUserId;
	let token;

	beforeAll(async () => {
		token = await request(app)
			.post('/auth')
			.send({
				username: 'Ivan',
				password: 'pass1'
			});
	});

	it('returns status code 200 if users list was successfully received', async () => {
		const result = await request(app)
			.get('/users')
			.set('x-access-token', token.text)
			.send();

		expect(result.statusCode).toEqual(200);
	});

	it('returns status code 200 if user was successfully created', async () => {
		const result = await request(app)
			.post('/users')
			.set('x-access-token', token.text)
			.send({
				login: 'testUser',
				password: 'testPassword',
				age: 42
			});

		expect(result.statusCode).toEqual(200);
	});

	it('returns status code 200 if user was successfully found by substring', async () => {
		const result = await request(app)
			.get('/users/search?loginSubstring=test&limit=1')
			.set('x-access-token', token.text)
			.send();

		testUserId = result.text.substring(result.text.indexOf(':') + 1, result.text.indexOf(','));

		expect(result.statusCode).toEqual(200);
	});

	it('returns status code 200 if user was successfully found by ID', async () => {
		const result = await request(app)
			.get(`/users/${testUserId}`)
			.set('x-access-token', token.text)
			.send();

		expect(result.statusCode).toEqual(200);
	});

	it('returns status code 200 if user was successfully updated', async () => {
		const result = await request(app)
			.put(`/users/${testUserId}`)
			.set('x-access-token', token.text)
			.send({
				login: 'updatedTestUser',
				password: 'updatedTestPassword',
				age: 25
			});

		expect(result.statusCode).toEqual(200);
	});

	it('returns status code 200 if user was successfully deleted', async () => {
		const result = await request(app)
			.delete(`/users/${testUserId}`)
			.set('x-access-token', token.text)
			.send();

		expect(result.statusCode).toEqual(200);
	});
});
