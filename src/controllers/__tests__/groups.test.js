import request from 'supertest';
import { app } from '../../index.js';

describe('groups api testing WITHOUT authentication', () => {
	it('returns status code 401 if token not provided', async () => {
		const result = await request(app)
			.get('/groups')
			.send();

		expect(result.statusCode).toEqual(401);
		expect(result.text).toEqual('No token provided');
	});

	it('returns status code 403 if token is wrong', async () => {
		const result = await request(app)
			.get('/groups')
			.set('x-access-token', 'wrong token')
			.send();

		expect(result.statusCode).toEqual(403);
		expect(result.text).toEqual('Failed to authenticate token');
	});
});

describe('groups api testing WITH authentication', () => {
	let testGroupId;
	let token;

	beforeAll(async () => {
		token = await request(app)
			.post('/auth')
			.send({
				username: 'Ivan',
				password: 'pass1'
			});
	});

	it('returns status code 200 if groups list was successfully received', async () => {
		const result = await request(app)
			.get('/groups')
			.set('x-access-token', token.text)
			.send();

		expect(result.statusCode).toEqual(200);
	});

	it('returns status code 200 if group was successfully created', async () => {
		const result = await request(app)
			.post('/groups')
			.set('x-access-token', token.text)
			.send({
				name: 'testGroup',
				permissions: ['READ']
			});

		testGroupId = result.text.substring(result.text.indexOf(':') + 1, result.text.indexOf(','));

		expect(result.statusCode).toEqual(200);
	});

	it('returns status code 200 if group was successfully found by ID', async () => {
		const result = await request(app)
			.get(`/groups/${testGroupId}`)
			.set('x-access-token', token.text)
			.send();

		expect(result.statusCode).toEqual(200);
	});

	it('returns status code 200 if group was successfully updated', async () => {
		const result = await request(app)
			.put(`/groups/${testGroupId}`)
			.set('x-access-token', token.text)
			.send({
				name: 'updatedTestGroup',
				permissions: ['READ']
			});

		expect(result.statusCode).toEqual(200);
	});

	it('returns status code 200 if group was successfully deleted', async () => {
		const result = await request(app)
			.delete(`/groups/${testGroupId}`)
			.set('x-access-token', token.text)
			.send();

		expect(result.statusCode).toEqual(200);
	});
});
