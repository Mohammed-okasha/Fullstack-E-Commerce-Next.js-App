/**
**[Data Fetching for Static Pages]
*!how we can fetch data for pre-rendered Pages?
- NextJS has built-in page pre-rendering but this built-in process has a flaw,
the page that is pre-rendered has basically the snapshot, after the first component
render cycle as its content and that might be missing crucial data.

- So if we visit some route, if some request is sent to some route to this page
then there we return that pre-rendered page but we might be missing data here,
So whilst this is theoretically good for SEO, it might not always be,
But after this HTML page was received, React will actually take over,
now React will turn this into a single-page application and take over control,
and then useEffect function might be executed, and data might be fetched and the page
might be updated in the browser, not on the server, not on the pre-rendered page,
but instead, after this page was received in the browser.

*?for this, NextJS gives us getStaticProps() function:
- TODO: if you have getStaticProps() function in your file next.js we'll first execute this function,
And then in a second step execute the component function, Now in a second step because that first step
it prepares the props for this component function, it executes getStaticProps() not on the fly on the
server but it executes it during this pre-rendering process, when it pre-generate a page.

- And getStaticProps has this name, because indeed, its job is to prepare props for this page,
And these props could then contain the data this page needs, And that's useful because
getStaticProps, is allowed to be asynchronous we can return a promise there, and then NextJS
will wait for this promise to resolve, which means it waits until your data is loaded,
and then we return the props for our component function, And with that, you're able to load data
before this component function is executed so that this component can be rendered
with the required data.

then we need to return an object here in getStaticProps, Now in this object
we can configure various things, we typically set a props property And that then holds
another object, which will be the props object we receive in our component function.

*TODO| Summary:
- now pre-rendering contains the full HTML code and that's, of course great for search engines
because now, data is not fetched in a second component render cycle on the client,
but initially, before this page is pre-rendered, And that's a great plus
and one of the main features of NextJS(this data fetching for pre-rendering).
*/
//!==========================================================================
/**
**[Running Server-side Code & Using the Filesystem]
- import fs from "fs/promises", Now this imports the file system module from node JS,
This is not a third party package which we needed to install.

- And working with the fs module, would fail if you try to do it on the client-side(browser),
because browser side Javascript can't access the file system.

- then we use the file system module inside of getStaticProps, And next JS is very clever,
and sees which imports you only use in getStaticProps, And then those imports are basically
stripped out of the client site code bundle, And now we can use Fs to get access to this
dummy backend json file with the readFile() Sync function, and blocks the execution
until it's done, and we can import path module from node js, then we can use
path and execute to join method to build a path to read the file, and we can get to current
working directory by using another node JS object And that's the process object which is globally
available in node JS, And then on process, we can execute the CWD method which stands for current
working directory And this gives you the current working directory off this code file when it's executed.

- So when the code for the client side, the react app code for the browser side, when that is prepared,
that import will not be part of it, Next JS will ignore it for the client site, So to component code
in general will be part of the client site code, but this import and getStaticProps() code won't be.
*/
//!===============================================================================
/**
**[A Closer Look At "getStaticProps" & Configuration Options]
- let's take a closer look at this return object, In there we see props and revalidate,
Now there are two other keys, which you can set on this object:
*? 1- One key is the notFound key:
- which wants a Boolean value, If you set this to true, this page will return a 404 Error Page
instead of the normal page.
*! Now, why might we want to do that?
- Well, if the code that fetch data, fails to fetch the data for whatever reason,
then you could for example do that if we have no data, then maybe we want to return an object
in getStaticProps, which has notFound set to true.

*? second key you can set is the redirect key:
- The redirect key allows you to redirect the user, So instead of rendering the page component content,
you can redirect to another page, to another route, And that could also be needed because maybe you failed
to fetch data.

- Let's say the problem is not that there is no data but instead you weren't able to access the database
or anything like that, So if there is no data to begin with, so not just no products, but no data
in general, then maybe you want to redirect, Then you can do this by returning an object, where the
redirect key is set to an object, where you then set a destination to some route, And then that route
would be loaded, with a redirect status code returned by next.js, instead of the page component.
*/
//!===============================================================================
/**
**["getStaticPaths function" For Dynamic Pages]
- next.js would pre-generate pages by default, NOTE: but It turns out this is not the case if
you have a dynamic page, if you have that, the default behavior is not to pre-generate the page.

*! why is that not the default?
- because keep in mind that technically for a this page, we won't just have one page, but multiple
pages for different IDs, we have technically different pages, which have the same general HTML
content but different data, So Next.js doesn't know in advance, how many pages it needs to pre-generate
for this dynamic path, It doesn't know which values for productId will eventually be supported, And
because it doesn't know about dynamic pages it will are not pre-generated by default, instead they
are always generated just in time on the server.

- That's why for such dynamic routes, we need to give Next.js more information, so We can also
tell Next.js which pages should be pre-generated, Because here we don't just need data, we also
need to let Next.js know which ID values, and for which values a page should be pre-generated,
so Multiple different [ids] values can be pre-generated the page by next.js.

- we do inform Next.js about this with another function we can add on the page file, and
that's the getStaticPaths function,
*/
//!===============================================================================
/**
**[Using "getStaticPaths" function]
- we export getStaticPaths function, Now the goal of this function is to tell Next.js
which instances of this dynamic page should be generated?, Therefore, this should return an object,
An object have a paths key, And that's now an array, an array full of objects, Now in this object
you must add a params key now, and that holds another object have a bunch of key-value pairs,
where the keys are all the different dynamic segment identifiers that might lead to this page,
If that would be nested deeper in a folder where the folder name is also dynamic.

- and the values, are then the concrete values for which this page should be generated,
for example, we know that we want to generate this page three times for (p1, p2, p3),
as values for the dynamic page identifier, Now this tells Next.js that this dynamic page
should be pre-generated three times with these three dynamic values.

TODO: And then Next.js will call getStaticProps three times for these different ids,
And we then can extract that productId inside getStaticProps function, but Now for this
to work we also need to add another key after to paths, and that's the fallback key.
*/
//!===============================================================================
/**
**["getStaticPaths" & Link Prefetching: Behind The Scenes]
- we can run this npm run build command again, then We see that it pre-rendered a couple
of pages, And we see that for this dynamic page, it generated three instances for (P1, P2, P3),
because these are the params values we returning in getStaticPaths function, and we can see
those generated pages by next.js (HTML Files) for those different parameters in next/pages folder,
We also see the json files for pre-loading that data.

- And if you now open the developer tools and go to the network tab, If you now reload local host 3000,
you'll see something interesting, here are requests to p1,p2,p3 JSON which it loaded and read under
the hood on our behalf, NOTE: So that it doesn't need to fetch the data after we navigated to the page,
it pre fetched the props for the page that would need to be loaded if you click on one of these path links.

*?Summary:
- So in the end, it pre-fetched that data even before I click over the links, The important part
for us here is that it does that pre fetching for us, TODO: when we now click on a link,
we're not sending a new request to the server and load the pre-rendered HTML file, Instead
we stay in this single page application, We stay in this react application which was loaded
and hydrated after this initial request, NOTE: So in the end JavaScript will render a new page for us,
Just as it would do in a regular react app without next.JS.
*/
//!===============================================================================
/**
**[Working With Fallback Pages]
*? So what's up with this fallback key:
- The fallback key can help you if you have a lot of pages that would need to be pre-generated,
Now imagine that you have like an Amazon website with millions of products, Of course,
pre-generating all those products like this might not be optimal, because those millions of pages
might take super long, you might have some products which are basically never visited, So then,
pre-generating such rarely visited pages is a waste of time and resources, That's where fallback
becomes important.

- Here we can set fallback to true, and then, we could decide to only pre-render some pages,
So let's say we wanna pre-render the page with product ID p1, because it's visited very often,
but we don't wanna pre-generate the other two pages, With fallback set to true, that's possible,
if I click on product p3, we still load this page successfully, Even though it was not added to paths
in getStaticPaths(), And the reason for that is that with fallback true, we tell NextJS that even parameter
values for the productId parameter which are not listed here, can be valid, Values that should be loaded when
they are visited, But they're not pre-generated by default, instead they're generated just in time when
a request reaches the server.

*?Summary:
- that allows us to pre-generate highly visited pages, and postpone the generation to less visited pages
to the server, so that they are only pre-generated when they're needed.

*! but you'll notice a problem If I don't click on a link but instead I directly enter this in URL:
- we send a new request to this page, we actually get an error, The reason for that, this dynamic
pre-generation, when it's needed, does not finish instantly, So therefore we need to wait data
in our component until it loaded, or An alternative would be that you don't set fallback to true or false,
but to a string with a value of "blocking", because NextJS will actually wait for this page to fully
be pre-generated on the server.
*/
//!===============================================================================
/**
**[Loading Paths Dynamically in getStaticPaths function]
- in reality, we would be fetching this kind of information from a database or a file as well.
then we need To Get The Data in getStaticPaths, then We wanna to use the data to read all the IDs
we want to support.
*/
//!===============================================================================
/**
**[Fallback Pages & "Not Found" Pages]
- let's take another look at the not found case, that we're trying to request a page which doesn't exist,
And let's start by simply visiting a page with a productId of p4, Now we get a error 404 page not found,
because in our data we only have the IDs p1, p2, p3, and because in getStaticPaths, we load and build
our array of params, So paths with params here in the end is an array where we only configure param pairs.

- if we set fallback to true, then that we don't have to pre-define all possible pages,
but we got Error: Failed to load static props, And this hopefully also makes sense,
I'm trying to load this product page for an ID of p4 for which we just don't have any data.

- because also in getStaticProps we are also reaching out to dummy-backend.json and we're trying
to find our product by ID p4 in that file, And we won't find it in that file.

TODO: Now that is a perfect example for setting the not found property on the object
we return in getStaticProps() function.
*/
//!===============================================================================
/**
**["getServerSideProps" for Server-side Rendering (SSR]
- NOTE: Inside of "getStaticProps" and also inside of "getStaticPaths", we don't have access
to the actual request which is incoming, Because these functions are not called for the actual request
, at least not only With incremental static generation, they are also called for incoming requests,
TODO: but they are generally called when your project is built, So inside of getStaticProps, you don't
have access to the actual incoming request.

- sometimes static generation is not enough, and instead, you need real server-side rendering,
which means that you do need to pre-render a page for every incoming request, or you need access
to the concrete request object that is reaching the server, Because, for example, you need to extract cookies,

- The idea is simple, NextJS also supports this run real server-side code use case, which means
it gives you a function which you can add to your page component files, which is then really executed
whenever a request for this page reaches the server, NOTE: So that's then not pre-generated in advance
during build time or every couple of seconds, but it's really code that runs on the server only, so
only after you deployed it, and which is then re-executed for every incoming request.

- And that code is added to a function called getServerSideProps(), NextJS will execute
that function whenever a request for this page is made.
*/
//!===============================================================================
/**
**[Using "getServerSideProps" for Server-side Rendering]
- let's say we have a dummy user profile js file here in the pages folder, NOTE: but now
that's a page, which we can't pre-render because we need to know for which user we are
rendering this, we could expect a user ID as part of the URL.

- But then everyone who enters this ID in the browser is able to see some data for that given
user ID, So that's not what I want here, Instead, we wanna identify the user making the request,
let's say with help of a cookie which we set before, but again, we need to get access to the
request object which carries the cookies and the headers to find out which users sent this request,
NOTE: That would be a typical use case for getServerSideProps, We can't pre-rendered as a page,
because we don't know which users will have in advance, and we don't get access to their cookies
in advance.

- Therefore, we want to use an async function called getServerSideProps, and it receive a context
object, and we also need to return an object, and the object which be returned the same object
in getStaticProps(), The only difference is the (revalidate key), That is not required here
and that can't be set here TODO: because getServerSideProps per definition runs for every incoming request,
because it will always run again.

NOTE: when we use getServerSideProps, the page component called by Next.js after it called
getServerSideProps, TODO: but it will not be called the page in advance when we built the project,
but really for every incoming request.

- But the important thing now really is that getServerSideProps only executes on the server after deployment.
*/
//!===============================================================================
/**
**["getServerSideProps" and its Context]
*!which implications does getServerSideProps running on the server only have for us?
- The implications can be found in this context object unlike context in getStaticProps
we don't just have access to the params, instead, we get access to the full request object as well,
And also to the response which will be sent back, so that we could even manipulate this and add
extra headers if you wanted to.

- Now, you don't need to worry about sending back a response, Next.js will do that for you,
it will be re-rendered component but you can manipulate the response, before it's sent back
by adding extra headers or cookie, for example.

- In addition, you can also dive into the request object that reached the server, and you
can read incoming data from there, For example, headers that were attached through request
and therefore cookie data that was attached to the request.

- Request and response are the default node.js objects for incoming messages and for responses,
And getting access to this kind of data(request and response), can sometimes be important if you
needs special header or cookie data.
*/
//!===============================================================================
/**
** [Dynamic Pages & "getServerSideProps"]
- when using getServiceSideProps, we don't need getStaticPaths function for that.

- And it did work without us adding getStaticPaths, Why? Because this runs on the server
only anyways, So Next.js does not pre-generate any pages at all, and therefore of course
it also doesn't need to know which pages to pre-generate TODO: because there is no pre-generation.
*/
//!===============================================================================
/**
**["getServerSideProps": Behind The Scenes]
- So for this, I will add a console log statement inside getServerSideProps, and we again
run npm run build to build this for production, the we'll see when that code gets executed.

- Now the user profile page was not pre-generated as is in the end signaled by this Lambda symbol,
So this Lambda symbol shows you that these pages are not pre-generated, but instead will be
pre-rendered on the server only.
*/
//!===============================================================================
/**
**[Client-Side Data Fetching (And When To Use It)]
- When building next JS applications, you will sometimes have data which can't be
pre-rendered, Examples would be data that changes with high frequency.

- So for example, if you have stock data which you show on some page and that data changes
multiple times every second, prefetching and pre rendering might not make too much sense because
you will always see outdated data when you visit this page, So in such a case, just showing
a loading spinner when you visit the page, and then fetching the very latest data for you Or
considered a case that you have partial data. in the background then might be the best user experience.

- So in such a scenario, it would again, probably make sense to fetch that data on the client,
so from inside the regular react app, once a user navigated to that page, So not from inside
getStaticProps or getServiceSideProps.
*/
//!===============================================================================
/**
**[Combining Pre-Fetching With Client-Side Fetching]
- I wanna combine client-side data fetching with server-side pre-rendering, because
it can be a pattern which you do need in other kinds of applications, where you wanna
pre-render a basic snapshot, and then still fetch the latest data from the client, and
therefore that is a pattern you should also know.

- Now we just wanna prepare some data on the server, then We initialize our state with
the pre-fetched data from getStaticProps, and render our initial data, And still when
this component then runs in the client it will fetch again to fetch the latest data

- then if we view the page source, we see now that our data is part of the pre-rendered page,
NOTE: Now if we reload again and the data would have changed between the point of time it was
pre-rendered and prepared and we visited this page, then we would see the updated data, since
it is fetched in the client, NOTE: but not in the page source.

**Final:
Now that's hard to simulate here in development since this will always trigger getStaticProps
for every visit, but it's easier to show if I build this for production and I remove revalidate.
*/
//? Old ==========================================================================
/**
**[What's The Deferent Between getServerSideProps and getStaticProps?]
- is that getServerSideProps function will now not run during the build process,
but instead always on the server after deployment, Any code we write in getServerSideProps
will always run on the server never in the client, So we can run the server side code in there,
we can also perform operations that use credentials that should not be exposed to our users,
because this code only runs on the server.

- getServerSideProps receive The context parameter, and in this context parameter
we get access to the request object, and the response object that will be sent back.

- Ultimately, we then don't return a response by working on that response object,
but instead, we return an object with the props key, which holds all the props for
our page component function.

- NOTE: we don't have access to request and response objects in getStaticProps unlike
getServerSideProps.

*TODO| Summary:
- So that is how we then can use getServerSideProps for preparing
that data for our page.

-TODO: with that the page is really pre-generated for every incoming request.
*/
//!==========================================================================
/**
**[Final: what these functions (getStaticProps & getServerSideProps) do?]
- we can prepare data for our component ahead of time or on the server, so
that we can serve a finished page to the client, that can offer a better user
experience to our users, it can also help us with search engines, since search
engine crawlers also see the finished page.

- They allow us to fetch data for pre-rendering pages, So that we pre-render the pages.
*/
//!==========================================================================
