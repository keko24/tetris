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

    setPiece(p: PieceInterface): number[][] {
        p.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.board[p.x + x][p.y + y] = value;
                }
            });
        }); 
        return this.board;
    }
}
