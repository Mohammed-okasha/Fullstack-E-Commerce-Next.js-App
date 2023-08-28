/**
**[Build Fullstack Apps Feature]
- NextJS also makes it easy for us as a developer to add backend code to our React app,
So to build a fullstack react app, where we don't just have the client-side code
maybe with server-side pre-rendering, but where we also have standalone backend code
that for example works with the file system, or reaches out to a database.

- With NextJS it's very easy to add our own backend API into our react App
using NodeJS code, And that allows us to add code for storing data to a database
or to files, and getting data from there, adding authentication.

*TODO| Summary:
- all the client-side code(our react user interface) are blended
with our backend API code, That's why NextJS is amazing.
*/
//!==========================================================================
/**
**[Example and Story For Using "API Routes"]
- It's important to understand and keep in mind that some websites which we're building
don't just need HTML pages that are being served, back to visitors upon requests, You might
for example, have a feature on your website that allows users to submit feedback, when
a user clicks such a button to for example sign up for a newsletter, you don't necessarily
want to show a different page, Then we need to send data to some server, to then store that
entered newsletter email address in some database.

- And that request which is being sent there is not about fetching a site, It is about
storing data to some database, And that is what we use APIs for.

*? REST API:
- REST APIs are the most popular form of APIs, And the idea is always the same that we have
a web server that exposes certain URLs, but those are URLs not about getting requests and
sending back HTML Page, but they are about accepting some data, and then sending back responses
with any kind of data, not necessarily HTML, Specifically JSON, would be the most common format for
exchanging such data.
*/
//!==========================================================================
/**
**[What are "API Routes"?]
- API routes are special kinds of your URLs(API URLs), which you can add to your Next.js
application, which are not about getting a standard browser request and sending back a pre-rendered
HTML page, TODO: but which are instead about getting data, using data, maybe storing data in some
database, and sending back data in any form of your choice.

*? Summary:
- API routes, is a Next.js feature that allows us to build a API, a REST API if you will,
as part of our Next.js app, And it would, for example, allow us to support URLs, or Paths
after our domain, like this /api/feedback, and then accepting different kinds of HTTP requests
get, post, put, delete requests, whatever you need, And then depending on which HTTP method was
used for which path, different actions could be triggered, TODO: API routes' feature is about
letting us to define our own API endpoints.

- for example, for a POST request send to /api/feedback, we might expect some data to be sent
along with that incoming request, some feedback data entered by a user, TODO: And then when that
request hits our API endpoint we extract that data from the request and store it in a database.

- If the get request reaches that same URL, we instead might want to fetch data from a database
and send that back but not as an HTML page, but instead as raw data in that JSON format.

- NOTE: And those API routes, therefore don't exist to be entered in the URL typically,
but instead to be triggered via JavaScript code, via Ajax requests, So we as a developer
add certain code to our page that sends these requests behind the scenes, you could say
to our API to store or fetch data.

TODO: And that is actually something we already did, when we sent requests to Firebase,
then there, we talked to the Firebase API, We sent requests to certain URLs for storing
data and for getting data, And These is Firebase URLs, We didn't enter them into browser,
Instead we send requests via our JavaScript code, No matter if that code then runs on the
browser or on the server.
*/
//!==========================================================================
/**
**[Writing Our First API Route]
-
*! how do we add our own API routes to a next.js application?
1 - We can add our own API endpoints to next.js by simply creating a new sub folder inside
of pages folder, and that sub folder has to be called API, This has to be called API because
that's a special folder which will be recognized by next.js, and any API pages(route), which
you set up inside of that API folder will be treated in a special way, In there, you can add pages
just as you can add them anywhere else in the pages folder, for example we add feedback file,
Now that will create a special path we can send requests to, It will allow us to send requests
to our domain So during development, that's local host 3000/API/feedback.

2 - we create a function inside our API route(file), a function that we typically should name,
handler, because it will handle incoming requests, an it will get two parameters, and this
function we should export as a default, Now because this file is in the API folder, TODO: next.js
will take this function to execute it for incoming requests sent to /API/feedback, And the interesting
thing is that now inside of this function, it allows us to execute any server side code of our choice,
NOTE: Any code we write in here will never end up in any client side code bundle, So the code will never
be exposed to visitors of our webpage.

3 - So in handler function, we could start sending back a response, and we do that with help of that
response object, And here we will write node.js code enhanced by the next.js team to look a bit like
express.js

4 - in response object, we can call special methods that allow us to send back that response
and to configure that response, For example, the status method allows us to set a status code(200, ..),
Then on that method, we can chain a json method to send back some JSON data as part of the response
for incoming requests, then to the JSON method, we pass a JavaScript value like an object that will
then be transformed into JSON automatically, TODO: and this code will be executed by next.js when we
send the request to /API/feedback.
*/
//!==========================================================================
/**
**[Creating & Using Dynamic API Routes]
- Well, let's say you don't just wanna have /api/feedback, but you also wanna support
/api/feedback/some feedback ID to just fetched a single piece of data for that specific feedback item,
So for dynamic path segments.

*! How We can Create Dynamic API routes?
- we do that in exactly the same way as we do it for a regular Dynamic pages[id],


- we extract and access Dynamic values(id) from the url by query property inside of request object
for getting access to query parameters and regular parameters.
*/
//!==========================================================================
/**
**[Exploring Different Ways Of Structuring API Route Files]
NOTE: For example, you can also have catch-all dynamic API routes by adding free dots in front
of any placeholder name, This will then not just handle requests to /API/some value, but also
to more segments you might have, Like to what you learned about regular pages and catch-all routes.

-  important to understand how Next.js prioritizes these different files, If we send the request
to /API/feedback, TODO: it's decode into feedback.js file, it will be executed, Next.js is smart
just as it is for regular pages, and Next.js will do this prioritization for you.

- Now, another important thing to know is that you have some flexibility  regarding how you structure
your files, You can add a feedback.js sub folder in the API folder to support requests to /API/feedback,
Alternatively, just as with the regular pages.
*/
//!==========================================================================
//? OLD =============================================================================
/**
**[Introducing API Routes]
- NextJS makes it easy for us to build an API, a backend API, together with our
front-end React app in the same project, For this, we can use another key
NextJS feature called (API routes).

- API routes are a special routes, special pages, which don't return HTML code,
but which are instead about accepting incoming HTTP requests(post, patch, put, delete),
whatever we need with JSON data attached to them, For example, store data in a database
and then return JSON data.

- So you could say API routes allow you to build your own API end points
as part of this next project, And they will then be served by the same server as your next app.

- Now to add API routes, we add a special folder, in our pages folder,
and that's a folder named API, Then the NextJS will pick up any JavaScript
files stored in there and turn those files into API routes, So into end points,
that can be targeted by requests and that should receive JSON and return JSON.

- Now in this API folder, we can then again add JavaScript files where the file
names will act as path segments in the URL, Now, in those JavaScript files here,
you then don't create a React component function, These API routes are not
about defining, rendering or returning React components, Instead in there,
we will define functions which contains server-side code, because API routes
will only run on the server never on the client, Decoding them will never be exposed to the client,
And those functions are then simply triggered whenever a request is sent to this route,
so to /api/new-meetup here, and if a request is sent to this URL, it will trigger the
function which we have to define in this file.

*? this function will receive a request and a response object:
- The request object contains data about the incoming request.
- The response object will be needed for sending back a response.
*/
//!==========================================================================
/**
**[Sending Http Requests To Our API Routes]
- Now sending a request to the API route works just as sending a request to any API,
to any backend works in react.

- And we can send the request just as we know it, for example with the built in fetch function.

- send the request to our an external API, that will be hosted by the same server
that hosts our pages, And therefore we just can construct a absolute path in our url
to send the request to the same server but a different path on that server,
And the path is slash API(folder name) => /api/new-meetup.

- This will now send the request to this new meetup JS file in the API folder,
And it will then NextJS will trigger the function which inside the JS file for us
when a request reaches this path.
*/
//!==========================================================================
/**
**[Getting Data From The Database]
- we can directly write the code for doing so inside of getStaticProps,
So we don't need to send the request to our own API route, we can immediately
execute the code just here, So therefore we can, again import MongoClient,
and then connect to it here.

Now, when you import something here in a page component file,
and that something is then only used in getServerSideProps or getStaticProps, the imported
package will not be part of the client side bundle, So you can import code in component file,
which will then only be executed on the server, and nextJS will detect this, and not include
it in your client's side bundle, So you can import both server side and clients side code in component file,
That's a nice, smart feature built into nextJS.

- Now, We can MongoClient in getStaticProps to again connect to database.

- and once we did reach out to the meetupsCollection, we can use the meetupsCollection
to call the find method there, and find() will by default find all the documents in that collection,
and It's an async task, returning a promise which we can await.

- then To be precise we, should call toArray() after find(),
so that we get back an array of documents.

- So now we are pre-rendering this page, with data that's actually coming from a database,
And all this code will execute whenever this page is pre-generated, So not for every incoming request,
because it's not getServerSideProps but getStaticProps, But therefore during the build process,
and when we revalidate, then this page will be pre-rendered and this code will run again.
*/
