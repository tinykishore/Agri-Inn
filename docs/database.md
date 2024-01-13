# Database Documentation

This project uses MongoDB as the database.
The database is hosted on MongoDB Atlas.
Every API calls these database functions to perform CRUD operations.
These functions are encapsulated within a dedicated data access layer, ensuring a clean separation of concerns and
enhancing the maintainability of the codebase.

## Database Details

**Database Name**

The database name is `Agri-Inn`

**Collections**

The database contains the following collections:

| Collection Name         | Documents | Storage Size | Description                                    |
|-------------------------|-----------|--------------|------------------------------------------------|
| `animal-health-details` | 17        | 20.48 KB     | Contains the details of the animal health      |
| `comment`               | 10        | 20.48 KB     | Contains the comments of a forum post          |
| `event`                 | 5         | 20.48 KB     | Contains the details of the events             |
| `farm-info`             | 11        | 24.58 KB     | Contains the details of the farms              |
| `farm-products`         | 3         | 32.77 KB     | Contains all products of the farms             |             
| `forum`                 | 5         | 24.58 KB     | Contains the details of the forum              |
| `index`                 | 7         | 20.48 KB     | Contains the search indexes                    |
| `installment`           | 3         | 20.48 KB     | Contains the details of the installments       |
| `livestock-products`    | 17        | 28.67 KB     | Contains the details of the livestock products |
| `marketplace`           | 33        | 24.58 KB     | Contains all products for sale                 |
| `news`                  | 4         | 24.58 KB     | Contains all the news information              |
| `notification`          | 3         | 20.48 KB     | Contains notification for each user            |
| `order`                 | 8         | 20.48 KB     | Contains all the order(s) that have made       |
| `payment-info`          | 3         | 20.48 KB     | Contains all payment that have made            |
| `saved-item`            | 1         | 20.48 KB     | Contains the saved item for each user          |
| `user-account`          | 5         | 20.48 KB     | Contains all the account information           |
| `vets`                  | 4         | 20.48 KB     | Contains all the vet information               |


## Establishing Database Connection

> _**Developer Note**: You should not need to worry about this section. This section is for the developers who are interested in the technical details of the project._

The database connection is initiated once a user makes a request to the server. 
Below is a step by step explanation of how the database connection is established.

1. **MongoClient Instance**: A `MongoClient` instance is created with the MongoDB server URL and some options. The server URL is fetched from the environment variable `MONGO_URL`.
    
    > This `client` object is located in `Database.ts` file in the `src/lib/server` directory. This object is not exported so that it cannot be accessed from outside the file.

    ```typescript linenums="1" title="Database.ts"
    const client: MongoClient = new MongoClient(MONGO_URL, {...});
    ```

2. **Function that connects**: The `initializeDatabaseConnection` function is defined. This function is responsible for establishing the connection to the MongoDB server and setting up the collections.

    > This `initializeDatabaseConnection` function is located in `Database.ts` file in the `src/lib/server` directory. This function is exported so that it can be accessed from `hooks.server.ts` file.
    
    ```typescript hl_lines="4 11" linenums="1"
    export const initializeDatabaseConnection = async (): Promise<void> => {
        try {
            await client.connect();
            databaseConnection = client.db(MONGO_DATABASE);
    
            // Dynamically fetch all collections in the database
            const collectionsList = await databaseConnection.listCollections().toArray();
    
            // Create collections dynamically
            for (const collectionInfo of collectionsList) {
                collections[collectionInfo.name] = databaseConnection.collection(collectionInfo.name);
            }
        } catch (error: any) {}
    }
    ```

3. **Establishing Connection**: The `initializeDatabaseConnection` function is called in the `handle` function in the `src/hooks.server.ts` file. This function is a SvelteKit server function that handles incoming requests. If the database connection is not initialized, it calls the `initializeDatabaseConnection` function to establish the connection.
    ```typescript title="hooks.server.ts"
    export const handle: Handle = async ({event, resolve}) => {
        if (!isDatabaseConnectionInitialized()) await initializeDatabaseConnection();
        return resolve(event);
    };
    ```

So, the database connection is initiated when the first request comes in and the `handle` function is called.


## Forming the Database System

The database system is an **Object-Oriented** system. It contains the following classes:

- **Base Class** - `Database` in `Database.ts` file in the `src/lib/server` directory. This class contains only one attribute `collections`.

- **Child Classes**: Each child class contains functionality for each feature.
    - **`DatabaseAccount`** in `DatabaseAccount.ts` file in the `src/lib/server/databaseObjects` directory. This class contains functionality for the `user-accounts` feature.
    - **`DatabaseEvent`** in `DatabaseEvent.ts` file in the `src/lib/server/databaseObjects` directory. This class contains functionality for the `events` feature.
    - **`DatabaseFarm`** in `DatabaseFarm.ts` file in the `src/lib/server/databaseObjects` directory. This class contains functionality for the `farms` feature.
    - **`DatabaseForum`** in `DatabaseForum.ts` file in the `src/lib/server/databaseObjects` directory. This class contains functionality for the `forum` feature.
    - **`DatabaseNews`** in `DatabaseNews.ts` file in the `src/lib/server/databaseObjects` directory. This class contains functionality for the `news` feature.
    - **`DatabaseOthers`** in `DatabaseOthers.ts` file in the `src/lib/server/databaseObjects` directory. This class contains functionality for the all others feature.

> _**Developer Note**: Every class uses `collection` object from parent class to execute queries and communicate with database_


## `Database.ts` File

The `Database.ts` file is a typescript file that sets up and manages the connection to a MongoDB database for the application. Here's a breakdown of its contents:

1. `initializeDatabaseConnection` Function: This asynchronous function is responsible for establishing the connection to the MongoDB server and setting up the collections. It connects to the MongoDB server using the `MongoClient` instance, fetches all collections in the database, and creates collections dynamically.

2. `isDatabaseConnectionInitialized` Function: This function checks whether the database connection has been initialized. It returns `true` if the database connection is initialized, `false` otherwise.

3. `Database` Class: This class is used for interacting with the database. It has a static `collections` property that refers to the `collections` object declared earlier.

This file is crucial for the application as it sets up the database connection and provides a way to interact with the database.

### `Database` class

The `Database` class in the `Database.ts` file is a base class that provides a common interface for interacting with the MongoDB database. It is designed to be extended by other classes that need to perform database operations.

Here's a breakdown of the `Database` class:

```typescript hl_lines="2" linenums="1" title="Database.ts"
export default class Database {
    protected static collections = collections;
}
```

**`collections`**: This is a static property that holds a reference to the `collections` object. This object is populated with the collections in the MongoDB database when the `initializeDatabaseConnection` function is called. Each key in the `collections` object is the name of a collection, and the corresponding value is the MongoDB collection object that can be used to perform operations on that collection.

> _**Developers Note: **The `Database` class is extended by other classes in the `databaseObjects` directory. These classes use the `collections` property of the `Database` class to perform operations on the MongoDB collections._ 

## `DatabaseAccount.ts` File

This file contains the `DatabaseAccount` class that is used for interacting with the `user-account` collection in the
MongoDB database. It extends the `Database` class and provides methods for performing CRUD operations on
the `user-account` collection.

### `DatabaseAccount` class

The `DatabaseAccount` class in the `DatabaseAccount.ts` file extends the `Database` class and provides methods for
performing CRUD operations on the `user-account` collection.

Here's a breakdown of the `DatabaseAccount` class:

```typescript linenums="1" title="DatabaseAccount.ts"
export default class DatabaseAccount extends Database {
    // Methods for performing CRUD operations on the `user-account` collection
}
```

> This class contains methods for performing CRUD operations on the `user-account` collection. Each method is documented
> with JSDoc comments.

Methods for performing CRUD operations on the `user-account` collection:

| Method Name                                          | Parameters                                                             | Return Type              |
|------------------------------------------------------|------------------------------------------------------------------------|--------------------------|
| [`getUserAccount()`               ](#getuseraccount) | `_id`: ObjectId, <br/>`username`: string, <br/>`email`: string         | `Promise<any>`           |
| [`getUserCache ()`                ]()                | `_id`: ObjectId                                                        | `Promise<TypeUserCache>` | 
| [`getUserCredentialsByObjectID()` ]()                | `_id`: ObjectId                                                        | `Promise<any>`           |
| [`insertResetPasswordToken()`     ]()                | `email`: string, <br/>`token`: string                                  | `Promise<boolean>`       |
| [`getResetPasswordToken()`        ]()                | `token`: string                                                        | `Promise<any>`           |
| [`deleteResetPasswordToken()`     ]()                | `_id`: ObjectId                                                        | `Promise<boolean>`       |
| [`updatePassword()`               ]()                | `_id`: ObjectId, <br/>`password`: string                               | `Promise<boolean>`       |
| [`updateGoogleID()`               ]()                | `email`: string, <br/>`google_id`: string                              | `Promise<boolean>`       |
| [`insertUser()`                   ]()                | `userObject`: UserObject                                               | `Promise<any>`           |
| [`completeGoogleSignUp()`         ]()                | `_id`: ObjectId, <br/>`username`: string, <br/>`password_hash`: string | `Promise<boolean>`       |
| [`updateProfilePicture()`         ]()                | `_id`: ObjectId, <br/>`profile_picture`: string                        | `Promise<boolean>`       |
| [`crosscheckUsernameAndObjectI()` ]()                | `username`: string, <br/>`_id`: ObjectId                               | `Promise<boolean>`       |
| [`getPublicProfile()`             ]()                | `_id`: ObjectId, <br/>`username`: string, <br/>`email`: string         | `Promise<PublicProfile>` |

Below is a detailed description of each method:

#### getUserAccount()

**Definition:**

```typescript
getUserAccount(
    _id?: ObjectId | null, 
    username?: string | null, 
    email?: string | null)
: Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**  
This method retrieves a user account from the database based on specified criteria.

**Parameters:**

- `_id` (ObjectId | null, optional): The unique identifier of the user account.
- `username` (string | null, optional): The username of the user account.
- `email` (string | null, optional): The email address associated with the user account.

**Returns:**  
A Promise that resolves to the user account if found, or null if not found.

**Usage:**

This method uses the specified criteria to search for a user account in the "user-account" collection of the database. If the user account is found, it is logged with a <200> status; otherwise, a <404> status is logged.


Here's the documentation for the `getUserCache()` method in the `DatabaseAccount` class:

---

#### getUserCache()

**Definition:**

```typescript
getUserCache(_id: ObjectId): Promise<TypeUserCache | undefined>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves cached user information from the database by their unique ObjectID.

**Parameters:**

- `_id` (ObjectId): The unique identifier of the user account.

**Returns:**
A Promise that resolves to a TypeUserCache object if found, or undefined if not found.

**Usage:**

This method uses the specified ObjectID to search for a user account in the "user-account" collection of the database. If the user account is found, it is logged with a <200> status; otherwise, a <404> status is logged.

---

#### getUserCredentialsByObjectID()

**Definition:**

```typescript
getUserCredentialsByObjectID(_id: ObjectId): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves user credentials from the database by their unique ObjectID.

**Parameters:**

- `_id` (ObjectId): The unique identifier of the user account.

**Returns:**
A Promise that resolves to a Credentials object.

**Usage:**

This method uses the specified ObjectID to search for a user account in the "user-account" collection of the database. If the user account is found, it is logged with a <200> status; otherwise, a <404> status is logged.

---

#### insertResetPasswordToken()

**Definition:**

```typescript
insertResetPasswordToken(email: string, token: string): Promise<boolean>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method inserts a reset password token for a user by their email.

**Parameters:**

- `email` (string): The email of the user for whom the reset token is inserted.
- `token` (string): The reset password token to be inserted.

**Returns:**
A Promise that resolves to a boolean indicating whether the reset token insertion was successful.

**Usage:**

This method uses the specified email to search for a user account in the "user-account" collection of the database. If the user account is found, it inserts the provided reset password token into the user's account and logs a <200> status; otherwise, a <404> status is logged.

---

#### getResetPasswordToken()

**Definition:**

```typescript
getResetPasswordToken(token: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves a reset password token for a user from the database.

**Parameters:**

- `token` (string): The reset password token.

**Returns:**
A Promise that resolves to an object containing the user's `_id` and a `success` boolean if the reset password token is found, or an object with `success` set to `false` if not found.

**Usage:**

This method uses the specified token to search for a user account in the "user-account" collection of the database. If the user account is found, it returns an object containing the user's `_id` and a `success` boolean set to `true`; otherwise, it returns an object with `success` set to `false`.

Here's the table entry for the `getResetPasswordToken()` method:

---

#### deleteResetPasswordToken()

**Definition:**

```typescript
deleteResetPasswordToken(_id: ObjectId): Promise<boolean>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method deletes a reset password token for a user by their unique ObjectID.

**Parameters:**

- `_id` (ObjectId): The unique identifier of the user account.

**Returns:**
A Promise that resolves to a boolean indicating whether the reset token deletion was successful.

**Usage:**

This method uses the specified ObjectID to search for a user account in the "user-account" collection of the database. If the user account is found, it deletes the reset password token from the user's account and logs a <200> status; otherwise, a <404> status is logged.

---

#### updatePassword()

**Definition:**

```typescript
updatePassword(
    _id: ObjectId, 
    password: string)
: Promise<boolean>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method updates the password for a user in the database by their unique ObjectID.

**Parameters:**

- `_id` (ObjectId): The unique identifier of the user account.
- `password` (string): The new password for the user account.

**Returns:**
A Promise that resolves to a boolean indicating whether the password update was successful.

**Usage:**

This method uses the specified ObjectID to search for a user account in the "user-account" collection of the database. If the user account is found, it updates the user's password and logs a <200> status; otherwise, a <404> status is logged.

---

#### updateGoogleID()

**Definition:**

```typescript
updateGoogleID(email: string, google_id: string): Promise<boolean>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method updates the Google ID for a user in the database by their email.

**Parameters:**

- `email` (string): The email of the user for whom the Google ID is updated.
- `google_id` (string): The new Google ID for the user account.

**Returns:**
A Promise that resolves to a boolean indicating whether the Google ID update was successful.

**Usage:**

This method uses the specified email to search for a user account in the "user-account" collection of the database. If the user account is found, it updates the user's Google ID and logs a <200> status; otherwise, a <404> status is logged.

---

#### insertUser()

**Definition:**

```typescript
insertUser(userObject: UserObject): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method inserts a new user account into the database.

**Parameters:**

- `userObject` (UserObject): The user account object to be inserted.

**Returns:**
A Promise that resolves to the result of the insertion operation.

**Usage:**

This method uses the provided `userObject` to insert a new user account into the "user-account" collection of the database. If the insertion is successful, it logs a <200> status; otherwise, a <404> status is logged.

---

#### completeGoogleSignUp()

**Definition:**

```typescript
completeGoogleSignUp(_id: ObjectId, username: string, password_hash: string): Promise<boolean>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method completes the Google sign-up process for a user in the database by their unique ObjectID.

**Parameters:**

- `_id` (ObjectId): The unique identifier of the user account.
- `username` (string): The username for the user account.
- `password_hash` (string): The hashed password for the user account.

**Returns:**
A Promise that resolves to a boolean indicating whether the Google sign-up process was completed successfully.

**Usage:**

This method uses the specified ObjectID to search for a user account in the "user-account" collection of the database. If the user account is found, it updates the user's username and password hash and logs a <200> status; otherwise, a <404> status is logged.

---

#### updateProfilePicture()

**Definition:**

```typescript
updateProfilePicture(_id: ObjectId, profile_picture: string): Promise<boolean>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method updates the profile picture for a user in the database by their unique ObjectID.

**Parameters:**

- `_id` (ObjectId): The unique identifier of the user account.
- `profile_picture` (string): The new profile picture for the user account.

**Returns:**
A Promise that resolves to a boolean indicating whether the profile picture update was successful.

**Usage:**

This method uses the specified ObjectID to search for a user account in the "user-account" collection of the database. If the user account is found, it updates the user's profile picture and logs a <200> status; otherwise, a <404> status is logged.

---

#### crosscheckUsernameAndObjectID()

**Definition:**

```typescript
crosscheckUsernameAndObjectID(username: string, _id: ObjectId): Promise<boolean>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method crosschecks a username and ObjectID to ensure they match in the database.

**Parameters:**

- `username` (string): The username of the user account.
- `_id` (ObjectId): The unique identifier of the user account.

**Returns:**
A Promise that resolves to a boolean indicating whether the username and ObjectID match.

**Usage:**

This method uses the specified username and ObjectID to search for a user account in the "user-account" collection of the database. If the user account is found and the username and ObjectID match, it logs a <200> status and returns `true`; otherwise, it logs a <404> status and returns `false`.


---

#### getPublicProfile()

**Definition:**

```typescript
getPublicProfile(
    _id?: ObjectId | null, 
    username?: string, 
    email?: string)
: Promise<PublicProfile | null>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves public profile information for a user from the database based on specified criteria.

**Parameters:**

- `_id` (ObjectId | null, optional): The unique identifier of the user account.
- `username` (string, optional): The username of the user account.
- `email` (string, optional): The email address associated with the user account.

**Returns:**
A Promise that resolves to a PublicProfile object if found, or null if not found.

**Usage:**

This method uses the specified criteria to search for a user account in the "user-account" collection of the database. If the user account is found, it returns a PublicProfile object containing the user's full name, username, email, gender, phone number, occupation, social connections, and profile picture. If the user account is not found, it logs a <404> status and returns null.

---

## `DatabaseEvent.ts` File

This file contains the `DatabaseEvent` class that is used for interacting with the `event` collection in the
MongoDB database. It extends the `Database` class and provides methods for performing CRUD operations on
the `event` collection.

### `DatabaseEvent` class

The `DatabaseEvent` class in the `DatabaseEvent.ts` file extends the `Database` class and provides methods for
performing CRUD operations on the `event` collection.

Here's a breakdown of the `DatabaseAccount` class:

```typescript linenums="1" title="DatabaseAccount.ts"
export default class DatabaseAccount extends Database {
    // Methods for performing CRUD operations on the `user-account` collection
}
```

> This class contains methods for performing CRUD operations on the `user-account` collection. Each method is documented
> with JSDoc comments.

Methods for performing CRUD operations on the `user-account` collection:

| Method Name                                          | Parameters                                                             | Return Type              |
|------------------------------------------------------|------------------------------------------------------------------------|--------------------------|
| [`getAllEvents()`               ](#getallevents)     | None                                                                   | `Promise<any>`           |
| [`getOneEvent()`                ](#getoneevent)      | `_id`: ObjectId                                                        | `Promise<any>`           |
| [`updateOneEvent()`            ](#updateoneevent)    | `_id`: ObjectId, <br/>`farm_id`: any                                   | `Promise<any>`           |
| [`getLatestEvent()`             ](#getlatestevent)   | None                                                                   | `Promise<any>`           |


Below is a detailed description of each method:


#### getAllEvents()

**Definition:**

```typescript
getAllEvents(): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves all event information from the database.

**Parameters:**
None

**Returns:**
A Promise that resolves to an array of all event information objects.

**Usage:**

This method performs a `find` operation on the "event" collection in the database with an empty filter (`{}`), which matches all documents in the collection. It then converts the result to an array with the `toArray()` method and returns this array.

---

#### getOneEvent()

**Definition:**

```typescript
getOneEvent(_id: ObjectId): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves a single event from the database by its unique ObjectID.

**Parameters:**

- `_id` (ObjectId): The unique identifier of the event.

**Returns:**
A Promise that resolves to the event information object if found, or null if not found.

**Usage:**

This method uses the specified ObjectID to search for an event in the "event" collection of the database. If the event is found, it is logged with a <200> status; otherwise, a <404> status is logged.

---

#### updateOneEvent()

**Definition:**

```typescript
updateOneEvent(_id: ObjectId, farm_id: any): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method updates a specific event in the database by its unique ObjectID.

**Parameters:**

- `_id` (ObjectId): The unique identifier of the event.
- `farm_id` (any): The farm identifier to be added to the event's registered farms.

**Returns:**
A Promise that resolves to the result of the update operation.

**Usage:**

This method uses the specified ObjectID to search for an event in the "event" collection of the database. If the event is found, it updates the event's registered farms by adding the provided `farm_id` and logs a <200> status; otherwise, a <404> status is logged.

---

#### getLatestEvent()

**Definition:**

```typescript
getLatestEvent(): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves the latest event from the database.

**Parameters:**
None

**Returns:**
A Promise that resolves to the latest event information object.

**Usage:**

This method performs a `find` operation on the "event" collection in the database with an empty filter (`{}`), which matches all documents in the collection. It then sorts the results in descending order by the `event_date` field and limits the results to the most recent one. The method returns this latest event information object.

---


| Method Name                                                 | Parameters                                  | Return Type    |
|-------------------------------------------------------------|---------------------------------------------|----------------|
| [`getAllFarms()`               ](#getallfarms)              | None                                        | `Promise<any>` |
| [`getOneFarm()`                ](#getonefarm)               | `farm_uid`: string                          | `Promise<any>` |
| [`getOneFarmProducts()`        ](#getonefarmproducts)       | `farm_uid`: string                          | `Promise<any>` |
| [`getOneProduct()`             ](#getoneproduct)            | `product_id`: string                        | `Promise<any>` |
| [`placeOrder()`                ](#placeorder)               | `order`: PaymentObject                      | `Promise<any>` |
| [`getInstallments()`           ](#getinstallments)          | `user_id`: string                           | `Promise<any>` |
| [`getSellingProductCatalog()`  ](#getsellingproductcatalog) | `owner_uid`: string                         | `Promise<any>` |
| [`getCategoryProduct()`        ](#getcategoryproduct)       | `category`: string, <br/>`farm_id`: string  | `Promise<any>` |
| [`addProduct()`                ](#addproduct)               | `newProductObject`: any, <br/>`uid`: string | `Promise<any>` |

#### getAllFarms()

**Definition:**

```typescript
getAllFarms(): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves information about all farms from the database.

**Parameters:**
None

**Returns:**
A Promise that resolves to an array of all farm information objects.

**Usage:**

This method performs a `find` operation on the "farm-info" collection in the database with an empty filter (`{}`), which matches all documents in the collection. It then converts the result to an array with the `toArray()` method and returns this array.


---

#### getOneFarm()

**Definition:**

```typescript
getOneFarm(farm_uid: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves information about a single farm by its unique identifier (UID) from the database.

**Parameters:**

- `farm_uid` (string): The unique identifier (UID) of the farm.

**Returns:**
A Promise that resolves to the farm information object if found, or null if not found.

**Usage:**

This method uses the specified `farm_uid` to search for a farm in the "farm-info" collection of the database. If the farm is found, it is logged with a <200> status; otherwise, a <404> status is logged.

---

#### getOneFarmProducts()

**Definition:**

```typescript
getOneFarmProducts(farm_uid: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves information about farm products associated with a single farm by its unique identifier (UID) from the database.

**Parameters:**

- `farm_uid` (string): The unique identifier (UID) of the farm to retrieve product information for.

**Returns:**
A Promise that resolves to the farm products information object or null if not found.

**Usage:**

This method uses the specified `farm_uid` to search for a farm in the "farm-products" collection of the database. If the farm is found, it is logged with a <200> status; otherwise, a <404> status is logged.

---

#### getOneProduct()

**Definition:**

```typescript
getOneProduct(product_id: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves information about a single product by its unique identifier (ID) from the database.

**Parameters:**

- `product_id` (string): The unique identifier (ID) of the product to retrieve information for.

**Returns:**
A Promise that resolves to the product information object if found, or null if not found.

**Usage:**

This method uses the specified `product_id` to search for a product in the "farm-products" collection of the database. It first finds the document where the product is located, then iterates over the products array in the document to find the product with the matching ID. If the product is found, it is returned; otherwise, null is returned.

---

#### placeOrder()

**Definition:**

```typescript
placeOrder(order: PaymentObject): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method places an order by inserting the order details into the database.

**Parameters:**

- `order` (PaymentObject): The order details to be inserted.

**Returns:**
A Promise that resolves to the result of the insertion operation.

**Usage:**

This method uses the provided `order` object to insert a new order into the "order" collection of the database. If the insertion is successful, it logs a <200> status; otherwise, a <404> status is logged.

---

#### getInstallments()

**Definition:**

```typescript
getInstallments(user_id: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves all installment information for a specific user from the database.

**Parameters:**

- `user_id` (string): The unique identifier (ID) of the user to retrieve installment information for.

**Returns:**
A Promise that resolves to an array of installment information objects for the specified user.

**Usage:**

This method uses the specified `user_id` to search for installments in the "order" collection of the database. It finds all documents where the `user_id` field matches the provided `user_id`. It then iterates over the resulting array of installments and removes any installments that do not have a `total_installment` field. The method returns the filtered array of installments.

---

#### getSellingProductCatalog()

**Definition:**

```typescript
getSellingProductCatalog(owner_uid: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves the product catalog for a specific farm owner from the database.

**Parameters:**

- `owner_uid` (string): The unique identifier (UID) of the farm owner.

**Returns:**
A Promise that resolves to the product catalog information object for the specified farm owner.

**Usage:**

This method uses the specified `owner_uid` to search for a farm in the "farm-info" collection of the database. If the farm is found, it returns the product catalog associated with the farm owner.

---

#### getCategoryProduct()

**Definition:**

```typescript
getCategoryProduct(category: string, farm_id: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves products from a specific category for a specific farm from the database.

**Parameters:**

- `category` (string): The category of the products to retrieve.
- `farm_id` (string): The unique identifier (ID) of the farm to retrieve products for.

**Returns:**
A Promise that resolves to an array of product information objects that match the specified category and farm ID.

**Usage:**

This method uses the specified `category` and `farm_id` to search for products in the "livestock-products" collection of the database. It finds all documents where the `category` and `farm_id` fields match the provided values. The method returns an array of these matching product information objects.

---

#### addProduct()

**Definition:**

```typescript
addProduct(newProductObject: any, uid: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method adds a new product to a specific farm in the database.

**Parameters:**

- `newProductObject` (any): The new product object to be added.
- `uid` (string): The unique identifier (UID) of the farm to add the product to.

**Returns:**
A Promise that resolves to the result of the insertion operation.

**Usage:**

This method uses the provided `newProductObject` and `uid` to insert a new product into the "farm_products" collection of the database. If the insertion is successful, it logs a <200> status; otherwise, a <404> status is logged.

---


| Method Name                                          | Parameters                                                                           | Return Type    |
|------------------------------------------------------|--------------------------------------------------------------------------------------|----------------|
| [`getOnePost()`               ](#getonepost)         | `post_uid`: ObjectId                                                                 | `Promise<any>` |
| [`getAllPosts()`              ](#getallposts)        | None                                                                                 | `Promise<any>` |
| [`getMostLikedPosts()`        ](#getmostlikedposts)  | None                                                                                 | `Promise<any>` |
| [`insertReplyInPost()`        ](#insertreplyinpost)  | `reply`: any                                                                         | `Promise<any>` |
| [`votePost()`                 ](#votepost)           | `postObjectID`: ObjectId, <br/>`likerObjectID`: string, <br/>`alreadyLiked`: boolean | `Promise<any>` |

#### getOnePost()

**Definition:**

```typescript
getOnePost(post_uid: ObjectId): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves information about a single post from the forum by its unique ObjectID.

**Parameters:**

- `post_uid` (ObjectId): The unique identifier (ObjectID) of the post to retrieve information for.

**Returns:**
A Promise that resolves to the post information object if found, or null if not found.

**Usage:**

This method uses the specified `post_uid` to search for a post in the "forum" collection of the database. If the post is found, it is logged with a <200> status; otherwise, a <404> status is logged.

---

#### getAllPosts()

**Definition:**

```typescript
getAllPosts(): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves all posts from the forum.

**Parameters:**
None

**Returns:**
A Promise that resolves to an array of all post information objects.

**Usage:**

This method performs a `find` operation on the "forum" collection in the database with an empty filter (`{}`), which matches all documents in the collection. It then converts the result to an array with the `toArray()` method and returns this array.

---

#### getMostLikedPosts()

**Definition:**

```typescript
getMostLikedPosts(): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves information about the most liked posts from the forum.

**Parameters:**
None

**Returns:**
A Promise that resolves to an array of the most liked post information objects.

**Usage:**

This method performs a `find` operation on the "forum" collection in the database with an empty filter (`{}`), which matches all documents in the collection. It then sorts the results in descending order by the `like` field and limits the results to the top three. The method returns this array of the most liked post information objects.

---

#### insertReplyInPost()

**Definition:**

```typescript
insertReplyInPost(reply: any): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method inserts a reply into a post in the comment section of the forum.

**Parameters:**

- `reply` (any): The reply to be inserted.

**Returns:**
A Promise that resolves to the result of the insertion operation.

**Usage:**

This method uses the provided `reply` object to insert a new reply into the "comment" collection of the database. If the insertion is successful, it logs a <200> status; otherwise, a <404> status is logged.

---

#### votePost()

**Definition:**

```typescript
votePost(postObjectID: ObjectId, likerObjectID: string, alreadyLiked: boolean): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method handles the voting (liking) of a post in the forum. If a user has already liked a post, their like is removed. If they haven't liked the post yet, their like is added.

**Parameters:**

- `postObjectID` (ObjectId): The unique identifier (ObjectID) of the post to be voted on.
- `likerObjectID` (string): The unique identifier (string) of the user who is voting.
- `alreadyLiked` (boolean): A flag indicating whether the user has already liked the post.

**Returns:**
A Promise that resolves to the result of the voting operation.

**Usage:**

This method uses the provided `postObjectID` and `likerObjectID` to update the "likes" array of a post in the "forum" collection of the database. If `alreadyLiked` is `true`, it removes the `likerObjectID` from the "likes" array of the post (i.e., the user unlikes the post). If `alreadyLiked` is `false`, it adds the `likerObjectID` to the "likes" array of the post (i.e., the user likes the post).

---

## `DatabaseNews.ts` File

This file contains the `DatabaseNews` class that is used for interacting with the `news` and `saved_items` collections in the MongoDB database. It extends the `Database` class and provides methods for performing operations on these collections.

### `DatabaseNews` class

The `DatabaseNews` class in the `DatabaseNews.ts` file extends the `Database` class and provides methods for performing operations on the `news` and `saved_items` collections.

Here's a breakdown of the `DatabaseNews` class:

```typescript linenums="1" title="DatabaseNews.ts"
export default class DatabaseNews extends Database {
    // Methods for performing operations on the `news` and `saved_items` collections
}
```

> This class contains methods for performing operations on the `news` and `saved_items` collections. Each method is documented with JSDoc comments.

Methods for performing operations on the `news` and `saved_items` collections:
Here's the table with all the methods from the `DatabaseNews` class:


| Method Name                                              | Parameters                                               | Return Type    |
|----------------------------------------------------------|----------------------------------------------------------|----------------|
| [`getAllNews()`               ](#getallnews)             | None                                                     | `Promise<any>` |
| [`getOneNews()`                ](#getonenews)            | `news_uid`: string \| null, <br/>`_id`: ObjectId \| null | `Promise<any>` |
| [`saveNews()`                  ](#savenews)              | `user_id`: string, <br/>`news_id`: string                | `Promise<any>` |


Please note that the links in the "Method Name" column are placeholders and should be replaced with the actual links to the method documentation.


#### getAllNews()

**Definition:**

```typescript
getAllNews(): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves all news information from the database.

**Parameters:**
None

**Returns:**
A Promise that resolves to an array of all news information objects.

**Usage:**

This method performs a `find` operation on the "news" collection in the database with an empty filter (`{}`), which matches all documents in the collection. It then converts the result to an array with the `toArray()` method and returns this array.

---

#### getOneNews()

**Definition:**

```typescript
getOneNews(news_uid?: string | null, _id?:ObjectId | null): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves information about a single news item from the database by its unique identifier (UID) or ObjectID.

**Parameters:**

- `news_uid` (string | null, optional): The unique identifier (UID) of the news item.
- `_id` (ObjectId | null, optional): The ObjectID of the news item.

**Returns:**
A Promise that resolves to the news information object if found, or null if not found.

**Usage:**

This method uses the specified `news_uid` or `_id` to search for a news item in the "news" collection of the database. If the news item is found, it is logged with a <200> status; otherwise, a <404> status is logged.

---

#### saveNews()

**Definition:**

```typescript
saveNews(user_id: string, news_id: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method saves a news item for a specific user in the database.

**Parameters:**

- `user_id` (string): The unique identifier (ID) of the user who is saving the news item.
- `news_id` (string): The unique identifier (ID) of the news item to be saved.

**Returns:**
A Promise that resolves to the result of the save operation.

**Usage:**

This method uses the provided `user_id` and `news_id` to update the "saved_items" collection in the database. It finds the document where the `user_id` field matches the provided `user_id` and adds the `news_id` to the "saved_news" array of the document.

---
## `DatabaseOthers.ts` File

This file contains the `DatabaseOthers` class that is used for interacting with various collections in the MongoDB database. It extends the `Database` class and provides methods for performing operations on these collections.

### `DatabaseOthers` class

The `DatabaseOthers` class in the `DatabaseOthers.ts` file extends the `Database` class and provides methods for performing operations on various collections.

Here's a breakdown of the `DatabaseOthers` class:

```typescript linenums="1" title="DatabaseOthers.ts"
export default class DatabaseOthers extends Database {
    // Methods for performing operations on various collections
}
```

> This class contains methods for performing operations on various collections. Each method is documented with JSDoc comments.

Methods for performing operations on various collections:

| Method Name                                            | Parameters             | Return Type    |
|--------------------------------------------------------|------------------------|----------------|
| [`getGlobalSearchResult()`   ](#getglobalsearchresult) | `query`: string        | `Promise<any>` |
| [`getNotifications()`        ](#getnotifications)      | `userObjectID`: string | `Promise<any>` |
| [`getSavedItems()`           ](#getsaveditems)         | `userObjectID`: string | `Promise<any>` |

Below is a detailed description of each method:

#### getGlobalSearchResult()

**Definition:**

```typescript
getGlobalSearchResult(query: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method performs a global search in the database based on the provided query string.

**Parameters:**

- `query` (string): The search query string.

**Returns:**
A Promise that resolves to an object containing the search results from various collections in the database.

**Usage:**

This method uses the provided `query` string to perform a search in the "user-account", "forum", "event", and "news" collections of the database. It finds all documents where the `full_name`, `credentials.username`, `credentials.email`, `title`, `post`, `description`, and `content` fields match the provided `query` string. The method returns an object containing arrays of matching documents from each collection.

---

#### getNotifications()

**Definition:**

```typescript
getNotifications(userObjectID: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves all notifications for a specific user from the database.

**Parameters:**

- `userObjectID` (string): The unique identifier (ID) of the user to retrieve notifications for.

**Returns:**
A Promise that resolves to the notifications object for the specified user.

**Usage:**

This method uses the specified `userObjectID` to search for a user in the "notification" collection of the database. If the user is found, it returns the user's notifications object.

---

#### getSavedItems()

**Definition:**

```typescript
getSavedItems(userObjectID: string): Promise<any>
```

**Access:** Public  
**Modifier:** Static  
**Asynchronous:** Yes

**Description:**
This method retrieves all saved items for a specific user from the database.

**Parameters:**

- `userObjectID` (string): The unique identifier (ID) of the user to retrieve saved items for.

**Returns:**
A Promise that resolves to the saved items object for the specified user.

**Usage:**

This method uses the specified `userObjectID` to search for a user in the "saved_items" collection of the database. If the user is found, it returns the user's saved items object.
