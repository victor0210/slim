# State
**State** uses a single object to store the state tree—yes, with an object containing all the application-level state. A single data source is more convenient for us to take snapshots of each phase of the state, and it can be more easily injected into homogeneous applications.

## Get state
The state of getting can only be obtained in the following way. Why is it through methods instead of directly accessing properties? Because the application needs to ensure that the **State** is not being operated when accessing the **State**, it is also guaranteed that the **State** obtained must be up to date.

```
store.getState()
```

## Aliases
In order to facilitate the better **State** module partitioning in the application, using **Alias** is a good choice. Imagine getting **State* when the **State** level is deep. * What a desperate thing to do, at this point you may need to define a set of getter methods in the program to get a specific **State**. Don't worry, here **Slim** has done it for you, you can quickly use **Alias**

```javascript
const state = {
    user: {
        name: 'victor'
    }
}

const aliases = {
    username: state => state.user.name
}

const store = Slim.createStore({
    reducers,
    state,
    aliases
})

store.getState('username')  // victor
```
