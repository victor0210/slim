# Introduction

## What is Slim
Slim is a State-Non-Editable and centralized state management with Proxy.

### What is State Management
I believe that state management is no stranger to everyone, but here is a brief explanation: whether it is the application under the framework development (Vue, React), or the development without framework, when the engineering volume reaches a certain level, it needs to be Our various states are better managed so that subsequent applications are not as difficult to maintain as they are, and management status becomes extremely important at this time.

why? If the state is not effectively managed, when and for what reason, how the change will be unpredictable, debugging will become very difficult. But the benefits of state management are not everyone's deep experience. To give a simple example: If in an application without state management, someone makes some modifications in some places, the data flow becomes confusing and affects the final output of the program, but you can't quickly know where it is. Made a modification.

Therefore, the attention of state management is to extract the state that needs to be shared between components, follow a specific convention, and manage it uniformly so that the state changes can be predicted. According to this idea, a lot of patterns and libraries have been generated: Flux, Redux, Vuex, etc.

## Why Slim
Why are there so many state management tools that will have slim later? Here are some of the features of slim.

### Strong restriction

If strict mode is enabled in slim, the state modification limit will become abnormally strict. Any state modification outside the reducer (the management area of ​​the state change in slim) will not be allowed.

### Lightweight
Like the name, slim is a simple state management tool. For large applications, there is already a very mature state management architecture. Slim mainly provides state management for applications quickly and easily, providing developers with easy operation modes. State management adds limits to keep changes in a more concentrated place.

### More flexible
Slim provides three constraint modes, `strict`, `standard`, `loose`, which can be switched according to different needs.

### Easy to integrate
Slim provides the [Plugin](/plugin.html) mechanism, which provides a very convenient operation for slim integration into existing popular frameworks.
