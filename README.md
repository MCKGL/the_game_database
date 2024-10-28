# The Game Database API

The Game Database API is a RESTful API designed to manage and provide information about video games. Built with Node.js 
and MongoDB, it offers functionalities for creating, updating, retrieving, and deleting video game records.

Note: This API is developed for practice purposes and is a work in progress. It is subject to improvements and enhancements.

# Installation

1. Clone the repository
2. Install the dependencies
3. Create a `.env` file in the root directory and add the following environment variables:
DB_URL=your_mongodb_url 
JWT_PRIVATE_KEY=path_to_private_key
JWT_PUBLIC_KEY=path_to_public_key
4. Refer to the Token Authentication section for instructions on creating the private and public keys 
5. Run the server using `pnpm start`
6. The server will run on `http://localhost:3000`
7. You can access the API documentation at ... (TODO)

# Token Authentication

The API uses JSON Web Tokens (JWT) for authentication.
When a user logs in, they receive a JWT token and a CSRF token. The JWT token is signed with a private key and includes 
the user ID and CSRF token. The CSRF token is a random string generated to prevent Cross-Site Request Forgery (CSRF) 
attacks. The CSRF token is stored in the user's session and is sent with each request as a header. 
The JWT token is sent in a cookie, with the `HttpOnly` and `Secure` flags set to `true`. This ensures that the token is
not accessible to JavaScript and is only sent over HTTPS.

To create the private and public keys, you can use the following commands:
```bash
openssl genpkey -algorithm RSA -out private_key.pem -aes256
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

# Improvements

Many improvements can be made to the API. Some of the possible I can think of are:
- It will be nice to have the possibility to search for games by multiple attributes (date, editor, developer, etc.)
- Improve the lists : add a description, a cover, a date, a type (public, private, etc.)
- Improve the answer of the API : add a pagination, a limit, a sort, etc.
- Some refactoring can be done to improve the code quality and maintainability
- Improve the security of the API (params vs body, etc.)
- Add more tests to cover more scenarios
- Add Swagger documentation on all the endpoints (not only on the games and users endpoints)
- Add more functionalities to the API (reviews, ratings, etc.)