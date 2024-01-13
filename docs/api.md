# API References

This page lists all the API endpoints that are currently available in the project. The API endpoints are grouped by
their respective scopes.
Scopes are used to determine the access level of the API endpoint. For example, an API endpoint with the scope `Public`
can be accessed by anyone,
whereas an API endpoint with the scope `Private` can only be accessed by a logged-in user. Also, only `GET` and `POST`
requests are used for
this project.

Every API receives a JSON object as its request body and returns a JSON object as its response body. The request body is
used to pass the
required parameters to the API and the response body is used to return the result of the API call. The response body
will always contain
a `status` field, which will be either `success` or `error`. If the status is `success`, then the API call was
successful, and the response
body will contain the result of the API call. If the status is `error`, then the API call was unsuccessful, and the
response body will contain
the error message.

## Available API Endpoints

Below are the API endpoints that are currently available in v1:

**Primary symbols** used in the table below:

| API Endpoint Name                                                            | Type   | Scope     |
|------------------------------------------------------------------------------|--------|-----------|
| [`auth.ForgotPasswordAPI`](#authforgotpasswordapi)                           | `POST` | `Public`  |
| [`auth.GetPublicProfile`](#authgetpublicprofileapi)                          | `POST` | `Public`  |
| [`auth.OAuth`](#authoauthapi)                                                | `POST` | `Public`  |
| [`auth.RetrieveCache`](#authretrievecacheapi)                                | `POST` | `Private` |
| [`auth.SignInAPI`](#authsigninapi)                                           | `POST` | `Public`  |
| [`events.GetAllEventsAPI`](#eventsgetalleventsapi)                           | `GET`  | `Private` |
| [`events.GetLatestEvent`](#eventsgetlatesteventapi)                          | `GET`  | `Private` |
| [`events.GetOneEventsAPI`](#eventsgetoneeventapi)                            | `POST` | `Private` |
| [`events.RegisterEventAPI`](#eventsregistereventapi)                         | `POST` | `Private` |
| [`farms.GetFarmsAPI`](#farmsgetfarmsapi)                                     | `GET`  | `Private` |
| [`farms.GetAllVetAPI`](#farmsgetallvetapi)                                   | `GET`  | `Private` |
| [`farms.GetHealthTrackAPI`](#farmsgethealthtrackapi)                         | `GET`  | `Private` |
| [`farms.AddProductAPI`](#farmsaddproductapi)                                 | `POST` | `Private` |
| [`farms.GetCategoryProducts`](#farmsgetcategoryproductsapi)                  | `POST` | `Private` |
| [`farms.GetInstallmentsAPI`](#farmsgetinstallmentsapi)                       | `POST` | `Private` |
| [`farms.GetOneFarmAPI`](#farmsgetonefarmapi)                                 | `POST` | `Private` |
| [`farms.GetOneFarmProductsAPI`](#farmsgetonefarmproductsapi)                 | `POST` | `Private` |
| [`farms.GetProductInfoAPI`](#farmsgetproductinfoapi)                         | `POST` | `Private` |
| [`farms.PlaceOrderAPI`](#farmsplaceorderapi)                                 | `POST` | `Private` |
| [`farms.GetProductCatalogAPI`](#farmsgetproductcatalogapi)                   | `POST` | `Private` |
| [`forum.GetAllPostAPI`](#forumgetallpostapi)                                 | `GET`  | `Private` |
| [`forum.GetMostLikedPostsAPI`](#forumgetmostlikedpostsapi)                   | `GET`  | `Private` |
| [`forum.GetOnePostAPI`](#forumgetonepostapi)                                 | `POST` | `Private` |
| [`forum.IncrementViewCountAPI`](#forumincrementviewcountapi)                 | `POST` | `Private` |
| [`forum.InsertPostAPI`](#foruminsertpostapi)                                 | `POST` | `Private` |
| [`forum.SendReplyAPI`](#forumsendreplyapi)                                   | `POST` | `Private` |
| [`forum.UpvotePostAPI`](#forumupvotepostapi)                                 | `POST` | `Private` |
| [`marketplace.getAllProductsmarketAPI`](#marketplacegetallproductsmarketapi) | `GET`  | `Private` |
| [`news.GetAllNewsAPI`](#newsgetallnewsapi)                                   | `GET`  | `Private` |
| [`news.GetOneNewsAPI`](#newsgetonenewsapi)                                   | `POST` | `Private` |
| [`news.SaveNewsAPI`](#newssavenewsapi)                                       | `POST` | `Private` |
| [`misc.GetNotificationAPI`](#miscgetnotificationapi)                         | `POST` | `Private` |
| [`misc.SavedItemsAPI`](#miscsaveditemsapi)                                   | `POST` | `Private` |
| [`misc.SearchAllAPI`](#miscsearchallapi)                                     | `POST` | `Private` |


## Definitions

Below are the definitions of each API endpoint:

## `auth.ForgotPasswordAPI`
This API endpoint is responsible for initiating the password reset process for a user. It receives a JSON object in the request body containing the user's email address and a turnstile token for validation.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/auth/ForgotPasswordAPI`

**Request Body**

```json
{
   "email": "user@example.com",
   "turnstile_token": "example_turnstile_token"
}
```

- `email` (string): The email address of the user requesting a password reset.
- `turnstile_token` (string): A turnstile token used for validation.

**Response**

The API responds with an appropriate status code and an empty body.

- Status Code 200: Password reset initiated successfully. An email containing the password reset link will be sent to the user.
- Status Code 401: Unauthorized. The provided turnstile token is invalid.
- Status Code 500: Internal Server Error. This could occur if there's an issue with token generation, database insertion, or email sending.

**Processing Steps**

1. **Turnstile Token Validation**: The received turnstile token is validated using the cfTurnstileValidation function.
   If
   the token is invalid, the API returns a 401 Unauthorized response.
2. **Email and Token Extraction**: The email address and turnstile token are extracted from the request body.
3. **Token Generation**: A unique reset token is generated using the resetTokenGenerator function.
4. **Token Insertion into Database**: The generated reset token is inserted into the database using the
   `DatabaseAccount.insertResetPasswordToken` function. If the insertion is successful, the process continues.
   Otherwise,
   a 500 Internal Server Error response is returned.
5. **Email Sending**: An email is sent to the user containing a link for password reset. The link includes the generated
   reset token. The actual link is formed as: `https://agriinn.vercel.app/sign-in/forgot-password/{reset_token}`. The
   email is sent using the sendMail function.
6. **Response**: If the email is sent successfully, the API returns a 200 OK response. If the email does not exist in
   the
   database, a 500 Internal Server Error response is returned.

---

## `auth.GetPublicProfileAPI`

This API endpoint is responsible for retrieving the public profile of a user. It receives a JSON object in the request
body containing the user's _id, username, or email.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/auth/GetPublicProfileAPI`

**Request Body**

```json
{
   "_id": "user_id",
   "username": "user_username",
   "email": "user@example.com"
}
```

- `_id` (string): The unique identifier of the user whose public profile is being requested.
- `username` (string): The username of the user whose public profile is being requested.
- `email` (string): The email address of the user whose public profile is being requested.

**Response**

The API responds with an appropriate status code and a JSON object containing the public profile of the user.

- Status Code 200: Public profile retrieved successfully. The response body contains the public profile of the user.
- Status Code 404: Not Found. The user does not exist.

**Processing Steps**

1. **Request Body Extraction**: The _id, username, and email are extracted from the request body.
2. **Public Profile Retrieval**: The `DatabaseAccount.getPublicProfile` function is called with the extracted _id,
   username, and email to retrieve the public profile of the user.
3. **Response**: If the public profile is retrieved successfully, the API returns a 200 OK response with the public
   profile in the response body. If the user does not exist, a 404 Not Found response is returned.

---

## `auth.OAuthAPI`

This API endpoint is responsible for handling Google OAuth2.0 requests for user authentication. It receives a code from
Google's OAuth2.0 server, which is then exchanged for an access token. The access token is used to fetch the user's
details from Google's server.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/auth/OAuthAPI`

**Processing Steps**

1. **OAuth2.0 Request Reception**: The API receives a request from Google's OAuth2.0 server containing a code.
2. **Access Token Generation**: The code is exchanged for an access token using Google's OAuth2.0 client.
3. **User Details Fetching**: The access token is used to fetch the user's details from Google's server.
4. **User Existence Check**: The API checks if the user already exists in the database.
5. **Existing User Handling**: If the user exists, their Google ID is updated (if necessary), a session token is
   generated, and the user is redirected to the dashboard.
6. **New User Handling**: If the user does not exist, a new user object is created and inserted into the database. The
   user's profile picture is downloaded and uploaded to Supabase Storage. The profile picture URL is updated in the
   database. An encrypted ID is generated and the user is redirected to the Google sign-in page.

**Response**

The API does not directly respond with a status code and body. Instead, it redirects the user to the appropriate page
based on whether the user exists in the database or not.

- Redirect to Dashboard: If the user exists in the database, a session token is set in the cookies and the user is
  redirected to the dashboard.
- Redirect to Google Sign-In: If the user does not exist in the database, an encrypted ID is set in the cookies and the
  user is redirected to the Google sign-in page.

---

## `auth.RetrieveCacheAPI`

This API endpoint is responsible for retrieving the cache data of a user. It receives a JSON object in the request body
containing the user's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/auth/RetrieveCacheAPI`

**Request Body**

```json
{
   "_id": "user_id"
}
```

- `_id` (string): The unique identifier of the user whose cache data is being requested.

**Processing Steps**

1. **Request Body Extraction**: The _id is extracted from the request body.
2. **Cache Data Retrieval**: The `DatabaseAccount.getUserCache` function is called with the extracted _id to retrieve
   the cache data of the user.

**Response**

The API responds with an appropriate status code and a JSON object containing the cache data of the user.

- Status Code 200: Cache data retrieved successfully. The response body contains the cache data of the user.
- Status Code 404: Not Found. The user does not exist or there is no cache data for the user.

---

## `auth.SignInAPI`

This API endpoint is responsible for authenticating users. It receives a JSON object in the request body containing the
user's key (username or email) and password.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/auth/SignInAPI`

**Request Body**

```json
{
   "key": "user_key",
   "password": "user_password"
}
```

- `key` (string): The username or email of the user trying to authenticate.
- `password` (string): The password of the user trying to authenticate.

**Processing Steps**

1. **Request Body Extraction**: The key and password are extracted from the request body.
2. **User Retrieval**: The `DatabaseAccount.getUserAccount` function is called with the extracted key to retrieve the
   user's account.
3. **Password Verification**: The provided password is compared with the stored password hash using the `bcrypt.compare`
   function.
4. **Token Generation and Response**: If the password is correct, a session token is generated using the `generateToken`
   function. The token is set in the cookies and the user's details are returned in the response body.

**Response**

The API responds with an appropriate status code and a JSON object containing the user's details if the authentication
is successful.

- Status Code 200: Authentication successful. The response body contains the user's details and a session token is set
  in the cookies.
- Status Code 401: Unauthorized. The provided key or password is incorrect.
- Status Code 404: Not Found. The user does not exist.

---

## `events.GetAllEventsAPI`

This API endpoint is responsible for retrieving all events. It does not require any request body.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/events/GetAllEventsAPI`

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Events Retrieval**: The `DatabaseEvent.getAllEvents` function is called to retrieve all events.

**Response**

The API responds with an appropriate status code and a JSON array containing all events.

- Status Code 200: All events retrieved successfully. The response body contains a JSON array of all events.
- Status Code 404: Not Found. There are no events in the database.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `events.GetLatestEventAPI`

This API endpoint is responsible for retrieving the latest event. It does not require any request body.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/GetLatestEventAPI`

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Latest Event Retrieval**: The `DatabaseEvent.getLatestEvent` function is called to retrieve the latest event.

**Response**

The API responds with an appropriate status code and a JSON object containing the latest event.

- Status Code 200: Latest event retrieved successfully. The response body contains the latest event.
- Status Code 404: Not Found. There are no events in the database.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `events.GetOneEventAPI`

This API endpoint is responsible for retrieving a specific event. It receives a JSON object in the request body
containing the event's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/GetOneEventAPI`

**Request Body**

```json
{
   "_id": "event_id"
}
```

- `_id` (string): The unique identifier of the event being requested.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The _id is extracted from the request body.
3. **Event Retrieval**: The `DatabaseEvent.getOneEvent` function is called with the extracted _id to retrieve the
   specific event.

**Response**

The API responds with an appropriate status code and a JSON object containing the event.

- Status Code 200: Event retrieved successfully. The response body contains the event.
- Status Code 404: Not Found. The event does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `events.RegisterEventAPI`

This API endpoint is responsible for registering an event. It receives a JSON object in the request body containing the
event's _id and the farm_id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/RegisterEventAPI`

**Request Body**

```json
{
   "event_id": "event_id",
   "farm_id": "farm_id"
}
```

- `event_id` (string): The unique identifier of the event being registered.
- `farm_id` (string): The unique identifier of the farm where the event is being registered.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The event_id and farm_id are extracted from the request body.
3. **Event Registration**: The `DatabaseEvent.updateOneEvent` function is called with the extracted event_id and farm_id
   to register the event.

**Response**

The API responds with an appropriate status code and a JSON object containing the registered event.

- Status Code 200: Event registered successfully. The response body contains the registered event.
- Status Code 404: Not Found. The event does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.GetFarmsAPI`

This API endpoint is responsible for retrieving all farms. It does not require any request body.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/farms/GetFarmsAPI`

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Farms Retrieval**: The `DatabaseFarm.getAllFarms` function is called to retrieve all farms.

**Response**

The API responds with an appropriate status code and a JSON array containing all farms.

- Status Code 200: All farms retrieved successfully. The response body contains a JSON array of all farms.
- Status Code 404: Not Found. There are no farms in the database.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.GetAllVetAPI`

This API endpoint is responsible for retrieving all vets. It does not require any request body.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/GetAllVetAPI`

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Vets Retrieval**: The `DatabaseForum.getAllVets` function is called to retrieve all vets.

**Response**

The API responds with an appropriate status code and a JSON array containing all vets.

- Status Code 200: All vets retrieved successfully. The response body contains a JSON array of all vets.
- Status Code 404: Not Found. There are no vets in the database.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.GetHealthTrackAPI`

This API endpoint is responsible for retrieving all health track records. It does not require any request body.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/farms/GetHealthTrackAPI`

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Health Track Retrieval**: The `Database.getHealthTrack` function is called to retrieve all health track records.

**Response**

The API responds with an appropriate status code and a JSON array containing all health track records.

- Status Code 200: All health track records retrieved successfully. The response body contains a JSON array of all
  health track records.
- Status Code 404: Not Found. There are no health track records in the database.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.AddProductAPI`

This API endpoint is responsible for adding a product to a farm. It receives a JSON object in the request body
containing the product details and the farm's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/farms/AddProductAPI`

**Request Body**

```json
{
   "product": {
      "name": "product_name",
      "description": "product_description",
      "price": "product_price"
   },
   "farm_id": "farm_id"
}
```

- `product` (object): The product details to be added.
   - `name` (string): The name of the product.
   - `description` (string): The description of the product.
   - `price` (string): The price of the product.
- `farm_id` (string): The unique identifier of the farm where the product is being added.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The product and farm_id are extracted from the request body.
3. **Product Addition**: The `DatabaseFarm.addProduct` function is called with the extracted product and farm_id to add
   the product to the farm.

**Response**

The API responds with an appropriate status code and a JSON object containing the added product.

- Status Code 200: Product added successfully. The response body contains the added product.
- Status Code 404: Not Found. The farm does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.GetCategoryProductsAPI`

This API endpoint is responsible for retrieving products of a specific category from a farm. It receives a JSON object
in the request body containing the product category and the farm's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/farms/GetCategoryProductsAPI`

**Request Body**

```json
{
   "product_category": "product_category",
   "farm_id": "farm_id"
}
```

- `product_category` (string): The category of the products being requested.
- `farm_id` (string): The unique identifier of the farm from where the products are being requested.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The product_category and farm_id are extracted from the request body.
3. **Product Retrieval**: The `DatabaseFarm.getCategoryProduct` function is called with the extracted product_category
   and farm_id to retrieve the specific products.

**Response**

The API responds with an appropriate status code and a JSON object containing the products.

- Status Code 200: Products retrieved successfully. The response body contains the products.
- Status Code 404: Not Found. The products do not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.GetInstallmentsAPI`

This API endpoint is responsible for retrieving all installments of a user. It receives a JSON object in the request
body containing the user's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/farms/GetInstallmentsAPI`

**Request Body**

```json
{
   "_id": "user_id"
}
```

- `_id` (string): The unique identifier of the user whose installments are being requested.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The _id is extracted from the request body.
3. **Installments Retrieval**: The `DatabaseFarm.getInstallments` function is called with the extracted _id to retrieve
   the installments of the user.

**Response**

The API responds with an appropriate status code and a JSON object containing the installments.

- Status Code 200: Installments retrieved successfully. The response body contains the installments.
- Status Code 404: Not Found. The user does not exist or there are no installments for the user.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.GetOneFarmAPI`

This API endpoint is responsible for retrieving a specific farm. It receives a JSON object in the request body
containing the farm's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/farms/GetOneFarmAPI`

**Request Body**

```json
{
   "_id": "farm_id"
}
```

- `_id` (string): The unique identifier of the farm being requested.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The _id is extracted from the request body.
3. **Farm Retrieval**: The `DatabaseFarm.getOneFarm` function is called with the extracted _id to retrieve the specific
   farm.

**Response**

The API responds with an appropriate status code and a JSON object containing the farm.

- Status Code 200: Farm retrieved successfully. The response body contains the farm.
- Status Code 404: Not Found. The farm does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.GetOneFarmProductsAPI`

This API endpoint is responsible for retrieving all products of a specific farm. It receives a JSON object in the
request body containing the farm's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/farms/GetOneFarmProductsAPI`

**Request Body**

```json
{
   "_id": "farm_id"
}
```

- `_id` (string): The unique identifier of the farm whose products are being requested.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The _id is extracted from the request body.
3. **Product Retrieval**: The `DatabaseFarm.getOneFarmProducts` function is called with the extracted _id to retrieve
   the products of the specific farm.

**Response**

The API responds with an appropriate status code and a JSON object containing the products.

- Status Code 200: Products retrieved successfully. The response body contains the products.
- Status Code 404: Not Found. The farm does not exist or there are no products for the farm.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.GetProductInfoAPI`

This API endpoint is responsible for retrieving information about a specific product. It receives a JSON object in the
request body containing the product's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/farms/GetProductInfoAPI`

**Request Body**

```json
{
   "_id": "product_id"
}
```

- `_id` (string): The unique identifier of the product whose information is being requested.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The _id is extracted from the request body.
3. **Product Information Retrieval**: The `DatabaseFarm.getOneProduct` function is called with the extracted _id to
   retrieve the information of the specific product.

**Response**

The API responds with an appropriate status code and a JSON object containing the product information.

- Status Code 200: Product information retrieved successfully. The response body contains the product information.
- Status Code 404: Not Found. The product does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.PlaceOrderAPI`

This API endpoint is responsible for placing an order for a specific product from a farm. It receives a JSON object in
the request body containing the product's _id, the quantity of the product, and the user's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/farms/PlaceOrderAPI`

**Request Body**

```json
{
   "product_id": "product_id",
   "quantity": "quantity",
   "user_id": "user_id"
}
```

- `product_id` (string): The unique identifier of the product being ordered.
- `quantity` (number): The quantity of the product being ordered.
- `user_id` (string): The unique identifier of the user placing the order.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The product_id, quantity, and user_id are extracted from the request body.
3. **Order Placement**: The `DatabaseFarm.placeOrder` function is called with the extracted product_id, quantity, and
   user_id to place the order.

**Response**

The API responds with an appropriate status code and a JSON object containing the order details.

- Status Code 200: Order placed successfully. The response body contains the order details.
- Status Code 404: Not Found. The product does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `farms.GetProductCatalogAPI`

This API endpoint is responsible for retrieving the product catalog of a specific farm. It receives a JSON object in the
request body containing the farm's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/farms/GetProductCatalogAPI`

**Request Body**

```json
{
   "_id": "farm_id"
}
```

- `_id` (string): The unique identifier of the farm whose product catalog is being requested.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The _id is extracted from the request body.
3. **Product Catalog Retrieval**: The `DatabaseFarm.getProductCatalog` function is called with the extracted _id to
   retrieve the product catalog of the specific farm.

**Response**

The API responds with an appropriate status code and a JSON object containing the product catalog.

- Status Code 200: Product catalog retrieved successfully. The response body contains the product catalog.
- Status Code 404: Not Found. The farm does not exist or there is no product catalog for the farm.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `forum.GetAllPostAPI`
This API endpoint is responsible for retrieving all posts. It does not require any request body.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/forum/GetAllPostAPI`

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not verified, it returns a 401 Unauthorized response.
2. **Posts Retrieval**: The `DatabaseForum.getAllPosts` function is called to retrieve all posts.

**Response**

The API responds with an appropriate status code and a JSON array containing all posts.

- Status Code 200: All posts retrieved successfully. The response body contains a JSON array of all posts.
- Status Code 404: Not Found. There are no posts in the database.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `forum.GetMostLikedPostsAPI`
This API endpoint is responsible for retrieving the most liked posts. It does not require any request body.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/forum/GetMostLikedPostsAPI`

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not verified, it returns a 401 Unauthorized response.
2. **Most Liked Posts Retrieval**: The `DatabaseForum.getMostLikedPosts` function is called to retrieve the most liked posts.

**Response**

The API responds with an appropriate status code and a JSON array containing the most liked posts.

- Status Code 200: Most liked posts retrieved successfully. The response body contains a JSON array of the most liked posts.
- Status Code 404: Not Found. There are no posts in the database.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `forum.GetOnePostAPI`
This API endpoint is responsible for retrieving a specific post. It receives a JSON object in the request body containing the post's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/forum/GetOnePostAPI`

**Request Body**

```json
{
   "_id": "post_id"
}
```

- `_id` (string): The unique identifier of the post being requested.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The _id is extracted from the request body.
3. **Post Retrieval**: The `DatabaseForum.getOnePost` function is called with the extracted _id to retrieve the specific post.

**Response**

The API responds with an appropriate status code and a JSON object containing the post.

- Status Code 200: Post retrieved successfully. The response body contains the post.
- Status Code 404: Not Found. The post does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `forum.IncrementViewCountAPI`
This API endpoint is responsible for incrementing the view count of a specific post. It receives a JSON object in the request body containing the post's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/forum/IncrementViewCountAPI`

**Request Body**

```json
{
   "_id": "post_id"
}
```

- `_id` (string): The unique identifier of the post whose view count is being incremented.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The _id is extracted from the request body.
3. **View Count Increment**: The `DatabaseForum.incrementViewCount` function is called with the extracted _id to increment the view count of the specific post.

**Response**

The API responds with an appropriate status code and a JSON object containing the success status.

- Status Code 200: View count incremented successfully. The response body contains the success status.
- Status Code 404: Not Found. The post does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `forum.InsertPostAPI`
This API endpoint is responsible for inserting a new post. It receives a JSON object in the request body containing the post details.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/forum/InsertPostAPI`

**Request Body**

```json
{
   "title": "post_title",
   "content": "post_content",
   "author": "post_author"
}
```

- `title` (string): The title of the post.
- `content` (string): The content of the post.
- `author` (string): The author of the post.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The post details are extracted from the request body.
3. **Post Insertion**: The `DatabaseForum.insertPost` function is called with the extracted post details to insert the new post.

**Response**

The API responds with an appropriate status code and a JSON object containing the success status.

- Status Code 200: Post inserted successfully. The response body contains the success status.
- Status Code 404: Not Found. The post could not be inserted.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `forum.SendReplyAPI`
This API endpoint is responsible for sending a reply to a specific post. It receives a JSON object in the request body containing the reply details.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/forum/SendReplyAPI`

**Request Body**

```json
{
   "post_id": "post_id",
   "user_id": "user_id",
   "content": "reply_content"
}
```

- `post_id` (string): The unique identifier of the post to which the reply is being sent.
- `user_id` (string): The unique identifier of the user sending the reply.
- `content` (string): The content of the reply.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The reply details are extracted from the request body.
3. **Reply Insertion**: The `DatabaseForum.insertReplyInPost` function is called with the extracted reply details to insert the reply into the specific post.

**Response**

The API responds with an appropriate status code and a JSON object containing the success status.

- Status Code 200: Reply sent successfully. The response body contains the success status.
- Status Code 404: Not Found. The post does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `forum.UpvotePostAPI`
This API endpoint is responsible for upvoting a specific post. It receives a JSON object in the request body containing the post's _id, the liker's _id, and a boolean indicating whether the liker has already liked the post.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/forum/UpvotePostAPI`

**Request Body**

```json
{
   "postObjectID": "post_id",
   "likerObjectID": "liker_id",
   "alreadyLiked": "already_liked"
}
```

- `postObjectID` (string): The unique identifier of the post being upvoted.
- `likerObjectID` (string): The unique identifier of the user who is liking the post.
- `alreadyLiked` (boolean): A boolean indicating whether the user has already liked the post.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The postObjectID, likerObjectID, and alreadyLiked are extracted from the request body.
3. **Post Upvoting**: The `DatabaseForum.votePost` function is called with the extracted postObjectID, likerObjectID, and alreadyLiked to upvote the specific post.

**Response**

The API responds with an appropriate status code and a JSON object containing the success status.

- Status Code 200: Post upvoted successfully. The response body contains the success status.
- Status Code 404: Not Found. The post does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `marketplace.GetAllProductsMarketAPI`

This API endpoint is responsible for retrieving all products from the marketplace. It does not require any request body.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/marketplace/GetAllProductsMarketAPI`

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Product Retrieval**: The `DatabaseOthers.getAllProducts` function is called to retrieve all products from the
   marketplace.

**Response**

The API responds with an appropriate status code and a JSON object containing the products information.

- Status Code 200: Products retrieved successfully. The response body contains the products information.
- Status Code 404: Not Found. No products exist in the marketplace.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `news.GetAllNewsAPI`

This API endpoint is responsible for retrieving all news. It does not require any request body.

- **Version:** `1.0`
- **Method:** `GET`
- **Endpoint:** `/news/GetAllNewsAPI`

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **News Retrieval**: The `DatabaseNews.getAllNews` function is called to retrieve all news.

**Response**

The API responds with an appropriate status code and a JSON object containing the news information.

- Status Code 200: News retrieved successfully. The response body contains the news information.
- Status Code 404: Not Found. No news exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `news.GetOneNewsAPI`

This API endpoint is responsible for retrieving a specific news item. It receives a JSON object in the request body
containing the news item's _id and news_uid.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/news/GetOneNewsAPI`

**Request Body**

```json
{
   "_id": "news_id",
   "news_uid": "news_uid"
}
```

- `_id` (string): The unique identifier of the news item being retrieved.
- `news_uid` (string): The unique user identifier associated with the news item.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The _id and news_uid are extracted from the request body.
3. **News Retrieval**: The `DatabaseNews.getOneNews` function is called with the extracted _id and news_uid to retrieve
   the specific news item.

**Response**

The API responds with an appropriate status code and a JSON object containing the news information.

- Status Code 200: News retrieved successfully. The response body contains the news information.
- Status Code 404: Not Found. The news item does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `news.saveNewsAPI`

This API endpoint is responsible for saving a news item. It receives a JSON object in the request body containing the
news item's _id and the user's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/news/saveNewsAPI`

**Request Body**

```json
{
   "news_id": "news_id",
   "user_id": "user_id"
}
```

- `news_id` (string): The unique identifier of the news item being saved.
- `user_id` (string): The unique identifier of the user who is saving the news item.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The news_id and user_id are extracted from the request body.
3. **News Saving**: The `DatabaseNews.saveNews` function is called with the extracted user_id and news_id to save the
   specific news item.

**Response**

The API responds with an appropriate status code and a JSON object containing the success status.

- Status Code 200: News saved successfully. The response body contains the success status.
- Status Code 404: Not Found. The news item does not exist.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `misc.GetNotificationAPI`

This API endpoint is responsible for retrieving notifications for a specific user. It receives a JSON object in the
request body containing the user's username.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/API/v1/GetNotificationAPI`

**Request Body**

```json
{
   "username": "username"
}
```

- `username` (string): The unique identifier of the user whose notifications are being retrieved.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The username is extracted from the request body.
3. **Notification Retrieval**: The `DatabaseOthers.getNotifications` function is called with the extracted username to
   retrieve the notifications.

**Response**

The API responds with an appropriate status code and a JSON object containing the notifications.

- Status Code 200: Notifications retrieved successfully. The response body contains the notifications.
- Status Code 404: Not Found. The user does not have any notifications.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `misc.savedItemsAPI`

This API endpoint is responsible for retrieving saved items for a specific user. It receives a JSON object in the
request body containing the user's _id.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/API/v1/savedItemsAPI`

**Request Body**

```json
{
   "user_id": "user_id"
}
```

- `user_id` (string): The unique identifier of the user whose saved items are being retrieved.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The user_id is extracted from the request body.
3. **Saved Items Retrieval**: The `DatabaseOthers.getSavedItems` function is called with the extracted user_id to
   retrieve the saved items.

**Response**

The API responds with an appropriate status code and a JSON object containing the saved items.

- Status Code 200: Saved items retrieved successfully. The response body contains the saved items.
- Status Code 404: Not Found. The user does not have any saved items.
- Status Code 401: Unauthorized. The request is not authorized.

---

## `misc.SearchAllAPI`

This API endpoint is responsible for searching all available data based on a query. It receives a JSON object in the
request body containing the query.

- **Version:** `1.0`
- **Method:** `POST`
- **Endpoint:** `/API/v1/SearchAllAPI`

**Request Body**

```json
{
   "query": "query"
}
```

- `query` (string): The search query.

**Processing Steps**

1. **Request Verification**: The API verifies the request using the `verifyRequest` function. If the request is not
   verified, it returns a 401 Unauthorized response.
2. **Request Body Extraction**: The query is extracted from the request body.
3. **Search**: The `DatabaseOthers.getGlobalSearchResult` function is called with the extracted query to perform the
   search.

**Response**

The API responds with an appropriate status code and a JSON object containing the search results.

- Status Code 200: Search completed successfully. The response body contains the search results.
- Status Code 404: Not Found. No results were found for the query.
- Status Code 401: Unauthorized. The request is not authorized.