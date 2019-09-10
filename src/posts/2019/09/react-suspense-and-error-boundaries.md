## React Suspense

Suspense in React is an API to render conditional UI. It lets you render a particular component while waiting for another component to load. This can be useful in many scenarios, say

- Your user is waiting for a page section to load. You can show an animated loader while it loads
- You are displaying a complicated visualization that requires some backend to return data after cruncing some numbers. You can show an overview of the original data while it loads

To understand the API for React Suspense, we'll look at a simple Suspense in an example

```javascript
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
Here, we are wrapping a lazily loaded component with a `Suspense` and displaying a `fallback` till the time it's not loaded. Naturally, a `Suspense` only makes sense for lazily loaded components, as statically loaded components would already be available on page load.

That's it for React Suspense. What do you think of this newer succinct API for conditionally rendering components? Do you prefer the older way of using higher-order components? Let me know in the comments.
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6ICdSZWFjdDogU3VzcGVuc2
UgYW5kIEVycm9yIEJvdW5kYXJpZXMnXG5hdXRob3I6IFNhaWth
dCBEYXNcbnRhZ3M6ICdyZWFjdCxyZWFjdGpzLHN1c3BlbnNlLG
Vycm9yaGFuZGxpbmcnXG5jYXRlZ29yaWVzOiAncHJvZ3JhbW1p
bmcscmVhY3QnXG5kYXRlOiAnMjAxOS0wOS0wNidcbiIsImhpc3
RvcnkiOlstMTA0NDUxOTQ0NSwxMTY0MDM1ODQ3LDIxMTEwMDg5
NzldfQ==
-->