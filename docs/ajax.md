# AJAX Usage

## AJAX

AJAX is a technique for creating fast and dynamic web pages. AJAX allows web pages to be updated asynchronously by
exchanging small amounts of data with the server behind the scenes. This means that it is possible to update parts of a
web page, without reloading the whole page.

In our project, we use AJAX to fetch data from the server and display it in the UI. We also use AJAX to send data to the
server, for example, when a user registers for an event.

**Fetch API is used in every client-server communication in this project. Whenever a client want to communicate with the
server
a fetch API call is initiated which makes an AJAX request**


#### _The first two below are done by :  Musfirat Hossain_
### Fetch API Example: Fetching Event Information

The following code snippet shows how the event information is fetched from the server and displayed in the UI.

```typescript hl_lines="2"
onMount(async () => {
    const response = await fetch('/API/v1/events/GetEventAPI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_id: event_id
        })
    });
});
```

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the event information from the server by making a POST request to the '/API/v1/events/GetEventAPI' endpoint.

2. The `event_id` is passed to the server in the request body. The `event_id` is obtained from the URL using the
   `useParams` function from Svelte.

3. The fetched event information is stored in the `event_detail` variable.

### Fetch API Example: Registering for an Event

The following code snippet shows how a user can register for an event.

```typescript
const register = async () => {
    const response = await fetch('/API/v1/events/RegisterEventAPI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_id: event_id
        })
    });
};
```

1. When the user clicks on the "Register" button, the `register` function is called.

2. The `event_id` is passed to the server in the request body. The `event_id` is obtained from the URL using the
   `useParams` function from Svelte.

3. The server responds with a JSON object containing a `success` field. If `success` is `true`, the user is registered
   for the event. Otherwise, an error message is displayed.



#### _The next two below are done by : Ummay Maria Muna_

### FETCH API Example: Showing all Farms

The following code snippet shows how all the farms are fetched from the server and displayed in the UI.

```typescript hl_lines="2"
onMount(async () => {
    const response = await fetch('/API/v1/farms/GetAllFarmsAPI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            farm_id: farm_id
        })
    });
});
```

1. When the page is mounted, an asynchronous function is called using the `onMount` function from Svelte. This function
   fetches the farm information from the server by making a POST request to the '/API/v1/farms/GetAllFarmsAPI' endpoint.

2. The `farm_id` is passed to the server in the request body. The `farm_id` is obtained from the URL using the

3. The fetched farm information is stored in the `farm_detail` variable.

### FETCH API Example: Showing One Farm 

```typescript hl_lines="2"
const GetOneFarmAPIResponse = await fetch('/API/v1/farms/GetOneFarmAPI', {
            method: 'POST',
            body: JSON.stringify(data.farm_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
```

1. The code uses the fetch function to make an HTTP POST request to the `/API/v1/farms/GetOneFarmAPI` endpoint.
2. The request includes a JSON-formatted string in the body, obtained by using `JSON.stringify(data.farm_id)`.
3. The server responds with a JSON object containing the farm information. The response is stored in the
   `GetOneFarmAPIResponse` variable.If not, an error message is displayed.



#### _The last two below are done by :  Shanta Biswas_

### FETCH API Example: Insert Post 


```typescript hl_lines="2"
const response = await fetch('/API/v1/forum/InsertPostAPI', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        });
```

1. The code initiates a network request using the fetch function. It sends a POST request to the server endpoint `/API/v1/forum/InsertPostAPI`.
2. `method: 'POST'` specifies that the request is a POST request, which is used for submitting data to be processed to a specified resource and 
`body: JSON.stringify(post)` converts the JavaScript object post into a JSON string. This object has the data to be sent to the server. The server can parse this JSON data on the backend
3. `headers: {'Content-Type': 'application/json'}` sets the content type of the request to JSON. This informs the server that the data being sent is in JSON format.


### FETCH API Example:  Get all posts


```typescript hl_lines="2"
onMount(async () => {
        // Get all posts via API GetAllPostAPI
        const getAllPostAPIResponse = await fetch('/API/v1/forum/GetAllPostAPI');
        posts = await getAllPostAPIResponse.json();
        posts.sort((a:Post, b:Post) => b.timestamp - a.timestamp);
    });
```

1. The fetch function is used to make a GET request to the specified endpoint `/API/v1/forum/GetAllPostAPI` to retrieve the list of posts.
2. The `json()` method is called on the response object to parse the response body as JSON. This is necessary because the data received from the server is in JSON format.
3. The parsed posts data is then assigned to the `posts` variable, which is declared in the Svelte component's script.The sort method is used to sort the posts based on their timestamps in descending order. This ensures that the most recent posts come first.





