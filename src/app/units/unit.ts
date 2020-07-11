import { Position } from './position';

export type Unit = {
    category: 'ENEMY' | 'PLAYER' | 'NPC' | 'ITEM'
    healthPoints?: number
    attackDamage?: number
    attackSpeed?: number
    movementSpeed?: number
    sprite: string
    position?: Position
    facing?: 'UP' | 'LEFT' | 'DOWN' | 'RIGHT'
    grab?(): void
}