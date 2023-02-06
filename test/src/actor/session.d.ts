import { IRoomba } from '../abilities/roomba.d'
import { IClean } from '../abilities/clean.d'
export interface ISession {
    type: string,
    device: IRoomba;
    request?: IClean;
}