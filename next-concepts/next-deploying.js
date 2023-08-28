/**
**[Building NextJS Apps: Your Options]
- we have two totally different ways of building and deploying your Next.js app.

*?-1 Standard Build:
- You do a standard build by running the next build command, When running this command
Next.js produces an optimized production build, optimized production bundles for your application,
NOTE: and very important, it spits out a server-side application.

- The result of running next build is an output that requires a NodeJS server to run it,
So you can't take the output of next build and put it onto some static host, You would be
able to do that for a standard React app, a non Next.js app, because Next.js has these
built-in service-side capabilities, TODO: like pre-rendering pages on the fly, on the server,
revalidating pages, API routes, TODO: Because it has these service-side features it needs
a NodeJS server to run that code.

- we also need a NodeJS server for dynamic pages, NOTE: with getStaticPaths() if you have fallback
set to true or blocking, because then some of the pages will be created on the fly when requests
are reaching the server, so you need a server that is able to do that.

- And that has implications, It means that when you deploy that output, you need to deploy
it onto a host that is able to run NodeJS.

*TODO| So that is why we need a NodeJS server for running the output of next build given to you.

*?2 Full Static Build:
- For some projects, the full static build is a good option though, You get that by running
next export, another command, We could run this in our project by adding a script for that
in package.json, we could add a export script where we then run next export.

- Now next export does something totally different than next build, It also produces
an optimized production version of your application, but it produces a 100% static application,
which means only HTML, CSS and JavaScript, no server-side code, and therefore for hosting such
a website, you don't need a NodeJS server, Which makes hosting easier because you don't need
to worry about scaling and so on, So having a static app, which doesn't require a NodeJS server,
isn't too bad, It can definitely make deployment a bit easier, but next export isn't always an option,
but next export isn't always an option, there are certain next features, which you just can't use
in such a application, Like API routes, service-side pages, page re-validations, staticPaths with
fallback set to true or blocking.
*/
//!==========================================================================
/**
**[Key Deployment Step]
-1 The first step should always be, that you double-check all your pages, you make sure
you added all the head metadata, remove console.log statements, shrink code as much as possible,
remove unnecessary dependencies.

2- You wanna double-check your configuration, and you especially wanna consider working with
environment variables for data that might not be the same during development and during production,
For example, in our blog application we have an API route where I connect to a database, My connection
string is hard-coded in the API route, so I always use the same user, the same cluster, the same database,
It's more realistic that I want to use some development dummy database during development, and switch
to a different database, and maybe also an entirely different cluster and user for production,
TODO: And, therefore, we want to swap this connection string dynamically, depending on the environment
in which we're running, NOTE: Another use case could be API keys, If you're using the Google Maps SDK.

3- you should to do a test build and test your production-ready app on your local machine, Since
we just need a node server for running it, And we should do that to make sure that everything works.
*/
//!==========================================================================
/**
**[Checking & Optimizing Our Code]
- The great thing in NextJS has lazy loading built in, You don't need to worry about it,
Your different pages, are already lazy loaded, So the code for them is only fetched on demand
when we visit a page, So that built-in lazy loading is a very nice feature to have.
*/
//!==========================================================================
/**
**[The NextJS Config File & Working With Environment Variables]
- This is a special file, And it's a file, which exports a JavaScript object
with Node.js export syntax(module.exports), and that's now our object which allows
you to set various configuration options.

- config environment variables, And the idea really is that in our API route, we swap out some
of these values, from this connection string for dynamic values, which can then differ between
development and production, So that we can have a development database connection and a production database.

- And to make that work, I'll go to that next config file and add the env key, This allows
you to set up key value pairs of your choices, and you will then be able to use your keys
in your code, both in the API routes, as well as in any other component, So you can use your
environment variables anywhere in your code base, Like(mondoDB userName, password).

- TODO: we use those Variables Environment by tapping into the global process variable, which
is exposed by Node.js, then dot .env and then into the key name of our choice, Now this
placeholder will be replaced with the concrete value during the build process, So this
will not be resolved to dynamically after we built the app, but it will be swapped out
during the build process, And that allows us to replace it with our environment variable value,
And it allows us to use different values, for building for production, then during development.

- Now, environment variables are only helpful if we don't always use the same values,
to next.config.js, And therefore for in next.config.js we can actually define different values,
for the environment variables, for the different phases we might be in, To be precise, when we
run NPM run dev, Our current phase is development, If we run NPM run build, Our current phase
is production, And because we have this clear way of telling Next.js whether we're building
for development or production, Next.js allows us to define different sets of configuration values
for development and production, for this we need to import from const { PHASE_DEVELOPMENT_SERVER }
= require("next/constants");

*!What's The benefit if we doing this?
- The benefit is that now we can tap into those values, And when we then deploy our application
we can override these values


*? See in Next Docs => next.config.js Options
*/
//!==========================================================================
/**
**[Running a Test Build & Reducing Code Size]
- before we get to deployment, it's time to do a test build on our local machine, And for this
I wanna run (npm run build) command, which builds our application for production, then we get
useful information shown to us in terminal.

- if we have red warning for our pages, this because These pages are too big, they contain
too much JavaScript, We could deploy it, it wouldn't break, but this is a clear indicator
that we might be doing something in those pages which is not optimal, We might be shipping
too much code, NOTE: And very often that means that you're using some third party package,
some third party library that is too big.

- TODO: So therefore, before we deploy something, let's fix this issue, And our problem
in our blog app is react syntax highlighter(This is huge), then what we wanna do is we
shrunk the kilobytes.

*? Summary:
we need to Running a Test Build and check The our Packages and kilobytes.
*/
//!==========================================================================
/**
**[Deploying Next.js Projects]
- we run the build script to build our project for production, So to optimize
all our code, minify it, And you wanna run this if we do deploy it on another
host(Not Vercel), So we don't need to do it with Vercel.

- And then once we run this command this will give you a .next folder which contain
this production output, some of these optimized files, will also contain all those
pre-generated page files, those HTML files for your pages.

- NOTE: So this is what npm run build will do for you and Vercel execute this command,
on our behalf on their servers, So we don't need to do that.

*!Now, how would we deploy our page done in the end?
- Well, in the end, you can take your entire project folder and just move that onto
a node JS server, So onto some remote computer that supports node JS, and then on that machine,
you would run npm install to install all the dependencies again, and then npm start(runs next start),
TODO: and that will then use that build output, and npm start bring up the production server,
and we can test this locally here, by run npm start, we now again hosting this on localhost 3000,
NOTE: but this is now the production ready application.

*TODO| Finally:
therefore, you can use any hosting provider that supports node JS, Just upload your project code,
run npm install on that provider's machine, and then npm start, NOTE: and then make sure that internally
you forward port 3000 to port 80 to the outside world.

- Now to ensure that it really works we'll also need to go to MongoDB Atlas,
There under network access you will need to make sure that you (allow access from anywhere),
This ensures that the Vercel servers on which our application will run, will be able
to connect to MongoDB, then our data can be loaded and stored.

TODO: Vercel will build our application and then start it, and it will automatically build
our pages, and pre-rendered pages, it will host those on a CDN then, which is optimized for speed
and has great caching settings, and it will then also, take our API routes and put those into
serverless functions, which are executed on demand and scale infinitely in a cost effective way.
*/
//!==========================================================================
/**
**[A Note On Github & Secret Credentials]
- config file with the environment variables, We are using that file for our development
and production environment variables, Now this file is part of our GitHub repository, And
it needs to be so that Versal is able to read that file after deployment, The problem
with that could be, that this file can be read by anyone who has access to your repository,
if this repository is puplic.

You should make sure that you only include this conflict file in your GitHub repository,
if you can rule out that unauthorized people are able to view that file, If you can't rule
out that that's the case, you should not include this conflict file in repository.

- TODO: instead, for production, you should set environment variables through that
environment variables feature Vercel offers, So you wanna use that instead of using
the conflict file for environment variables, if that file could be read by people
that should not have access to the data in the file.
*/
