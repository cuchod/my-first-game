import { Position } from './position';

export type Item = {
    position: Position
    sprite: string
    grab(): void
}