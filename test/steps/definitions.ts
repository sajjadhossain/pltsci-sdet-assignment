import { Session } from '../src/actor/session'
import assert from 'node:assert/strict'

// Ideally would make these global scoped variables for the Test session to consume
let session = new Session
let newCleaningSession
let newCleaningSessionResults

const { I } = inject();

// Ideally imported from src/abilities
Given('I have a {string} for a request to /cleaning-sessions', async (type: string) => {
    return newCleaningSession = session.clean(type)
});
// Ideally imported from src/abilities
Given('I have an invalid {string} for a request to /cleaning-sessions', async (type: string) => {
    return newCleaningSession = session.clean(type)
});
// Ideally imported from src/actions
When('I make a POST requst to /cleaning-sessions', async () => {
    const { request } = newCleaningSession
    const response = await I.sendPostRequest('cleaning-sessions', request)
    return newCleaningSessionResults = {
        status: response.status,
        data: response.data
    } 
});
// Ideally imported from src/assertions
Then('I should recieve a successful {string} for my request', async (response: number) => {
    return await I.seeResponseCodeIsSuccessful();
})
// Ideally imported from src/assertions
Then('I should recieve an unsuccessful {string} for my request', async (response: number) => {
    return assert(newCleaningSessionResults.status === Number(response), 'Expected: ' + response + ', Actual: ' + newCleaningSessionResults.status)
})

export { };