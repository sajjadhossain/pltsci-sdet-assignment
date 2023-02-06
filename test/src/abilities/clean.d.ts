import { IRoomba } from './roomba.d'
export interface IClean {
    roomSize: Array<number>; 
    coords: Array<number>;
    patches: Array<Array<number>>;
    instructions: string;
}