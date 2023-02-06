import { faker } from '@faker-js/faker'
import { IClean } from './clean.d'
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomInstructions(instructionsLegnth: number) {
    let result = '';
    const characters = 'NEWS';
    const charactersLength: number = characters.length;
    let counter = 0;
    while (counter < instructionsLegnth) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
let randomSingleDigitNumber: number = faker.datatype.number({ min: 2, max: 10 })
// Valid user construction
let validRoomSize: Array<number> = [ randomSingleDigitNumber, randomSingleDigitNumber ]
let validCoordinates: Array<number> = [ getRandomInt(1, randomSingleDigitNumber), getRandomInt(2, randomSingleDigitNumber)]
let validPatchCount: number = getRandomInt(0, randomSingleDigitNumber)
let validPatches: Array<Array<number>> = []
let validInstructions: string = randomInstructions(randomSingleDigitNumber)
for (let patchIncrement = 0; patchIncrement < validPatchCount; patchIncrement += 1) {
    let validPatch: Array<number> = []
    let number1 = getRandomInt(0, randomSingleDigitNumber)
    let number2 = getRandomInt(0, number1) 
    validPatch.push(number1, number2)
    validPatches.push(validPatch)
}
let newValidClean: IClean = {
    roomSize: validRoomSize,
    coords: validCoordinates,
    patches: validPatches,
    instructions: validInstructions
}
// End: Valid user construction
// Invalid user construction
let invalidRoomSize: Array<number> = [ 0, 0 ]
let invalidCoordinates: Array<number> = [ 100, 100 ]
let invalidPatches: Array<Array<number>> = [[0, 0], [0, 0], [0, 0]]
let invalidInstructions: "error_inducing"
let newInValidCleanInvalidRoomSize: IClean = {
    roomSize: invalidRoomSize,
    coords: validCoordinates,
    patches: validPatches,
    instructions: validInstructions
}
let newInValidCleanInvalidCoordinates: IClean = {
    roomSize: validRoomSize,
    coords: invalidCoordinates,
    patches: validPatches,
    instructions: validInstructions
}
let newInValidCleanInvalidPatches: IClean = {
    roomSize: validRoomSize,
    coords: validCoordinates,
    patches: invalidPatches,
    instructions: validInstructions
}
let newInValidCleanInvalidInstructions: IClean = {
    roomSize: validRoomSize,
    coords: validCoordinates,
    patches: validPatches,
    instructions: invalidInstructions
}
let newInValidCleanInvalidAll: IClean = {
    roomSize: invalidRoomSize,
    coords: invalidCoordinates,
    patches: invalidPatches,
    instructions: invalidInstructions
}
let newInValidClean: IClean = {
    roomSize: [0, 0],
    coords: [0, 0],
    patches: [[0, 0]],
    instructions: invalidInstructions
}
// End: Invalid user construction
export class Clean {
    new(type?: String) {
        switch (type) {
            default:
                return newValidClean
            case 'invalid.common.persona': 
                return newInValidClean
            case 'invalid.roomsize.persona': 
                return newInValidCleanInvalidRoomSize
            case 'invalid.coords.persona': 
                return newInValidCleanInvalidCoordinates
            case 'invalid.patches.persona': 
                return newInValidCleanInvalidPatches
            case 'invalid.instructions.persona': 
                return newInValidCleanInvalidInstructions
            case 'invalid.all.persona': 
                return newInValidCleanInvalidAll
        }
    }
}