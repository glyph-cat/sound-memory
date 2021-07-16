# `useState()` vs `useClassState()`
When using React's built-in `useState()`, we assume that it is for a specific
value, unlike how almost everything is kept in `this.state` in a class component.
They should be named like the examples below:

```js
// Note that we don't use the name "setState"
const [counter, setCounter] = useState(0)
const [isVisible, setVisibility] = useState(false)
const [name, setName] = useState('')
```

Now, there are times when keeping almost everything inside one object like in a
class component is more practical. This is where the `useClassState()` hook comes
into play. The initial state must be an object and you can set the state just like
how it works in a class. In order to not confuse the namings, it should be named
like this:

```js
const [state, setState] = useClassState({
  counter: 0,
  isVisible: false,
  name: '',
})
```

So that whenever we see `setState`, we can tell that it works just like `this.setState`
in a class component.
