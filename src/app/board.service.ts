import { Injectable } from '@angular/core';
import { PieceInterface } from './pieces';
import { ROWS, COLS } from './global-constants';

@Injectable({
    providedIn: 'root'
})

export class BoardService {
    board!: number[][];

    constructor() { }

    setEmptyBoard(): number[][] {
        this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
        return this.board;
    }

    setPiece(p: PieceInterface): void {
        p.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.board[p.y + y][p.x + x] = value;
                }
            });
        }); 
    }

    checkLines(): number[][] {
        let temp = this.board.map((row) => row.every((val) => val > 0));
        temp.forEach((val, idx) => {
            if (val === true) {
                this.board.splice(idx, 1);
                this.board.unshift(Array(COLS).fill(0));
            }
        });
        console.log(this.board);
        return this.board;
    }
}
