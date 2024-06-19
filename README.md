# Routes

## USER

- POST: api/v1/users/signup

```json
{
  "name": "deep",
  "email": "a2@gmail.com",
  "password": "12345678",
  "passwordConfirm": "12345678"
}
```

- POST: api/v1/users/login

```json
{
  "email": "a1@gmail.com",
  "password": "12345678"
}
```

- POST api/v1/users/forgotPassword

```json
{
  "email": "a1@gmail.com"
}
```

- PATCH api/v1/users/resetPassword/:token

```json
{
  "password": "newPassword",
  "passwordConfirm": "newPassword"
}
```

- PATCH api/v1/users/updateMe

form-data with photo as field name

- GET api/v1/users/me

if you are login you will get about login user

## Admin (user role should Admin)

- GET api/v1/user/
- POST api/v1/user/
- GET api/v1/user/uid
- PATCH api/v1/user/uid
- DELETE api/v1/user/uid

## PRODUCTS

- GET api/v1/products/
- POST api/v1/products/

```json
{
  "name": "tshirt2",
  "price": 300000,
  "description": "this is an tshirt",
  "priceDiscount": 1212,
  "brand": "apple",
  "category": "clothing"
}
```

- GET api/v1/products/id
- PATCH api/v1/products/id

```txt
send the data using both json and form-data
```

- DELETE api/v1/products/id
