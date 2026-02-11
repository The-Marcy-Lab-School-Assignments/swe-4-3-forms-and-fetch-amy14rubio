# Short Response Questions

## Question 1: Promise Chaining

The following code logs `undefined` in the second `.then()`. Identify the bug and fix it.

```js
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
  })
  .then((data) => {
    console.log(data); // undefined!
  })
  .catch((error) => console.error(error.message));
```

---

The bug in this code is that the first `.then()` **does not return** its parsed JSON promise, meaning that the second `.then()` **does not have data to handle**. This would be fixed in the following way:

```js
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
    return readingPromise; //returns the parsed JSON promise for the next .then()
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error(error.message));
```

## Question 2: Development Servers and CORS

A student opens their `index.html` file directly in the browser (using the `file://` protocol). Their `<script type="module">` tag and `fetch()` call both fail. Explain why, and what they should do instead.

---

This happens because the `file://` protocol only allows us to access files located in our own computer **without hosting it on a local development server**. Using the `file://` protocol means that the browser **prevents importing and exporting modules** across files and **fetching data from third-party APIs**. The student should instead use a platform such as Vite to **serve local files over HTTP** and **ensure the application can fetch** as it would in production.

## Question 3: The `fetch` Response Object

When we use `fetch()`, why do we check `response.ok` before reading the response body? What kinds of errors does this catch that `.catch()` alone would miss if we skipped this step as shown in the code below:

```js
const response = await fetch(url);
const data = await response.json();
```

---

We check `response.ok` to make sure that there weren't any **HTTP failures** (like 404 or 500) from our url. If we skipped this step, `.catch()` would not run and the code may **incorrectly treat a failed request as successful**.

## Question 4: Async/Await Conversion

Rewrite the following `.then()`-based code using `async`/`await` with `try`/`catch`:

```js
const getJoke = () => {
  return fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart')
    .then((response) => {
      if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
      return response.json();
    })
    .then((data) => {
      return { data, error: null };
    })
    .catch((error) => {
      return { data: null, error };
    });
};
```

---

```js
const getJoke = async () => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart');
    if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
```

## Question 5: `event.preventDefault()` and Form Handling

A student writes a form handler but the data never displays. Their code:

```js
form.addEventListener('submit', (event) => {
  const name = form.elements.name.value;
  document.querySelector('#output').textContent = name;
});
```

What is wrong? What happens when they click submit, and how do they fix it?

---

What's wrong with this code is that the form was **never prevented** from performing its **default action**. The data never displays because most forms **reload or redirect** to a new page as their **default action**. To prevent this from happening, `event.preventDefault()` **must be called** at the start of the event listener.

## Question 6: Putting It All Together

The steps below describe how to build a form that fetches Pokemon data from `https://pokeapi.co/api/v2/pokemon/{name}` based on the name entered in the form and displays the pokemon's data on the page. The steps are listed in a **random order**. Rearrange them into the correct sequence.

- A. Parse the response body with `await response.json()`
- B. Call `event.preventDefault()` to stop the page from reloading
- C. Check `response.ok` and throw an error if the response failed
- D. Update the DOM with the Pokemon's data
- E. Add a `'submit'` event listener to the form
- F. Handle errors in the `catch` block (display an error message)
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- I. Reset the form with `form.reset()`
- J. Create the HTML form with a name input and output elements for displaying results

---

- J. Create the HTML form with a name input and output elements for displaying results
- E. Add a `'submit'` event listener to the form
- B. Call `event.preventDefault()` to stop the page from reloading
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- C. Check `response.ok` and throw an error if the response failed
- A. Parse the response body with `await response.json()`
- D. Update the DOM with the Pokemon's data
- I. Reset the form with `form.reset()`
- F. Handle errors in the `catch` block (display an error message)
