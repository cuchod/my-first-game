import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, HostListener, Optional } from '@angular/core';
import { MappService } from '../mapp.service';
import { TileComponent } from '../tile/tile.component';
import { Unit } from '../units/unit'
import { Position } from '../units/position';
import { Item } from '../units/item'

@Component({
  selector: 'app-mapp',
  templateUrl: './mapp.component.html',
  styleUrls: ['./mapp.component.css']
})
export class MappComponent implements OnInit, AfterViewInit {

  rows: string[] = []
  columns: string[] = []
  mappService: MappService
  player: Unit
  collector: Unit
  hpRelic: Unit
  @ViewChildren(TileComponent) tiles!: QueryList<TileComponent>;

  constructor() { }

  ngOnInit(): void {
    this.mappService = new MappService
    for (let i=0; i<8; i++ ) {
      this.rows.push(i.toString())
      this.columns.push(i.toString())
    }
    this.player = {
      category: 'PLAYER',
      healthPoints: 100,
      attackDamage: 20,
      attackSpeed: 1,
      movementSpeed: 2,
      sprite: 'infiltrator',
      position: { x:2, y:2 }
    }
    this.collector = {
      category: 'ENEMY',
      healthPoints: 360,
      attackDamage: 10,
      attackSpeed: 0.5,
      movementSpeed: 0,
      sprite: 'enemy_collector',
      position: { x:5, y:5 }
    }
    this.hpRelic = {
      category: 'ITEM',
      position: { x:1, y:7 },
      sprite: 'item_hp-relic',
      grab: () => {
        this.player.healthPoints = 100
      }
    }
  }

  ngAfterViewInit(): void {
    this.spawn(this.player)
    this.spawn(this.collector)
    this.spawn(this.hpRelic)
  }

  private spawn(unit: Unit): void {
    this.getTileAtPosition(unit.position).unit = unit
  }

  private moveUnit(unit: Unit, targetPosition: Position): void {
    if (targetPosition.x < 0 
        || targetPosition.y < 0 
        || targetPosition.x +1 > this.columns.length 
        || targetPosition.y +1 > this.rows.length) {
      return
    } 
    let unitAtTarget = this.getTileAtPosition(targetPosition).unit
    if (!unitAtTarget || unitAtTarget.category === 'ITEM') {
      this.getTileAtPosition(unit.position).unit = null
      unit.position = targetPosition
      this.getTileAtPosition(unit.position).unit = unit
      unitAtTarget?.grab()
    }
  }

  private getTileAtPosition(position: Position): TileComponent {
    return this.tiles.find(t => t.tileId === 't' + position.x + position.y)
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch(event.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.moveUp(this.player)
        break
      case 'KeyA':
      case 'ArrowLeft':
        this.moveLeft(this.player)
        break
      case 'KeyS':
      case 'ArrowDown':
        this.moveDown(this.player)
        break
      case 'KeyD':
      case 'ArrowRight':
        this.moveRight(this.player)
        break
      case 'Space':
      case 'Enter':
      case 'ControlLeft':
      case 'ControlRight':
        this.attack(this.player)
        break
    }
  }

  private moveUp(unit: Unit): void {
    unit.facing = 'UP'
    this.moveUnit(this.player, { x: this.player.position.x, y: this.player.position.y - 1 })
  }
  private moveLeft(unit: Unit): void {
    unit.facing = 'LEFT'
    this.moveUnit(this.player, { x: this.player.position.x - 1, y: this.player.position.y})
  }
  private moveDown(unit: Unit): void {
    unit.facing = 'DOWN'
    this.moveUnit(this.player, { x: this.player.position.x, y: this.player.position.y + 1 })
  }
  private moveRight(unit: Unit): void {
    unit.facing = 'RIGHT'
    this.moveUnit(this.player, { x: this.player.position.x + 1, y: this.player.position.y})
  }

  private attack(attacker: Unit):void {
    let deffenderPosition: Position
    switch(attacker.facing) {
      case 'UP':
        deffenderPosition = { x: attacker.position.x, y: attacker.position.y -1 }
        break
      case 'LEFT':
        deffenderPosition = { x: attacker.position.x -1, y: attacker.position.y }
        break
      case 'DOWN':
        deffenderPosition = { x: attacker.position.x, y: attacker.position.y +1 }
        break
      case 'RIGHT':
        deffenderPosition = { x: attacker.position.x +1, y: attacker.position.y }
        break
    }
    let deffender = this.getTileAtPosition(deffenderPosition).unit
    if (!deffender || deffender.category === 'ITEM') return
    deffender.healthPoints -= attacker.attackDamage
    attacker.healthPoints -= deffender.attackDamage
    if (deffender.healthPoints <= 0) {
      this.getTileAtPosition(deffenderPosition).unit = {
        category: 'ITEM',
        position: deffenderPosition,
        sprite: 'item_star',
        grab: () => {
          setTimeout(() => {
            alert('VICTORY! \n Thank you for playing \n\n Game by cuchod')
            window.location.reload()
          })
        }
      }
    }
    if (attacker.healthPoints <= 0) {
      this.getTileAtPosition(attacker.position).unit = null
      setTimeout(() => {
        alert('GAME OVER')
        window.location.reload()
      })
    }
  }
}
