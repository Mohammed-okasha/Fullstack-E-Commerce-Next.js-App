/**
**[Extracting Dynamic Parameter Values using useRouter hook]
- To extract the concrete value entered in the URL when page is loaded,
Next.js gives us a special useRouter hook which we can use in react functional
components.

- import useRouter hook from next/router which is a sub package of the next package,
It's a regular react hook, just not one built into react,
but it is a hook built by the next team.

- useRouter hook give us an object, and on that router object
we then got certain pieces of data and certain methods which we can call,
on this router object we've got query property which gives us access to a nested object,
and on that query object we then have the identifier which we chose between
the square brackets as a property.

*! How useRouter hook Works:
- It runs immediately when the pages first rendered.
- and at this point it doesn't yet know what's in the URL, but then once we have that
information the component renders again and we got that concrete value from URl,
that is just how useRouter hook works.
*/
//!==========================================================================
/**
**[Using the "useSWR" NextJS Hook]
- Now, you can absolutely write this client side data fetching code on your own using useEffect,
there's nothing wrong with that, because this, of course, gives you full control over the
entire component state, But this is such a common pattern, that you could consider creating
your own custom hook to outsource this logic into it.

- then you can look into the SWR hook, This is a React hook developed by the Next.js team,
In the end, this is a hook which under the hood, still will send a HTTP request, by default
using the fetch API, which we also used, but it gives you a couple of nice built in features
like caching data, and automatic revalidation data and give you the most up-to-date data without
you noticing in a positive way, retries on error.

TODO: In our project, we need to install swr package With npm install.

- now, this hook wants two argument:
*? first is an identifier for the request it should send(URL):
And it's also called an identifier because this hook will bundle multiple requests to the same URL,
which are sent in a certain timeFrame into one request to avoid sending dozens of small requests.

*? the second argument
which is a async fetcher function which is a function that describes how the request should be sent
, But the default is that it will use the fetch API, then And the request to this URL will be
sent when this component is loaded.

- then it return An object with 3 value {data, isLoading, error }
*/
