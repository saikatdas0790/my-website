## Primer on React Context

The way data flows in React is uni-directional, from the top to the bottom, the parent component passes required data down into the children components. This is widely hailed as a game-changer as compared to two-way data binding as it makes reasoning about data easier which in turn leads to lesser bugs.

However, due to the inherent hierarchial nature of React components, components can easily get very deeply nested. Which means that, trying to share data between a parent and a child component separated by more than 3 or 4 levels of nesting becomes really *cumbersome*. You would have to pass the data through the `props` of each of the intermediate components in the hierarchy. Bummer!

![Bummer](https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif)

Enter :sparkles:**Context**:sparkles:

**Context** lets you share data between different levels of a component hierarcy starting at the parent component which is encapsulated in the *context provider*. What is a *context provider*, you ask?

Context works through two components:
1. Context Provider: This is where the data to be shared is initialized and shared from
2. Context Consumer: Once a context provider is initialized, any child component can access the data shared by the provider and it becomes the *context consumer*

## useContext in action
The new `useContext` hook is part of the context consumer. Context Providers still use higher-order components (Components that take a component and return another component). We'll understand the above through an example:
```javascript
import React from "react";

const ThemeContext = React.createContext("light");

const Parent = () => (
  <ThemeContext.Provider value="dark">
    <ChildOne />
  </ThemeContext.Provider>
);

export { ThemeContext};
```

Here, the Context Provider has a default value of "light" set when it is created. However, when it is used to wrap `ChildOne`, it is given a value of dark. The *Context Consumer* can now consume this value with useContext like so:
```javascript
import React, { useContext } from "react";
import { ThemeContext } from "./parent.js"

const ChildFive = () => {
  const themeValue = useContext(ThemeContext);
  // Now we can use themeValue in further code
}
```
Here we use the `useContext` hook to read the value from the passed Context object. Note that, the component will now re-render on changes in the context value.
This is a more elegant solution of consuming context as compared to the earlier way of declaring static properties on the class component.

That's it for `useContext`. Do you think it improves on the earlier Context API or is it just a fancy packaging over the old API? Let me know in the comments
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6ICdSZWFjdCBIb29rczogdX
NlQ29udGV4dCdcbmF1dGhvcjogU2Fpa2F0IERhc1xudGFnczog
J3JlYWN0LHJlYWN0anMsaG9va3MnXG5jYXRlZ29yaWVzOiAncH
JvZ3JhbW1pbmcscmVhY3QnXG5kYXRlOiAnMjAxOS0wOS0wMydc
bmZlYXR1cmVkSW1hZ2U6ID4tXG4gIGh0dHBzOi8vc3RvcmFnZS
5nb29nbGVhcGlzLmNvbS9kYWlseS5zYWlrYXQuZGV2LzIwMTkv
MDgvUmVhY3QlMjBIb29rcyUyMC0lMjB1c2VDb250ZXh0LmpwZ1
xuIiwiaGlzdG9yeSI6WzMzODE2NTk4NywtMzkzMzcsOTU5MTU2
NDI3XX0=
-->