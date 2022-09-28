# Installation
1. Create a database
2. Update ./knexfile.js with your connection details & database name
3. Install packages `npm install`
4. Create a .env and fill in the following credentials
PORT=
DB_HOST=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET_KEY=
5. Create a database with the same name as in .env's DB_DATABASE
6. Run migrations `npm run migrate`
7. Run seeds `npm run seed`
8. Start server `npm run dev`
9. Generate a secret key and add to .env's JWT_SECRET_KEY:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"

## Available Endpoints

# User Endpoints

- `POST /users/signup`
Body:
{
    email
    name
    password
}

Response:
{
    message: "Successfully signed up"
}
- `POST /users/login`
Body:
{
    email
    password
}

Response:
{
    message: "Successfully logged in"
    token
}

# Pdf Endpoints


- `GET /pdf`

Request Headers:
{
    Authorization: `Bearer {token}`
}

- `POST /pdf`
Body:

//file in formData format

Response:
{
    message: success
}





