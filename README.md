# CRUD service for users
Run the following command to build the project:
```
npm run build
```
Run the following command to run the server:
```
npm run start
```
## API description
Use the following endpoint to get all users:
```
GET /users
```
To get specified user:
```
GET /users/:id
```
To search with a substring:
```
GET /users/search?loginSubstring=a&limit=1
```
To create a new user:
```
POST /users
body with login, password and age in JSON is required
```
To update some user:
```
PUT /users/:id
body with login, password and age in JSON is required
```
To delete some user:
```
DELETE /users/:id
```
