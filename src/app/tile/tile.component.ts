import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Unit } from '../units/unit'
import { Item } from '../units/item';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  constructor() { }

  @Input() tileId: string
  unit?: Unit
  facingBorder: string = ''

  ngOnInit(): void {
  }

}
