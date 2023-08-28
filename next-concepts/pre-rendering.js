/**
**[How NextJS Prepares & Pre-renders Pages]
- if a user wants to visit any page in our app, then what Next.js does is it will return
a pre-rendered page And that's a difference to standard React app, With standard React you get
back an empty HTML file and all the JavaScript code, And then that JavaScript code runs
in th browser and brings Content onto the screen and maybe fetch data from a server.

- with next.js Instead of loading data only after the page was sent back to the client,
Next.js pre-renders a page and pre-renders all the HTML content with all the data that might
be needed It loads that in advance, and then pre-generates the finished and fully HTML page,
which can be sent back to the client.

- we also want to have an interactive React app, And therefore Next.js will not just send back
this pre-rendered page, but it will also send back all the JavaScript code that belongs to it,
and that JS code will then take over that pre-rendered page, NOTE: and again let React do its job.

- now we have an interactive page or app, But we did send back that pre-rendered page initially,
and so that search engine crawlers also see that entire page with all the content.

*?Summary:
- So that's the idea of pre-rendering, Next.js, prepare a page in advance by pre-building all
the HTML content, and by pre-loading all the data that will be needed.
*/
//!==========================================================================
/**
**[The difference between static generation & server-side rendering]
*? static generation:
- all the pages are pre-generated in advance during build time, So when you build
your application for production, before you deploy it, you prepare all those pages,
and will be reused on each request.

*? server-side rendering:
- pages are generated just in time after deployment on each request reaches the server.
*/
//!==========================================================================
/**
**[Static Generation with "getStaticProps"]
- The idea is that you pre-generate a page during build time, by default our page
is not pre-rendered on the fly on the server when a request reaches the server,
but instead it is pre-rendered when you as a developer build your site for production,
And pre-generate means hat all the HTML code is prepared in advance on the server side.

- once We deploy Our Pages, they can be cached by the server, by the CDN that might be serving your app,
those pages after they were served are still hydrated with your React app, So, you still have a regular
React app in the end, and those pages will then be reused on each request.

*! how do we tell Next.js that a certain page should be pre-generated
*!and which data is needed to pre-generate a page?
- there is a specific function which we can export from inside our page components,
we can export the special async function, TODO: getStaticProps(), It must be written exactly like this,
because that is then a function Next.js will watch and find it, it executes it not on the fly on the
server but it executes this function during this pre-rendering process, when it pre-generate a page.

- And then, the special thing is that in this function, you can run any code that would normally
run on the server side only, NOTE: and you don't have access to certain client-side API, NOTE: you
don't have access to the window object, for example.

NOTE: And even better than that, code that you write inside of this getStaticProps function,
will not be included in the code bundle that's sent back to your clients, So, any code
you put in there, will never be seen by your clients, So, if you for example have code in there
that contains database credentials, You can safely write it inside of getStaticProps,
because will never be seen by your clients.

*! what's The Deferent Between (Static) And (SSG)?
- The only difference is that here we got no initial props in static,
So we have no initial data that was fetched in our page, so will
always stay a static page with no content fetched from the database.
*/
//!==========================================================================
/**
**[A Look Behind The Scenes]
- when you are ready to deploy your next application, and run next build command which has executed
in the end, this will then pre-generate your pages, And to show this, we need to executed npm run
build command, So we'll execute this build script, and therefore next it's now creating that
optimized production build, in this project folder.

- And if we have a look at the .next folder, which was generated now, which holds this production
ready code, Which holds the output of the npm run build command, Then in there we do have a server
folder, And in there we see those pre-generated HTML files, and if we open index HTML, we also
find that products data, because that's the pre-generated page which we also see if we would visit
this page in the browser, And that's that pre-generated page which is sent back on the initial request.

- And we can even preview this production ready page here by running npm start, it starts
the production ready page with a nodejs server, but this now is not the development server,
but it the real server serving the production ready page.

NOTE: in the page source, you'll also see there is some script tag injected by next.js,
which in the end includes that data, That is needed for this hydration, where the pre-rendered
HTML code is then connected with the react application and that data, so that the react application
knows that this was dynamic data
*/
//!==========================================================================
/**
**[Utilizing Incremental Static Re-Generation (ISR)]
- We can execute getStaticProps() as a server-side code, but in the end the code will not run
on the actual server, which serves our application, instead it runs on our machine, when
the page is built, when the application is built with next.

- So in the end, when you run, npm run build, When you execute this script, which executes next build,
to create that production build, then the code is executed, that is good but it has one potential downside.

NOTE: pre-generating the pages sounds great if you're building something fairly static, If you're
building a blog, where data doesn't change too often, then whenever you add a new blog post,
you can just pre-generate your project again, you can run => npm run build again, and deploy
the updated project, So that would work, But it's a old and tired.

*! What if you have data that changes frequently?
- if we add a new product to our products, after the page was deployed, then we have to re-build
and re-deploy the page all the time?

*? therefore, Next.js also has solutions for this:
- Next.js has a built in feature, which is called incremental static generation, It means that
you don't just generate your page statically once at build time, but that it's continuously updated
even after deployment without you re-deploying it, So you pre-generate a page, but then you can also
tell Next.js that a given page should be re-generated again, for every incoming request at most
every 60 seconds, for example, That means that if a request is made for a certain page and it's let's
say less than 60 seconds since it was last re-generated, the existing page would be served to the visitor,
But if it's past those 60 seconds, then this page would be pre-generated on the server instead.

- So that means that you either serve the old page if it's not that old yet, or you serve
the latest page and brand new page which was generated again,NOTE: And if that page was pre-generated
again on the server, because it was outdated, then this newly generated page will replace the existing
old page on the server, It will be cashed and future visitors will see that re-generated page instead,
Until 60 seconds passed again, and then new page is pre-generated again, So you can have ongoing
pre-rendering on the server for incoming requests.

- And all you need to do to unlock this is in the object, which you return in getStaticProps,
You don't just return props, but you also add a second key, which is called revalidate, And as a value
you set a number, which is the time in seconds that Next.js should wait until it re-generates the page,
NOTE: Now during development, the page will be re-generated for every request, no matter what you enter here,
So with the development server, we will always see the latest page with the latest data, we can see this
in the console.log() in getStaticProps.

*TODO|Summary:
you have the best of both worlds, You have a pre-rendered page, which then still is updated
after deployment.
*/
//!==========================================================================
/**
**[ISR: A Look Behind The Scenes]
- we can see, this revalidation in production so to say, So now if we run npm run build,
then TODO: this entire project is prepared for production, then you also see ISR option
is checked which stands for Incremental Static Re-generation, And here we see that 10 seconds
is locked in, So basically next JS recognized that we set this to 10 seconds, and it know
the starting page, Home page should be re-generated every 10 seconds.

- Now we can run our build production ready website here locally on our machine
with npm start, NOTE: so not npm run dev that would start the development server,
TODO: So after npm run build, we can run npm start.

- And keep in mind that this terminal represents the server side, because here we started
the server with npm start, So what we see here is output from the code that runs on the server.

*? Very Important:
- This proves that indeed getStaticProps function was executed and run again on the server
which is running our production ready site, not in the browser and not during build process,
but on the server, after it was deployed.
*/
//!===============================================================================
/**
**[Working With Dynamic Parameters]
- getStaticProps receive a Parameter called context, Because indeed this function which is called
by next.js receives an argument, we do get an object as our argument, with some extra information
about this page when it's executed by next.js, for example, we would get any dynamic params, any
dynamic path segment values from this page(url), We do get access to that by params key in context,
that is one of the properties inside this context object, And params is an object full of key values
for the dynamic path segments, all this code in getStaticProps currently, NOTE: but then we got
an error getStaticPaths is required for dynamic SSG pages and is missing?
*/
//!===============================================================================
//? Old ==========================================================================
/**
**[How Pre-rendering Works & Which Problem We Face in React Apps]
- So that means that, the first time the homepage component is rendered,
loadedMeetups will be an empty array, Then this effect function will execute,
it will then update the state, and then this component function will execute again.

- we'll have two component renders cycles, and the first time this component renders,
loadedMeetups state will be this initial state(empty array[]).

- Because if we would fetch this from a backend, our users might see a
loading spinner briefly, which could not be the user experience we wanna offer.

- Because of these two render cycles, we have a problem with search engine optimization,
If we viewed a page source, we will notice that in there, the actual meetups data is missing,
we got empty un-ordered list, So these items are missing in the HTML content,
NOTE: and they are missing because they are only rendered in the (second component execution cycle).

- But the pre-rendered HTML page generated by NextJS automatically does not wait
for this second cycle, It always takes the result of the first render cycle
and return state as the pre-rendered HTML code.

*?Summary:
- this we'll face the problem that Next JS does not wait.
*/
//!==========================================================================
/**
**[Server-side Rendering Feature]
- server-side rendering is all about preparing the content of a page
on the server instead of on the client-side(browser).

- If you take a standard React application build with just React,
then if you inspect the source code of a loaded React page, you will notice
that the page is actually pretty empty right from the start,
You only have a basic HTML skeleton there, And div with an id root typically
into which the React app is loaded and rendered, But all of that rendering, is done by React,
all that rendering happens on the client(browser) of users, it's not happening on the server.

- search engine crawlers will actually only see that initially empty HTML page
which we're getting from a server, So that content is not picked up by search engine crawlers
and that can be a problem.

- And that's where a server-side rendering could help us,
If that page would be pre-rendered on the server if that data fetching
on the server when the request hits that server, and then the finished page
would be served to our users and to the search engine crawlers, then users
would not have that flickering loading state(better user experience),
and search engines would see our page content.

- And that's the problem server-side rendering solves, It allows us to pre-render
React pages, React components on a server.

- NextJs automatically pre-renders our pages, and that means that with NextJS
if we build a standard NextJS app, without any extra setup from your clint side,
if we visit such a page, it was pre-rendered on the server by default out of the box.

- NOTE: Now it is worth noting that with NextJS, after this initial load is offered as the initial request,
we still get a standard React app running in the browser, a standard single page application even.

- when the user browses our page and navigates around, those actions are
all handled by React in the browser to have this fast interactive user experience.

*TODO| Summary:
- that in the end, means client-site and server-side code is kind
of blended together with NextJS.
*/
//!==========================================================================
/**
**[Client-Side Data Fetching in Dynamic Filtered Events Page[...slug]]
- It just happens to fit in quite well in this exact scenario, we can
just using Client-Side Data Fetching in this scenario
*/
