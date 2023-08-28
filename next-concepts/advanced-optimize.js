/**
**[Adding "head" Metadata]
- The content is there on our pages, We do have the content visible on the screen,
and that's the most important part, of course, but we are missing the description meta tag,
which would be important for search engines, And we're also missing a page title,
so adding such Head elements to our pages is thankfully very simple with NextJS.

- And to do that, we can import a special component offered by NextJS,
the Head component imported from next/head, This is a component which allows you to add
Head elements to the Head section of your page, You simply add it to your returned JSX code.

*? Summary:
- all the HTML elements, which you can add in the Head section,
we can add them in Head component.
*/
//?==========================================================================
/**
**[Adding Dynamic "head" Content]
- we can Adding Dynamic "head" Content in Dynamic pages
*/
//?==========================================================================
/**
**[Reusing Logic Inside A Component]
- reusing is simple, Now, reusing here is simple, We can use a standard React.js approach.
*/
//?==========================================================================
/**
**[Reusing And Working with the "_app.js" File (and Why)]
- reusing is simple, Now, reusing here is simple, We can use a standard React.js approach.

- For Example set meta viewport For All Pages
*/
//?==========================================================================
/**
**[Merging "head" Content]
- Now we have to have the <Head> element there in appJS and we of course still also have it
in our page components, And as you see on the rendered page, both is applied.

- NextJS automatically merges multiple <Head> elements, But of course that means that we could
also have conflicts, For example, I could have Two <title> in the same page, we will see
the just the last title, because It simply takes the latest element.

- that means in _appJS, we can indeed and also define a general title that applies to all pages,
unless it's overwritten, This ensures that we always have a title on every page, even if we forget
to set a page specific one.
*/
//?==========================================================================
/**
**[The "_document.js" File (And What It Does)]
- Now the _app.js file is not the only special next JS file, There also is the _document.JS file,

*! what does _document.ja do.
- Document JS allows you to customize the entire HTML document, So all the elements that
make up an HTML document.

NOTE: Very important the head component, which we are importing here is not the same head component
as we import from next head These are different components, Head from next/head is important to use
it anywhere in your JSX code to adjust the head content of the rendered page, head imported
from next/document should only be used in this special document component.

*! Now what could be reasons for overriding that default document structure?
- We could add other elements here to the body, like for example a div with an id of overlays,
TODO: why might we wanna do that? Well this allows us to add HTML content outside of our application
component tree, For example for using those elements with react portals then

- and this can sometimes be useful, because you are next to JS application is in the end rendered by
this main component, but adding extra elements can sometimes also be beneficial, and therefore If you
need to edit the overall HTML document.
*/
//?==========================================================================
/**
**[A Closer Look At Our Images before Optimizing]
- if I open the developer tools and we go to the Network tab, If we then empty the cache
and hard reload by right clicking on the refresh icon, we make sure that we reload all the data
for this page, including the images, our images five and four megabytes, The reason for this is that
these are huge un-optimized images, which are fetched in full size and quality, And we are also always
using the same image type(jpeg).

- no matter if your browser maybe supports a better type, For example, Chrome would support the (webp)
image type, which is an optimized image format, Now for development, that's no problem, but this would
not be okay for production These would be way too big images.
*/
//?==========================================================================
/**
**[Optimizing Images with the "Next Image" Component & Feature]
- Optimizing images with Next.js is easy, we can import a Image component offered by Next.js,
Now, this is a special component, And when we use it, TODO: Next.js will create multiple versions
of our image on the fly when requests are coming in:
- optimize for the operating systems and device sizes that are making the request, And then
those generated images will be cached for future requests from similar devices.

- Now that's working because Next.js generates optimized images on the fly, and we can see
those generated images in the .next folder They're in the cache folder, And in there we have
a couple of folders, which in the end contained the images.

TODO: And these are the optimized images, which are generated when they're needed,
So they're not generated in advance, but when a request reaches the page, But then
they are stored so did future requests from a similar devices immediately get that already
generated image.

- Now besides the size optimizations, the image component also have a never nice benefit,
if we're on a smaller screen And I then reload, If I clear my network tab, watch what happens
if I increase the screen size, as it increases you see a new request is made, That request is being
made, because by default images are lazy loaded, Which means if they're not visible, Next.js will not
download them, Now they are only loaded when they're needed, and that further decreases the amount
of requests we're making in advance ("We don't load what we don't need").
*/
//?==========================================================================
