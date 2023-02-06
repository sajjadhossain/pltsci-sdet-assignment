# Solution

For my POC I used CodeceptJS, in TypeScript, with Gherkin and some Screenplay. I will walk through as much as I can in this document, with room to answer anything else during our screening.

## Run the tests

1. `docker build -t pltsci-sdet-assignment service`
1. `docker run -d -p 8080:8080 --name pltsci-sdet-assignment pltsci-sdet-assignment`
1. `npm i`
1. `npx codeceptjs run`

### Expected output

```
[Cleaning Sessions] Navigate an imaginary robotic hoover through an equally imaginary room --
    As a client
    I want to POST to /cleaning-sessions with a body that contains room dimensions, locations of patches of dirt, initial hover position and driving instructions
    So that I can recieve final hoover position and number of patches of dirt cleaned up
  ✔ I want to POST to /cleaning-sessions with a body that is valid {"body":"\"valid.common.persona\"","response":"\"200\""} in 147ms
  ✔ I want to POST to /cleaning-sessions with a body that is valid {"body":"\"invalid.roomsize.persona\"","response":"\"200\""} in 25ms
  ✔ I want to POST to /cleaning-sessions with a body that is valid {"body":"\"invalid.coords.persona\"","response":"\"200\""} in 15ms
  ✔ I want to POST to /cleaning-sessions with a body that is valid {"body":"\"invalid.patches.persona\"","response":"\"200\""} in 15ms
  ✔ I want to POST to /cleaning-sessions with a body that is invalid {"body":"\"invalid.common.persona\"","response":"\"400\""} in 17ms
  ✔ I want to POST to /cleaning-sessions with a body that is invalid {"body":"\"invalid.instructions.persona\"","response":"\"400\""} in 10ms
  ✔ I want to POST to /cleaning-sessions with a body that is invalid {"body":"\"invalid.all.persona\"","response":"\"400\""} in 11ms`
```

## Strategy

With [End-to-End API Testing in mind](https://muuktest.com/blog/types-of-api-testing/#Validation-Testing) in mind, using the [Test Pyramid Approach](https://dzone.com/articles/rest-apis-test-pyramid), we can approach testing `cleaning-sessions` for a Roomba by:

1. Defining users, mapped to personas, that have an expected response from the API
1. Creating an actor that is added to through out the test
1. Design abilities that the actor can carry out actions with

## Caveats

We ideally would have:
1. Spec documentation for `cleaning-sessions`, OpenAPI or the like
1. Schemas documentation for `cleaning-sessions`, JSONSchema or the like
1. Interfaces, Classes and Mocks for `cleaning-sessions`

In this POC, I was not able to:
1. Create a global context for `cleaning-session` or `roomba`
1. Abstract `Given`, `When`, `Then` in a Screenplay implementation, all steps are in one [file](test/steps/definitions.ts). Missing Screenplay concepts are: `Actions`, `Tasks`, `Assertions`
1. Automate all `Scenarios` defined in our [feature file](test/features/cleaning_sessions.feature)

I would love more time to:
1. Define the pipeline, map this execution to an expected coverage
1. See if Docker has a place in before/after hooks 
1. Map this coverage, Integration/E2E through CodeceptJS, to other coverage solutions. (Contract Tests, Unit Tests, Security Tests, etc.)
1. Define functional assertions required, currently I only implemented status code assertions.

## Intention

To display abstraction through TypeScript, Gherkin, CodeceptJS and Screenplay. 

## Evaluation Criteria

### How you approach API testing

I don't believe this implementation to represent any ideal state to write E2E API Tests. My preference is using POSTMAN (to reverse engineer OpenAPI Documentation) to chain Use Cases and NEWMAN in CI/CD.

That being said, I've used Gherkin and BDD extensively in many implementations and am excited to see how Platform Science's stack uses CodeceptJS or any other tool to test APIs. I have yet to abstract API's through Gherkin, but the challenge sounds very fun!

### How you structure your tests

I love modularizing and abstracting where possible. Even `Step Definitions` deserve an abstraction layer like Screenplay to help with context switching and design pattern consistency. 

Here, I organized some of the source code using the `Screenplay` pattern. In [abilities](./test/src/abilities/) and [actor](./test/src/actor/), I added some utility for the test framework. Ideally this pattern would also be implemented across all Step Definitions, Hooks and Plugins.

### How you explain the approach you took and the assumptions you made

I never used CodeceptJS, but it was pretty easy to get it up and running. I'm still very unsure of the acceptance criteria for something like `cleaning-sessions`, but I am excited to talk through how Platform Science may use it. 

I wanted to use the preferred frameworks and design patterns used at Platform Science to quickly test the API. I think for something E2E, we need something like OpenAPI Spec and JSONSchemas, and start at the contract-level. 

### How you deal with uncertainty and contribute to requirements specification 

I think the Test Pyramid can help us define the level of testing and coverage we want from CodeceptJS REST API Testing. There is more E2E capacity in OpenAPI or JSONSchema that can be quickly plugged in to CodeceptJS.

Once the level of coverage is defined, we can ensure that the test automation steps (contribution guidelines for testing), include requirements and assertions we can expect during and post developement. 

These ideas can all be RFC'd and POC'd out with the engineering team, with product in mind and consulted.

### How experienced you are at spotting nasty bugs! 

I don't know if the experiences I had were bugs, but ideally there would be a pre-process to triage these occurances. I documented a total of 5 oddities. 

## Occurances

### Room size and coords being same value responds with 400

With this data set below, I was getting a `400`. I thought `[4, 4]` as coords in a room that size would place the Roomba in the lower right quadrant.

```json
{
    "roomSize": [ 4, 4 ],
    "coords": [ 4, 4 ],
    "patches": [
        [ 2, 0 ] 
    ],
    "instructions": "WEEW"
}
```

### Room size 1, 1 responds with 400

I don't recall any limitation saying a room cannot be 1 by 1.

```json
{
    "roomSize": [ 1, 1 ],
    "coords": [ 1, 0 ],
    "patches": [],
    "instructions": "W"
}
```

### Coords outside of Room size responds with 200
 
Caught by [test case example](./test/features/cleaning_sessions.feature): `invalid.coords.persona`.

Coords outside of the bounds of the room size shouldn't be accepted by logic of the method's use case. 

```json
{
    "roomSize": [ 4, 4 ],
    "coords": [ 100, 1000 ],
    "patches": [],
    "instructions": "SES"
}
```

### Duplicate patches responds with 200

Duplicate patches seems like it should be filtered out by the service or the client.

```json
{
    "roomSize": [ 4, 4 ],
    "coords": [ 2, 2 ],
    "patches": [
        [ 0, 0 ],
        [ 0, 0 ]
    ],
    "instructions": "SE"
}
```

### Room size 0, 0 responds with 200

Room size's should be divisible by itself, therefore `0, 0` should not be a valid room size.

```json
{
    "roomSize": [ 0, 0 ],
    "coords": [ 2, 2 ],
    "patches": [
        [ 0, 0 ],
        [ 0, 0 ]
    ],
    "instructions": "SE"
}
```