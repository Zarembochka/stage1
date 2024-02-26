# My typescript-essentials advantages:

## Badges:

1. **Getting Started with TypeScript**: [Badge](https://learn.microsoft.com/ru-ru/users/zarembochka-1067/achievements/dgmr7dnj)
2. **Declare Variable Types in TypeScript**: [Badge](https://learn.microsoft.com/en-us/users/zarembochka-1067/achievements/24f3m63v)
3. **Implement Interfaces in TypeScript**: [Badge](https://learn.microsoft.com/en-us/users/zarembochka-1067/achievements/fz99cjex)
4. **Develop Typed Functions in TypeScript**: [Badge](https://learn.microsoft.com/en-us/users/zarembochka-1067/achievements/j6qdnvlt)
5. **Declare and Instantiate Classes in TypeScript**: [Badge](https://learn.microsoft.com/en-us/users/zarembochka-1067/achievements/3x53etah)
6. **Generics in TypeScript**: [Badge](https://learn.microsoft.com/en-us/users/zarembochka-1067/achievements/x237wx8y)
7. **Work with External Libraries in TypeScript**: [Badge](https://learn.microsoft.com/en-us/users/zarembochka-1067/achievements/vky43rrm)
8. **Organize Code with Namespaces in TypeScrip**: [Badge](https://learn.microsoft.com/en-us/users/zarembochka-1067/achievements/hygkag68)

## Reflections:

1. **Getting Started with TypeScript**: TypeScript is a superset of JavaScript. The core feature of TypeScript is its type system. I can write a code in TypeScript, but then I need to compile a code into JavaScript.

    In this module I learned:

    - how to install Typescript
    - how to generate tsconfig file
    - how to compile .ts files to .js

2. **Declare Variable Types in TypeScript**: I need to declare a type for variables. I can do it with explicit type annotations or implicit type inference. There are new data types in TypeScript: enum (set of values), any (any JavaScript value with no constraints), unknown (type-safe counterpart of any), tuples (an array with a specific number of elements of one or more types.). In TypeScript I can use union and intersection types.

    In this module I learned:

    - types:
        - primitives types: boolean, number, bigint, string
        - any
        - enum
        - unknown
        - void
        - tuples
        - null
        - undefined
    - type assertion
    - type guards
    - union and intersection types
    - collection types

3. **Implement Interfaces in TypeScript**: An interface contains the names of all the properties, along with their types. It also includes the signature for functions along with the type of arguments and return type. A class or function can implement an interface to define the implementation of the properties as defined in that interface. The key difference between interfaces and type aliases is that a type alias cannot be reopened to add new properties, whereas an interface can always be extended. In addition, only a union or tuple can be described using a type alias.

    In this module I learned:

    - what is an interface
    - how to declare an interface
    - how to implement a new interface
    - how to extend an interface
    - what is the difference between an interface and a type alias

4. **Develop Typed Functions in TypeScript**: In TypeScript I need to type parameters and return values for functions. All parameters are required in TypeScript unless otherwise specified. I can define optional parameters by appending a question mark (?) to the end of the parameter name. I can can also assign default values to optional parameters. I can use rest parameters. I can define function types or interfaces and then use them when creating my functions.

    In this module I learned:

    - how to create functions
    - how to define function type
    - required, optional and default parameters in functions
    - rest parameters in functions

5. **Declare and Instantiate Classes in TypeScript**: In TypeScript the components od a class are properties, constructor, accessors and methods. All class members are public, by default. In TypeScript, I can control the visibility of class members by adding the public, private, or protected keyword before the member name. In addition, properties can be made readonly by using the readonly modifier. I can extend a class and override a methods. I can use an interface to ensure class instance shape. The key difference between interfaces and classes is that classes allow you to define implementation details.

    In this module I learned:

    - class componets
    - how to declare the class properties
    - how to define the class constructor
    - how to define the accessors
    - how to define the class methods
    - how to instantiate the class
    - access modifiers
    - how to define static properties
    - how to extend a class
    - how to override a method in the derived class
    - how to use an interfaceto ensure class instance shape

6. **Generics in TypeScript**: Generics are code templates that I can define and reuse throughout my codebase. Generics able to create a component that can work over a variety of types rather than a single one. Generics define one or more type variables to identify the type or types that you will pass to the component, enclosed in angle brackets (< >). Type checking is a key difference between generics and the any type.
7. **Work with External Libraries in TypeScript**: Work with modules in TypeScript is very similar to work with modules in JavaScript. I can export any declaration (such as a variable, function, class, type alias, or interface) by adding the export keyword or import it by using the import keyword. Any file containing a top-level import or export statement is considered a module. Modules import one another using a module loader. To compile modules, I need to specify a --module target on the command line or in the tsconfig.json file for the project. If I want to compile the TypeScript file for ES6 for use in a web browser, I need to use the command: tsc --module es6 filename.ts.
8. **Organize Code with Namespaces in TypeScrip**: Namespaces are a TypeScript-specific way to organize and categorize my code, allowing me to group related code together. Namespaces allow to group variables, functions, interfaces, or classes related to business rules in one namespace and security in another. Code inside a namespace is extracted from the global scope and placed within the scope of that namespace. This placement helps avoid name conflicts and can be useful when working with distributed development teams that may use similar component names. I can extend namespaces by sharing them across multiple TypeScript files.
