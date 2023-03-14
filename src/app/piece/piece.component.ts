import { Component, OnInit } from '@angular/core';
import { NUM_OF_PIECES } from '../global-constants';
import { PIECES, PIECE_COLOR } from '../pieces';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})

export class PieceComponent {
    piece: number[][] | undefined;
    piece_color: string[][] | undefined;
    color: string | undefined;
    piece_number: number | undefined;

    constructor() {}

    getRandomPiece(): number {
        return Math.floor(Math.random() * NUM_OF_PIECES);
    }

    /*rotatePieceClockwise(): void {
        this.piece = this.piece?[0].map((_val, index) => this.piece?.map(row => row[index]).reverse());
    }

    rotatePieceCounterClockwise(): void {
        this.piece = this.piece?[0].map((_val, index) => this.piece?.map(row => row[row.length - 1 - index])); 
    }*/

    drawPiece(): void {

    }

    ngOnInit() {
        this.piece_number = this.getRandomPiece();
        this.piece = PIECES[this.piece_number];
        this.piece_color = this.piece.map((val) => val.map((el) => PIECE_COLOR[el]));
        this.color = PIECE_COLOR[this.piece_number];
    }
}
