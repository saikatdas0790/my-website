This is an overview on what React Hooks are and how to get started using them. This is going to be a multipart series on the common React Hooks and how to use them.

## What are React Hooks?

As Dan Abramov explains it,

> Hooks provide a more direct API to the React concepts you already know

What this means is that this is a new React API to use React features such as **state, context** or **lifecycle** with a newer, cleaner and more intuitive API.

It is cleaner as Hooks are just functions that you import into your code and they can be called from your regular function components. We do not necessarily need to use class components anymore to be able to have stateful components.

Let's look at the example provided on React Docs to understand what this means:
```javascript
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"const [count, setCount] = useState(0);

  return (
    <div><p>You clicked {count} times</p><button onClick={() => setCount(count + 1)}>
        Click me
      </button></div>
  );
}
```
Here, we are using the _useState_ hook to set some state for this component. The state here is a _count_ variable which holds the value of how many times the button has been clicked. The _setCount_ variable is a function, also returned by the _useState_ hook that lets us set the value for the _count_ variable.

![Mind Blown](https://media.giphy.com/media/1jnyRP4DorCh2/giphy.gif)

Compare this to the excess boilerplate that was class components. Below is the same component written with ES6 classes
```javascript
import React from 'react';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick  ={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
Not only is this code longer, but it requires using _this._ Now _this_ is one of those JavaScript features that, while going through code, always makes me pause and figure out what it is referring to. And being able to completely bypass that while writing my React components just makes me happy.

Also, note that React Hooks **do not** work inside classes

## List of Hooks

### Basic ones which will cater to 90% of use cases

-   useState
-   useEffect
-   useContext

### Rest of the Hooks

They are covered in great detail in the React Docs available [here](https://reactjs.org/docs/hooks-reference.html)

I'll be going through the basic hooks listed above in detail in subsequent posts
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6ICdSZWFjdCBIb29rczogQW
4gT3ZlcnZpZXcnXG5hdXRob3I6IFNhaWthdCBEYXNcbnRhZ3M6
ICdyZWFjdCxyZWFjdGpzLGhvb2tzJ1xuY2F0ZWdvcmllczogJ3
Byb2dyYW1taW5nLHJlYWN0J1xuZmVhdHVyZWRJbWFnZTogPi1c
biAgaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2RhaW
x5LnNhaWthdC5kZXYvMjAxOS8wOC9SZWFjdCUyMEhvb2tzJTNB
JTIwQW4lMjBPdmVydmlldy9SZWFjdCUyMEhvb2tzJTIwLSUyME
FuJTIwT3ZlcnZpZXcuanBnXG5kYXRlOiAnMjAxOS0wOC0yOCdc
biIsImhpc3RvcnkiOlsxNTIyMTMxMzIwLC00MzYzODkwNTYsLT
EwOTY2ODEyNzksLTI0NDUxOTY0NCwtMTA5NjY4MTI3OSwyMDI0
MTY1OTgzLC0zMzA0MjkzNjhdfQ==
-->