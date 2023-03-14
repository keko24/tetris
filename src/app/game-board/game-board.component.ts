import { Component, OnInit } from '@angular/core';
import { ROWS, COLS } from '../global-constants';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})

export class GameBoardComponent {
    board: Number[][] | undefined;

    constructor() {}

    getEmptyBoard(): Number[][] {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    } 

    ngOnInit() {
        this.board = this.getEmptyBoard();
    }
}
