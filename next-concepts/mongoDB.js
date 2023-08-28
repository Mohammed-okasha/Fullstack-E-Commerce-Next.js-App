/**
**[What is MongoDB?]
- MongoDB is a NoSQL database that works with collections full of documents,
Collections would be kind of your tables in a SQL database, and documents would
be your entries in those tables, So you have collections, which hold multiple documents,
And a single meetup would be a single document.
*/
//!============================================================================
/**
**[Working with MongoDB]
- Working with the cluster, the MongoDB database cluster, which we'll use
to connect to, then create our database in there and to store our data in there.

- Now, in order to be able to connect to this cluster, there are two things
we also have to do here in this MongoDB Atlas console:
*?1- Network Access, you have to add your local IP here
*?2- Database Access, you need to create at least one user, who has to have read and write access
*? to the database, so that this is a user with which we can connect.

- and then connect your application, to learn how you can connect to this
cluster, And here we now actually need to use the Node.js MongoDB driver
to write code here in our API route, that does send queries to this MongoDB Atlas cluster.

- For this, we need to install an extra package, The mongodb package,
This is the official MongoDB driver, which makes sending queries to MongoDB easy,
And now this MongoDB driver allows us to connect to this cluster.

- then we import MongoClient object from mongodb This is our object which allows us to connect,
We can use MongoClient and call the connect method here, Now, the connect method wants the
connection URL and then pass it as a parameter here, Now, in connection string you need
to plug in the username and password of your user.

- then, connect does return a promise, and hence, we can turn our handler function,
And then this will give us a connected client eventually, Now, on that client object
we can call the db method, to get hold of that database to which we're connecting,
By the way, if that database doesn't exist yet, it will be created on the fly.

- And then on this database, we can get access to our meetupsCollection, and on our collection,
we can call insertOne which return a connected, which is one of the built-in query commands,
for inserting one new document into this collection, And now the great thing about MongoDB,
is that a document is just a object in the end, a JavaScript object as a data.

- then, we wanna call client.close then to close the database connection once we're done.

- and then we need to use this response object to send back a response,
we have a status method which you can call on response to set a HTTP status code
of the response which will be returned, we can then chain a JSON call to prepare
the JSON data that will be added
*/
//!============================================================================
/**
**[Running MongoDB Queries From Inside API Routes]
- And now in the API route, I wanna store that email address in a collection of email addresses
stored in the database in MongoDB, and that then could be used by us to send out newsletters
and emails of any kind to those registered users.

*? Now to do that, we need to do two things:
1- We need to connect to the database, And once we are connected, we need to run an insert command
to insert the email address into some collection.
*/
//!============================================================================
/**
**[Getting Data From The Database(MongoDB)]
- we wanna get all the documents in there, TODO: and we can do this with help of the "find" method,
calling from inside the collection, The find method finds us data in a collection, NOTE: and we can
restrict the results, we can narrow down the results, and we can filter results, but if we just call
find we will fetch all the data (comments), and then we wanna call sort() method because sort allows
us to well sort the results, and we do sort by passing an object to sort where we then specify one
of our keys in our documents,  for example _id key, and then minus or plus one to define if we wanna
sort in descending or ascending order, And I wanna sort the ids in descending order which we can do
by adding _id and setting it to a value of -1, TODO: This will sort the comments which we are fetching
in descending order so that the latest comment is the first comment in this array which we are fetching.

- then we wanna call toArray method to get all the documents as an array, NOTE: because
by default we would not be getting such an array We would be getting a cursor with
which we have to navigate through documents manually. and calling toArray simplifies
that and simply gives us all the entries in the comments collection as an array
*/
//!============================================================================
/**
**[Adding Error Handling(MongoDB)]
- for working with the database Things won't always work, Connecting to the database could fail,
or even if we are connected inserting data could fail for whatever reason, Because the database
servers went down temporarily, just when we tried to insert data, Things can fail.

*! So how do we deal with that then?
- for that we can use, try catch, to try certain operations, catch errors, and then send back
a response if things go wrong, NOTE: and we can work with two different try catch blocks:

1 - I wanna try connecting, And if that fails, I wanna send back a response and an error,
But if it succeeds, I want to try and run success code.

2 - I wanna try insert a document in the collection, And if that fails, I wanna send back
a response and an error, But if it succeeds, I want to try and run success code.
*?========================================================================================
important NOTE: If you build an application where your MongoDB-related code will execute frequently
(e.g. the API route will be hit frequently), you might want to take advantage of MongoDB's
"connection pooling" though.

For this, simply remove all client.close() calls from your code. The connection will then NOT
be closed and will be re-used across requests.
*/
