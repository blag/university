@page typescript/functions Functions
@parent typescript 4

@description Learn how to annotate functions parameters and return values, use different parameter types available.

@body

## Overview

In this part, we will:

- Annotate functions parameters and return values.
- Use optional parameters & rest parameters

## Functions in TypeScript

In TypeScript, we're able to annotate function parameters to better guard our code. If the following, `add` is called  with two parameters that are not numbers TypeScript's compiler will throw an error when compiled.

```typescript
function add(x: number, y: number): number {
  return x + y;
}

add(1, 'three');
//Argument of type '"foo"' is not assignable to parameter of type 'number'.
```

We can also annotate what a function should return.

```typescript
interface Result {
  success: boolean
  error?: string
}

function logResponse(): Result {
  return 'path not found'
}
//Type '"path not found"' is not assignable to type 'Result'.

function logResponse(): Result {
  return { success: false, error: 'path not found'}
}
//works!
```

## Optional Parameters

Sometimes when writing functions, we don't need every parameter to be satisfied. TypeScript allows us to mark optional parameters (or properties) with a ``?`` so the compiler will not error if an optional param isn't passed.

```typescript
function buildDinosaur(name: string, breed: string, teeth?:number) {
  if (teeth) {
    console.log(`${name} is a ${breed} and has ${teeth} teeth.`);
  }
  else {
    console.log(`${name} is a ${breed}.`);
  }
}

let newDino = buildDinosaur('Blue', 'Velociraptor', 80);
//works
let otherDino = buildDinosaur('Delta', 'Velociraptor');
//also works
let otherOtherDino = buildDinosaur('Charlie');
//error an argument for 'breed' was not provided
```

## Rest Parameters

Rest parameters are a way to pass in an unknown number of arguments to a function. Rest params are signaled to the transpiler by passing an ellipsis (...) followed by the parameter name.

```typescript
function buildDinosaur(breed: string, ...dna: string[]) {
  console.log(`The ${breed} has dna from ${dna.join(", ")}`)
}

let uberDino = buildDinosaur('Indominous Rex', "Velociraptor",
"Tyrannosaurus rex","Therizinosaurus", "cuttlefish");
//logs "The Indominous Rex has dna from Velociraptor,
//      Tyrannosaurus rex, Therizinosaurus, cuttlefish"
```



## Exercise: bonusMaker

The following function takes a bonus multiplier amount parameter and a dinosaur name parameter, then takes the length of the dinosaur name and multiplies it by the multiplier to calculate a dinosaur park employee's bonus salary based on the complexity of the dinosaurs they make.  

@sourceref ./4-exercise-start.html
@codepen

Productivity in the park has been up, so open the `3-functions-bonusMaker.ts` file and  modify this function to take an unknown amount of names to get the length of and multiply by the bonus multiplier amount.


Run the following to verify your solution:

```shell
npm run 3-functions
```

<details>
<summary>solution</summary>

@sourceref ./4-exercise-solution.html
@codepen

</details>
