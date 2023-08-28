/**
**[What is NextJS?]
- The React Framework for Production, NextJS offers a lot of features that make building
large scale production ready, React apps easier(a full stack framework for ReactJS.)

- Now NextJS is labeled a framework and a framework that builds up on React.

- Now the difference between a framework and a library in the end is that
a framework is bigger, It has more features than a library, It's focusing on more
things instead of just a single thing, And it's also giving you clear rules,
a clear guidance on how you should write your code, how you should structure your files
and so on, And all these are things which NextJS does.

- NextJS has the goal to make the life easier for you as a React developer,
it enhances React by adding many core features which you have to add to React
apps on your own otherwise, Things like routing, but also many other things.

- we don't have to add as many third-party libraries
to solve common problems, which you need in bigger apps.
*/
//!==========================================================================
/**
** [scripts and npm run dev]
- we can start development server bt run npm run dev, that development server
is given to us by that NextJS project setup.

- That is a built-in server which serves our Next JS pages and the overall application,
It will watch our code and whenever we save changes to files, it will automatically
re-load and update the pages we see in the browser and it will, in general, give us
a great development experience.

- Later, once we're ready to deploy our application, we're going to run npm run build
to build it for production to produce an optimized output for deployment.

- npm start later then to start this optimized server, because we are working with
a real server here, a Node.js-based server, since we need that page pre-rendering,
which happens on the server.
*/
//!==========================================================================
/**
**[Analyzing the NextJs Project Folders]
- Public Folder Don't have a html file And the reason for this is that NextJS
has this built-in pre-rendering, And while it gives you a single-page application
that single page is dynamically pre-rendered when a request reaches the server,
so that you do return an initial page with content.

- when i add images folder in Public Folder is then served statically by next JS,
because next JS will make sure to serve any contents that's stored in the public folder
as part of your overall application, then i can use images in css or jsx code.
*/
//!==========================================================================
/**
**[_app.js root file]
- This special component acts as the root component Next JS will render.

- It receives props and uses object de-structuring here to pull information out of the props,
and the information it pulls out there, is a component prop and a page prop,
These props are passed into this MyApp component automatically by NextJS.

- and component is a prop that holds the page contents that should be rendered,
So it will be different whenever we switch a page, and page props are specific props,
our pages might be getting.

*? Summary:
- in this _app.js file will in the end be the actual page contents of our different pages,
And it will change whenever we navigate from page A to page B.
*/
//!==========================================================================
/**
**[Deploying Next.js Projects]
- we run the build script to build our project for production,
So to optimize all our code, minify it, And you wanna run this if we do deploy
it on another host(Not Vercel), So we don't need to do it with Vercel.

- And then once we run this command this will give you a .next folder,
which contains some of these optimized files, will also contain all those pre-generated
page files, those HTML files for your pages.

- NOTE: So this is what npm run build will do for you and Vercel execute this command,
on our behalf on their servers, So we don't need to do that.

- Now to ensure that it really works we'll also need to go to MongoDB Atlas,
There under network access you will need to make sure that you (allow access from anywhere),
This ensures that the Vercel servers on which our application will run, will be able
to connect to MongoDB, then our data can be loaded and stored.
*/
//!==========================================================================
/**
**[Using Fallback Pages & Re-deploying]
- We can set fallback to true, or even better, to 'blocking', When we set
fallback to true or to blocking, we're telling NextJS that the list of paths,
which we're specifying, might not be exhaustive, so there might be more valid pages.

- And, therefore, when fallback is set to true or to blocking,
NextJS will not respond with a 404 page if it can't find the page immediately,
instead, it will then generate that page on demand, and thereafter cache it,
so it will pre-generate it when needed.

*? Now the difference between true and blocking:
- with true, it would immediately return an empty page,
and then pull down the dynamically generated content, So you need to handle
that case that the page does not have the data yet.

- With blocking, the user will not see anything until the page was pre-generated,
and the finished page will be served.
*/
