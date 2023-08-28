/**
**[File-based Routing Feature]
- Routing is We change what's visible on the screen(different components) based on the URL
without sending a extra request to a server because we stay in that single page application,
all that happen by React and React Router DOM.

- typically with React, routing is set up in code, And then often you end up storing
our components that act as pages in a separate folder.

- with Next.js, we create React component files, and we will then let Next.js to infer
our routes, in our project from pages folder structure, because Next.js
will automatically look into that pages folder to infer our route structure, So it
takes the file name as a path, with the exception of index.js, that's a special file name.

- NextJS gets rid of that in-code route definition, Instead, with NextJS
we would define pages and routes with files and folders, we have a special
pages folder in NextJS apps, and then we are structuring that folder,
defines the routes and paths your page supports.

- Now that simply allows us to get rid of that extra code, and write less code.

- it's a highly understandable concept because it's very close to how
we all started with web development, When we're getting started with just HTML
and CSS and some basic JavaScript, and adding multiple HTML files.

NOTE: We need to export the page component function, so that Next.js knows
which components should be rendered as a page.
*/
/**
//!==========================================================================
/**
**[Adding Nested Paths & Pages (Nested Routes)]
- Create sub Folders in Pages folder
- we call index.js file a root (root page)
- sub Folders, which we create in our pages folder also act as path segments.
*/
//!==========================================================================
/**
**[Creating Dynamic Pages (with Parameters) Feature]
- we use the same page over and over again for different Data for different content,
We would probably fetch the concrete content from some database when a user visits this details page
and then display it on the screen, So, it's the same component technically but with different content.

- then inside of the page, we simply have access to that value(news id) in the path
so that we can fetch the proper data, And that is something we can implement with dynamic paths.

- For that, we change the file name to a different file name, and we use a special syntax
which will be understood by nextJS, We use square brackets[], This is a special notation we
can use to add dynamic path, in the file name in front of the extension.

- If we have square brackets in our file name like this [newsId].js, this tells nextJS that
this will be a dynamic page, so that it should be loaded for different values in our path,
And then we can add an identifier.

NOTE: we can't predefine our different detailed pages for the different products,
because a, we might not know in advance how many products we'll have, and b,
even if we knew, it's always the same page, Just the data on the page will be different.
*/
//!==========================================================================
/**
**[Building Nested Dynamic Routes & Paths]
*? The First variation => nested dynamic paths:
let's say besides products slash productId, we also have another folder, the clients
folder, and we wanna construct a nested path here, where we have dynamic client id,
which can be different for the different clients, And then for every client id, we have some
static pages, like a list of all projects we did with that client.

- we can now also have another dynamic folder or file nested inside of the already dynamic
[clientId] folder.

- let's say for a selected client, we then have different projects, so here we have the clientProjectId
identifier file, So this could then be a page for an individual project. for a selected client.

- then in the nested Dynamic path we get two properties in the query from the url,
because we logging the inner component that is loaded for a file name with a dynamic segment,
which is inside of a folder with a dynamic segment, And you always get access to all the concrete values
in the url.
/**
//!==========================================================================
**[Adding Catch-All Routes]
*? The Second variation => Adding Catch-All Routes:
- Let's say, we also have a blog sub folder, and now we might have different ways of loading
blog posts, then maybe we also want to support other URLs for loading a single blog post,
For example, we want a support /blog/the-id-of-a-post but maybe we also want to support
/blog/2020/12/the-idea-of-a-post To only search for this post if it was released in December 2020,
Or we just want to load blog/2020/12 to load all blog posts for that specific month in that year.

- So, we have different URL formats which we want to support, and maybe we want to support them all,
with the same component, so no matter what the path is and how many segments it has we always want
to load the same component, And that's what we can do with such a catch all route.

- Instead of just using square brackets, we can add a syntax or a special notation,
We can add three dots(Like spread operator), then Next.js will treat it in a special way,
just as it treats all files with square brackets.

*! how next does it treat that file?
- Well, we still define a React component, so we could have the blog posts page
to load all the blog posts, But then we don't know if we get, for example, a path
with the year and the month, or just with the year, or with a specific blog post already,
depending on what we want to support in our pages.

- Now, we have an array of strings getting from the url, because we defined this as a catch
all paths with the three dots, next.js does catch anything after blog because we're defining
this in the blog folder.

- And now we could be using these values to send a request to our database, to filter
for blog posts where the year is 2023 and the month is 6.
*/
//!==========================================================================
/**
**[Linking Between Pages]
- We need to utilize a special component offered by Next, to be precise
offered by next/link, That's another sub-package which is responsible for linking,
and from there we can import Link actually as a default export, So importing the default export

- we are still on a single page application and the visible content on the screen
is actually just re-rendered by React, And that's great because that allows us
to combine the best of both worlds, We have this highly interactive and reactive
single page application here where we can manage and store states across pages.

- and yet, if a user would visit the page as an initial page by just entering this URL,
we would also be able to return the finished HTML page here,
So search engines would also see that finished page if they directly visit it,
But if we were on the website already we stay inside of that single-page app.

- and if we click on Link Component, it prevents the browser default of sending a request
at getting a new HTML page, Instead, it will load the to-be-loaded component for us.

- we can set a replace prop to not push this new page but replace the current page with it.

*? A Different Way Of Setting Link hRefs:
- Instead of providing a string you can provide an object, And here that's a special
kind of object Next.js expects, as an alternative to a string as a value for the ref,
And here we can set various properties Next.js is expecting, the path name, property,
we describe the path as it would lead to your file in the pages folder.

- And then we need to let Next.js know, what the concrete value should be that should be plucked
in for this ID here for this link, which we're building. And we do this through the query property
*/
//!==========================================================================
/**
**[Navigating Programmatically]
- by using useRouter Hook, and use the push method.
- push method pushes a new page onto the stack of pages, and it's
the equivalent of using the link component, Push also takes a path
to which you want to navigate.
*/
//!==========================================================================
/**
**[Adding a Custom 404 Page]
- And Next.js make Adding a Custom Error Page easy, You just need to add a special file
in your pages folder called 404.js

- it always load error page component when a 404 error arises.
*/
//!==========================================================================
/**
**[About the App Router]
- Now this approach where you use the App Router is an alternative way of building
NextJS apps, An alternative to using the Pages Router, which is the approach we'll
use in this course.

- The App Router uses a different project structure, a different folder structure,
and different features, The problem with it just is that despite the NextJS page telling
you that it's stable to use now, crucial features are missing there, To be precise,
this Server Actions feature is still in Alpha at this point of time.

- Now, Server Actions is a part of this App Router feature, and it is crucial for using
the App Router, because this Server Actions feature is a feature that will allow you to basically
handle POST, PUT, PATCH, basically all non-GET requests in your NextJS app.

- So if you wanna build a NextJS app where data can change, where users can submit forms,
for example, you will need these Server Actions to handle these changes on the backend.

NOTE: it's definitely not recommended for production yet, and once this App Router is fully
usable, max will update his next course to cover App Router Feature.
*/
