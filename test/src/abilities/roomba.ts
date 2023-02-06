import { faker } from '@faker-js/faker'
import { IRoomba } from './roomba.d'
let roombaName = 'Roomba ' + faker.animal.type()
let roombaVersion = 'v' + faker.datatype.number({ min: 10, max: 100, precision: 0.01 })
let newRoomba: IRoomba = {
    name: roombaName,
    version: roombaVersion
} 
export class Roomba {
    new(type?: String) {
        switch (type) {
            default:
                return newRoomba
        }
    }
}