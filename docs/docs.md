# Documentation

This section contains the Documentation of each feature, how they work in the front-end and back-end, and how
to use the feature.

Here is a list of all the features that are documented below:

- E-Farms
- Forum
- News
- Events
- Animal Health Check Up
- Search
- Saving Item

## E-Farms

Inside E-Farms feature, we can perform the following actions

- View List of Farms
- View Individual Farms
- View Individual Product
- Purchase Product
- Add a product to wishlist

### View List of Farms

When user visits `/farms` page, a list of farms will be given to the user. For this Functionality

**Front-End Parameters** : None

**Back-End Parameters** : None

**Steps of showing all farms:**

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the list of farms from the server by making a GET request to the `/API/v1/farms/GetFarmsAPI` endpoint.
    ```typescript
    onMount(async () => {
        const response = await fetch('/API/v1/farms/GetFarmsAPI');
        farms = await response.json();
    });
    ```

2. The fetched list of farms is stored in the `farms` variable.

3. A reactive statement (`$: {...}`) is used to filter the list of farms based on the `searchKey`. If `searchKey` is
   empty, `filteredFarms` is set to the full list of farms. If `searchKey` is not empty, `filteredFarms` is set to the
   list of farms that include `searchKey` in their `farm_name` property.

4. In the Svelte markup, a conditional block (`{#if ...}`) is used to display a loading message if `farms`
   is `undefined`, indicating that the data is still being fetched.

5. Once the data is fetched and `farms` is defined, an `{#each ...}` block is used to iterate over `filteredFarms` and
   display each farm's information in the UI.

### View Individual Farms

When a user visits a specific farm page or clicks on a farm (e.g., `/farms/{farm_uid}`), the details of the individual
farm are displayed. For this Functionality

**Front-End Parameters** :

| Parameter  | Type  | Description                       |
|------------|-------|-----------------------------------|
| User Click | Event | This event triggers functionality |

**Back-End Parameters** :

| Parameter  | Type     | Description                         |
|------------|----------|-------------------------------------|
| `farm_uid` | Variable | Get this variable from Event Object |

**Steps of showing an Individual Farm:**

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the specific farm's information from the server by making a POST request to the '/API/v1/farms/GetOneFarmAPI'
   endpoint, passing the `farm_uid` as the body of the request.
   ```typescript
   onMount(async () => {
           const response = await fetch('/API/v1/farms/GetOneFarmAPI', {
           method: 'POST',
           body: JSON.stringify(farm_uid),
           headers: {
           'Content-Type': 'application/json'
   }
   });
           farm_info = await response.json();
   });
   ```

2. The fetched farm information is stored in the `farm_info` variable.

3. Similarly, the farm's products are fetched from the server by making a POST request to the
   `/API/v1/farms/GetOneFarmProductsAPI` endpoint, passing the `farm_uid` as the body of the request.
   ```typescript
   onMount(async () => {
           const response = await fetch('/API/v1/farms/GetOneFarmProductsAPI', {
           method: 'POST',
           body: JSON.stringify(farm_uid),
           headers: {
           'Content-Type': 'application/json'
   }
   });
           farm_products = await response.json();
   });
   ```

4. The fetched farm products are stored in the `farm_products` variable.

5. In the Svelte markup, a conditional block (`{#if ...}`) is used to display a loading message if `farm_info`
   or `farm_products` is `undefined`, indicating that the data is still being fetched.

6. Once the data is fetched and `farm_info` and `farm_products` are defined, the farm's information and products are
   displayed in the UI.

7. User interactions include hovering over a product, which triggers a scale transition and reveals more information
   about the product. Clicking on a product navigates the user to a detailed page for that specific product.

### View Individual Product

When a user visits a specific product page (e.g., `/farms/{farm_uid}/{product_id}`), the details of the individual
product are displayed. Here are the steps:

**Front-End Parameters** :

| Parameter  | Type  | Description                      |
|------------|-------|----------------------------------|
| User Click | Event | This event gets specific product |

**Back-End Parameters** :

| Parameter     | Type     | Description                         |
|---------------|----------|-------------------------------------|
| `farm_uid`    | Variable | Get this variable from Event Object |
| `product_uid` | Variable | Get this variable from Event Object |

**Steps of showing an Individual Product:**

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the specific product's information from the server by making a POST request to the
   `/API/v1/farms/GetProductInfoAPI` endpoint, passing the `product_id` as the body of the request.
   ```typescript
   onMount(async () => {
     const response = await fetch('/API/v1/farms/GetProductInfoAPI', {
       method: 'POST',
       body: JSON.stringify(data.product_id),
       headers: {
         'Content-Type': 'application/json'
       }
     });
     product_information = await response.json();
   });
   ```

2. The fetched product information is stored in the `product_information` variable.

3. In the Svelte markup, a conditional block (`{#if ...}`) is used to display a loading message if `product_information`
   is `undefined`, indicating that the data is still being fetched.

4. Once the data is fetched and `product_information` is defined, the product's information is displayed in the UI.

This way, the details of an individual product are displayed to the user when they visit the product's page.

### Payment Process of a Livestock

When a user decides to purchase a product, they are redirected to a payment page where they can choose to pay in
installments or in full. For this Functionality:

**Front-End Parameters** : None

**Back-End Parameters** :

| Parameter       | Type     | Description                             |
|-----------------|----------|-----------------------------------------|
| `user_id`       | Variable | Get this variable from `UserCache`      |
| `product_id`    | Variable | Get this variable from current page     |
| `farm_id`       | Variable | Get this variable from current page     |
| `total_price`   | Variable | Get this variable from Product Database |
| `product_breed` | Variable | Get this variable from Product Database |

1. The user clicks on the "Confirm" button to initiate the payment process. This triggers the `processPayment` function.

2. In the `processPayment` function, if the user has chosen to pay in installments, the monthly fee, remaining
   installments, next installment date, paid amount, and due amount are calculated and updated in
   the `paymentInformation` object.

3. A POST request is made to the `/API/v1/farms/PlaceOrderAPI` endpoint, passing the `paymentInformation` object as the
   body of the request. This request is used to place the order and process the payment on the server side.
   ```typescript
   const response = await fetch('/API/v1/farms/PlaceOrderAPI', {
      method: 'POST',
      body: JSON.stringify(
       paymentInformation
      ),
      headers: {
       'Content-Type': 'application/json'
      }
   });
   ```

4. Once the payment is processed, the user is redirected to a confirmation page or receives a confirmation message.

This way, the payment process is handled when a user decides to purchase a product.

### Add a product to wishlist

When a user visits a specific product page (e.g., `/farms/{farm_uid}/{product_id}`), they can add the product to their
wishlist. For this Functionality:

**Front-End Parameters** : None

**Back-End Parameters** :

| Parameter    | Type     | Description                         |
|--------------|----------|-------------------------------------|
| `user_id`    | Variable | Get this variable from `UserCache`  |
| `product_id` | Variable | Get this variable from current page |

1. The user clicks on the "Add to Wishlist" button. This triggers the `addToWishlist` function.

2. In the `addToWishlist` function, a POST request is made to the '/API/v1/user/AddToWishlistAPI' endpoint, passing
   the `user_id` and `product_id` as the body of the request. This request is used to add the product to the user's
   wishlist on the server side.
   ```typescript
   const addToWishlist = async () => {
      const response = await fetch('/API/v1/user/AddToWishlistAPI', {
         method: 'POST',
         body: JSON.stringify({
            user_id: user_id,
            product_id: product_id
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      });
   };
   ```

3. Once the product is added to the wishlist, the user is notified with a confirmation message.

This way, a product is added to the user's wishlist when they decide to do so.

## Forum

Inside Forum feature, we can perform the following actions

- View List of Posts
- View Individual Post
- Create a Post
- Create a Comment
- Like a Post
- Save a Post

### View List of Posts

When user visits `/forum` page, a list of posts will be given to the user. For this Functionality:

**Front-End Parameters** : None

**Back-End Parameters** : None

**Steps of showing all posts:**

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the list of posts from the server by making a GET request to the `/API/v1/forum/GetPostsAPI` endpoint.
    ```typescript
    onMount(async () => {
        const response = await fetch('/API/v1/forum/GetPostsAPI');
        posts = await response.json();
    });
    ```

2. The fetched list of posts is stored in the `posts` variable.

3. Sort the post by date, so that the latest post will be on top.

4. In the Svelte markup, a conditional block (`{#if ...}`) is used to display a loading message if `posts`
   is `undefined`, indicating that the data is still being fetched.

5. Once the data is fetched and `posts` is defined, an `{#each ...}` block is used to iterate over `posts` and
   display each post's information in the UI.

### View Individual Post

When a user visits a specific post page or clicks on a post (e.g., `/forum/{post_id}`), the details of the individual
post are displayed. For this Functionality:

**Front-End Parameters** :

| Parameter  | Type  | Description                       |
|------------|-------|-----------------------------------|
| User Click | Event | This event triggers functionality |

**Back-End Parameters** :

| Parameter | Type     | Description                         |
|-----------|----------|-------------------------------------|
| `post_id` | Variable | Get this variable from Event Object |

**Steps of showing an Individual Post:**

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the specific post's information from the server by making a POST request to the '/API/v1/forum/GetOnePostAPI'
   endpoint, passing the `post_id` as the body of the request.
   ```typescript
   onMount(async () => {
           const response = await fetch('/API/v1/forum/GetOnePostAPI', {
           method: 'POST',
           body: JSON.stringify(post_id),
           headers: {
           'Content-Type': 'application/json'
   }
   });
           post_info = await response.json();
   });
   ```

2. The fetched post information is stored in the `post_info` variable.

3. Similarly, the post's comments are fetched from the server by making a POST request to the
   `/API/v1/forum/GetOnePostCommentsAPI` endpoint, passing the `post_id` as the body of the request.
   ```typescript
   onMount(async () => {
           const response = await fetch('/API/v1/forum/GetOnePostCommentsAPI', {
           method: 'POST',
           body: JSON.stringify(post_id),
           headers: {
           'Content-Type': 'application/json'
   }
   });
           post_comments = await response.json();
   });
   ```

4. The fetched post comments are stored in the `post_comments` variable.

5. In the Svelte markup, a conditional block (`{#if ...}`) is used to display a loading message if `post_info`
   or `post_comments` is `undefined`, indicating that the data is still being fetched.

6. Once the data is fetched and `post_info` and `post_comments` are defined, the post's information and comments are
   displayed in the UI.

7. User interactions include clicking on the "Like" button, which triggers the `likePost` function. Clicking on the
   "Save" button triggers the `savePost` function. Clicking on the "Comment" button triggers the `commentPost`
   function.

### Create a Post

When a user decides to create a post, they are redirected to a page where they can create a post. For this
Functionality:

**Front-End Parameters** :

| Parameter  | Type  | Description                       |
|------------|-------|-----------------------------------|
| Post Title | Event | This event triggers functionality |
| Post Body  | Event | This event triggers functionality |

**Back-End Parameters** :

| Parameter    | Type     | Description                         |
|--------------|----------|-------------------------------------|
| `user_id`    | Variable | Get this variable from `UserCache`  |
| `post_title` | Variable | Get this variable from current page |
| `post_body`  | Variable | Get this variable from current page |
| `post_date`  | Variable | Get this variable from current page |

Steps of creating a post:

1. The user enters the post title and post body in the input fields. This triggers the `createPost` function.
2. In the `createPost` function, a POST request is made to the `/API/v1/forum/CreatePostAPI` endpoint, passing the
   `user_id`, `post_title`, `post_body`, and `post_date` as the body of the request. This request is used to create a
   post on the server side.
   ```typescript
   const response = await fetch('/API/v1/forum/CreatePostAPI', {
      method: 'POST',
      body: JSON.stringify({
         user_id: user_id,
         post_title: post_title,
         post_body: post_body,
         post_date: post_date
      }),
      headers: {
         'Content-Type': 'application/json'
      }
   });
   ```

3. Once the post is created, the user is redirected to the post's page or receives a confirmation message.

This way, a post is created when a user decides to do so.

### Create a Comment

When a user decides to create a comment, they are redirected to a page where they can create a comment. For this
Functionality:

**Front-End Parameters** :

| Parameter      | Type     | Description                              |
|----------------|----------|------------------------------------------|
| `comment_body` | Variable | The main comment that user wants to post |

**Back-End Parameters** :

| Parameter      | Type     | Description                              |
|----------------|----------|------------------------------------------|
| `user_id`      | Variable | Get this variable from `UserCache`       |
| `post_id`      | Variable | Get this variable from current page      |
| `comment_body` | Variable | Get this variable from current page      |
| `comment_date` | Variable | Get this variable from current page      |

Steps of creating a comment:

1. The user enters the comment body in the input field. Then the user clicks on the "Comment" button. This triggers the
   `createComment` function.

2. In the `createComment` function, a POST request is made to the `/API/v1/forum/CreateCommentAPI` endpoint, passing
    the `user_id`, `post_id`, `comment_body`, and `comment_date` as the body of the request. This request is used to
    create a comment on the server side.
    ```typescript
    const response = await fetch('/API/v1/forum/CreateCommentAPI', {
        method: 'POST',
        body: JSON.stringify({
            user_id: user_id,
            post_id: post_id,
            comment_body: comment_body,
            comment_date: comment_date
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    ```
   
3. Once the comment is created, the user is redirected to the post's page or receives a confirmation message.

This way, a comment is created when a user decides to do so.

### Like a Post

When a user decides to like a post, they are redirected to a page where they can like a post. For this
Functionality:

**Front-End Parameters** : None

**Back-End Parameters** :

| Parameter | Type     | Description                         |
|-----------|----------|-------------------------------------|
| `user_id` | Variable | Get this variable from `UserCache`  |
| `post_id` | Variable | Get this variable from current page |

Steps of liking a post:

1. The user clicks on the "Like" button. This triggers the `likePost` function.

2. In the `likePost` function, a POST request is made to the `/API/v1/forum/LikePostAPI` endpoint, passing the
   `user_id` and `post_id` as the body of the request. This request is used to like a post on the server side.
   ```typescript
   const response = await fetch('/API/v1/forum/LikePostAPI', {
      method: 'POST',
      body: JSON.stringify({
         user_id: user_id,
         post_id: post_id
      }),
      headers: {
         'Content-Type': 'application/json'
      }
   });
   ```

3. Once the post is liked, the user is redirected to the post's page or receives a confirmation message.

This way, a post is liked when a user decides to do so.

### Save a Post

When a user decides to save a post, they are redirected to a page where they can save a post. For this

**Front-End Parameters** : None

**Back-End Parameters** :

| Parameter | Type     | Description                         |
|-----------|----------|-------------------------------------|
| `user_id` | Variable | Get this variable from `UserCache`  |
| `post_id` | Variable | Get this variable from current page |

Steps of saving a post:

1. The user clicks on the "Save" button. This triggers the `savePost` function.

2. In the `savePost` function, a POST request is made to the `/API/v1/forum/SavePostAPI` endpoint, passing the
   `user_id` and `post_id` as the body of the request. This request is used to save a post on the server side.
   ```typescript
   const response = await fetch('/API/v1/forum/SavePostAPI', {
      method: 'POST',
      body: JSON.stringify({
         user_id: user_id,
         post_id: post_id
      }),
      headers: {
         'Content-Type': 'application/json'
      }
   });
   ```

3. Once the post is saved, the user is redirected to the post's page or receives a confirmation message.

This way, a post is saved when a user decides to do so.

## News

In the news feature, we can perform the following actions :

- View List of News
- View Individual News

### View List of News

When user visits `/news` page, a list of news will be given to the user. For this feature

**Front-End Parameters** : None

**Back-End Parameters** : None

**Steps of showing all news:**

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the list of news from the server by making a GET request to the '/API/v1/news/GetNewsAPI' endpoint.
    ```typescript
    onMount(async () => {
        const response = await fetch('/API/v1/news/GetAllNewsAPI');
        news = await response.json();
        console.log(news)
    });
    ```

2. The fetched list of news is stored in the `news` variable.
3. In the Svelte markup, a conditional block (`{#if ...}`) is used to display a loading message if `news`
   is `undefined`, indicating that the data is still being fetched.

4. Once the data is fetched and `news` is defined, an `{#each ...}` block is used to iterate over `filteredNews` and

### View Individual News

When a user visits a specific news page or clicks on a news (e.g., `/news/{news_id}`), the details of the individual
news are displayed. For this functionality

**Front-End Parameters** :

| Parameter  | Type  | Description                           |
|------------|-------|---------------------------------------|
| User Click | Event | This event triggers the functionality |

**Back-End Parameters** :

| Parameter | Type   | Description                                               |
|-----------|--------|-----------------------------------------------------------|
| Event     | Object | From this event backend gets information about what to do |

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the specific farm's information from the server by making a POST request to the '/API/v1/news/GetOneNewsAPI'
   endpoint, passing the `news_id` as the body of the request.
   ```typescript
   onMount(async () => {
        const news_response = await fetch('/API/v1/news/GetOneNewsAPI', {
            method: 'POST',
            body: JSON.stringify(data.newsObjectID),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        news_detail = await news_response.json();
        console.log(news_detail)
        news_ID_navigation.set({
            news_id: news_detail._id})
    });
    ```

2. The fetched news information is stored in the `news_detail` variable.
3. In the Svelte markup, a conditional block (`{#if ...}`) is used to display a loading message if `news_detail`
   is `undefined`, indicating that the data is still being fetched.
4. Finally, all the information is displayed in the UI about the news

## Events

In the events feature, we can perform the following actions :

- View List of Events
- View Individual Event

### View List of Events

When user visits `/events` page, a list of events will be given to the user. For this feature

**Front-End Parameters** : None

**Back-End Parameters** : None

**Steps of showing all events:**

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the list of events from the server by making a GET request to the '/API/v1/events/GetEventsAPI' endpoint.
   ```typescript
   onMount(async () => {
			const response = await fetch('/API/v1/events/GetAllEventsAPI');
			data = await response.json();
   });
   ```

2. The fetched list of events is stored in the `data` variable.
3. In the Svelte markup, a conditional block (`{#if ...}`) is used to display a loading message if `data`
   is `undefined`, indicating that the data is still being fetched.
4. Once the data is fetched and `data` is defined, an `{#each ...}` block is used to iterate over `filteredEvents` and
   display each event's information in the UI.

### View Individual Event

When a user visits a specific event page or clicks on a event (e.g., `/events/{event_id}`), the details of the
individual event are displayed. For this functionality

**Front-End Parameters** :

| Parameter  | Type  | Description                       |
|------------|-------|-----------------------------------|
| User Click | Event | This event triggers functionality |

**Back-End Parameters** :

| Parameter | Type   | Description                                               |
|-----------|--------|-----------------------------------------------------------|
| Event     | Object | From this event backend gets information about what to do |

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the specific event's information from the server by making a POST request to the '
   /API/v1/events/GetOneEventAPI'
   endpoint, passing the `event_id` as the body of the request.
   ```typescript
   onMount(async () => {
         

        const response = await fetch("/API/v1/events/GetOneEventAPI", {
            method: "POST",
            body: (JSON.stringify(data.event_id)),
            headers: {
                "Content-Type": "application/json"
            },
        });

        event = await response.json();

    });
    ```

2. The fetched event information is stored in the `event` variable.
3. In the Svelte markup, a conditional block (`{#if ...}`) is used to display a loading message if `event`
   is `undefined`, indicating that the data is still being fetched.
4. Finally, all the information is displayed in the UI about the event

### Register for Events

When a user clicks on the register button on the event page, the user will be registered for the event. For this
functionality

**Front-End Parameters** :

| Parameter        | Type    | Description                                |
|------------------|---------|--------------------------------------------|
| RegistrationForm | Object	 | Data collected from the registration form. |
| User Click       | Event   | This event triggers functionality          |

**Back-End Parameters** :

| Parameter        | Type   | Description                                                      |
|------------------|--------|------------------------------------------------------------------|
| RegistrationData | Object | Data received from the frontend containing registration details. |

When the user clicks on the register button, an asynchronous function is called using the `onMount` function from
Svelte. This function
fetches the user's information from the server by making a POST request to the '/API/v1/auth/GetPublicProfile'
endpoint, passing the `username` as the body of the request.
```typescript
   const response = await fetch('/API/v1/auth/GetPublicProfile', {
   method: 'POST',
   body: JSON.stringify({
      "username": username,
   }),
   headers: {
      'Content-Type': 'application/json'
   }
)
```

## Health-Track

**Front-End Parameters** :

| Parameter  | Type  | Description                       |
|------------|-------|-----------------------------------|
| User Click | Event | This event triggers functionality |

**Back-End Parameters** :

| Parameter | Type   | Description                                              |
|-----------|--------|----------------------------------------------------------|
| Event     | Object | From this event backend get information about what to do |

1. It sends an asynchronous POST request to the '/API/v1/getProductCatalogAPI' endpoint with a JSON payload containing
   the 'owner_id' extracted from the 'data' object.

```typescript
    onMount(async () => {
       const response = await fetch('/API/v1/getProductCatalogAPI', {
           method: "POST",
           body: JSON.stringify({
               owner_id: data._id
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       });
   
       healthInfo = await response.json();
   
   
       const allVetsResponse = await fetch('/API/v1/GetAllVetAPI')
       allVetsData = await allVetsResponse.json();
    });
```

2. It then parses the JSON response into the `healthInfo` variable.
3. It makes another asynchronous GET request to `/API/v1/GetAllVetAPI` and stores the JSON response in the `allVetsData`
   variable.

Again, this segment of code below :

```typescript
   onMount(async () => {
      if (product_category == '' || farm_id == '') {
         return;
      }
      const response = await fetch('/API/v1/farms/GetCategoryProducts', {
         method: 'POST',
         body: JSON.stringify(
                 {
                    "product_category": product_category,
                    "farm_id": farm_id
                 }
         ),
         headers: {
            'Content-Type': 'application/json'
         }
      });
      products = await response.json();
   });
```

5. It uses `healthInfo` and `allVetsData` variables to populate the UI with the health information of the animal.
6. It checks if both the `product_category` and `farm_id ` variables are not empty. If either of them is empty, the
   function returns early, avoiding further execution.
   Assuming both `product_category` and `farm_id` are non-empty, it proceeds to make an asynchronous POST request to
   the `/API/v1/farms/GetCategoryProducts` endpoint. The request includes a JSON payload with the
   specified `product_category` and `farm_id`.

## Search

When a user searches for a product, they are redirected to a page where they can see the search results. For this
Functionality:

**Front-End Parameters** :

| Parameter | Type     | Description        |
|-----------|----------|--------------------|
| `key`     | Variable | The search Keyword |

**Back-End Parameters** :

| Parameter | Type     | Description        |
|-----------|----------|--------------------|

