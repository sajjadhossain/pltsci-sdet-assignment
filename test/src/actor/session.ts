import { ISession } from './session.d'
import { Roomba } from '../abilities/roomba'
import { Clean } from '../abilities/clean'
let roomba = new Roomba
let clean = new Clean
export class Session {
    new(type: string) {
        let newSession: ISession = {
            type: type,
            device: roomba.new(type)
        }
        return newSession
    }
    clean(type: string) {
        let newCleaningSession: ISession = {
            type: type,
            device: roomba.new(type),
            request: clean.new(type)
        }
        return newCleaningSession
    }
}