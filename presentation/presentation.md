### Presentation

#### Video-presentation

Link to presentation: [React.VirtualDOM](https://www.youtube.com/watch?v=n22EQx4xxls)

#### Slides

Link to slides-presentation: [React.VirtualDOM](https://rolling-scopes-school.github.io/zarembochka-JSFE2023Q4/presentation/slides/)

#### Presentation transcript

##### What is DOM ?

DOM stands for ‘Document Object Model’. In simple terms, it is a structured representation of the HTML elements that are present in a webpage or web application. The DOM is represented as a tree data structure. It contains a node for each UI element present in the web document. It is very useful as it allows web developers to modify content through JavaScript, also it being in structured format helps a lot as we can choose specific targets and all the code becomes much easier to work with.

##### Updating the DOM

Every time the DOM gets updated, the updated element and its children have to be rendered again to update the UI of our page. For this, each time there is a component update, the DOM needs to be updated and the UI components have to be re-rendered.
Rendering involves recalculating the styles, reflowing and painting the pixels on the screen. This process is known as pixel pipeline and can be resource-intensive, especially for complex and large DOM trees.
As a result, the more elements present in your website or web application, the more expensive the DOM updates may be, and the more frequent re-rendering of the DOM occurs.

##### Virtual DOM

React JS Virtual DOM is like a lightweight copy of the actual DOM or a virtual representation of the DOM. So for every object that exists in the original DOM, there is an object for that in React Virtual DOM. It is exactly the same, but it does not have the power to directly change the layout of the document.

##### How Does the Virtual DOM Work?

In React, everything is treated as a component, be it a functional component or class component. A component can contain a state. Whenever the state of any component is changed React updates its Virtual DOM tree.

The process of working with the Virtual DOM involves three main steps:

-   **Creating a Virtual DOM:** Whenever a React application is first loaded or rendered i.e component's state changes, a new Virtual DOM is created. This Virtual DOM representation is a tree of React elements.
-   **Diffing:** React compares the new Virtual DOM with the previous one. This process is called "diffing". During diffing, React figures out what has changed between the two Virtual DOMs.
-   **Reconciliation:** React updates the real DOM to match the new Virtual DOM, but it only updates those objects in the real DOM that changed in the Virtual DOM. This process is called "reconciliation".

In other words, React compares the pre-update version Virtual DOM with the updated Virtual DOM and figures out what exactly has changed in the DOM like which components have been changed. Once React finds out what exactly has changed then it updates those objects only, on real DOM.

React uses something called batch updates to update the real DOM. It just means that the changes to the real DOM are sent in batches instead of sending any update for a single change in the state of a component.

##### The differ algorithm:

The diffing algorithm is an O(n) heuristic algorithm predicated on two suppositions:

1. Elements of different types will produce different trees
2. We can set (using key prop) which elements are static and do not need to be checked

##### The React diffing process

React checks the root elements for changes and the updates depend on the types of the root elements:

-   **Element in different types:** Whenever the type of the element changes in the root, react will scrap the old tree and build a new one i.e a full rebuild of the tree.
-   **Elements of the same type:** When the type of changed element is the same, React then checks for attributes of both versions and then only updates the node which has changes without any changes in the tree.

In other words, when React compares two virtual DOM trees, it starts by comparing whether both snapshots have the same root element. If they have the same elements, then React moves on to attributes. If no attribute is present or updated in the element in both snapshots, then React repeats the procedure for the child elements.
On the other hand, if both snapshots have different element types, which is rare in most updates, React will destroy the old DOM nodes and build a new one.

##### Conclusion

React uses the virtual DOM as a strategy to compute minimal DOM operations when re-rendering the UI.
The virtual DOM provides a mechanism that abstracts manual DOM manipulations away from the developer, helping us to write more predictable code. It does so by comparing two render trees to determine exactly what has changed, only updating what is necessary on the actual DOM.
This significantly improves the performance and is the main reason why React and its Virtual DOM are much loved by developers all around.

##### Looking to the future

Currently, React doesn't automatically re-render on state change.
A way to optimise these re-renders is to manually use useMemo(), useCallback(), and memo APIs.
In React 19 will be represent React compiler, which will manage these re-renders.
React will be decide automatically how and when to change the state and update the UI.
