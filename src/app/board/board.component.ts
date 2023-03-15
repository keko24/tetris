import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { BoardService } from '../board.service';
import { ROWS, COLS, BLOCK_SIZE, KEYS } from '../global-constants';
import { Piece } from '../piece';
import {PieceInterface} from '../pieces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
    @ViewChild('board', { static: true }) 
    canvas!: ElementRef<HTMLCanvasElement>;

    ctx!: CanvasRenderingContext2D;
    score!: number;
    lines!: number;
    level!: number;

    board!: number[][];
    piece!: Piece;

    moves = {
        [KEYS.LEFT]: (p: PieceInterface): PieceInterface => ({...p, x: p.x - 1 }),
        [KEYS.RIGHT]: (p: PieceInterface): PieceInterface => ({...p, x: p.x + 1 }),
        [KEYS.DOWN]: (p: PieceInterface): PieceInterface => ({...p, y: p.y + 1 })
    };

    constructor(private boardService: BoardService) {}

    ngOnInit() {
        this.setEmptyBoard();
    }

    setEmptyBoard(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;
        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
    
    startGame() {
        this.board = this.boardService.getEmptyBoard();
        this.piece = new Piece(this.ctx);
        this.piece.draw();
    }

    isInsideWalls(x: number) {
        return x >= 0 && x < COLS;
    }

    isAboveFloor(y: number) {
        return y < ROWS;
    }

    isValid(p: PieceInterface): boolean {
        p.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0 && !(this.isAboveFloor(p.y + y) && this.isInsideWalls(p.x + x))) {
                    return false;
                }
            });
        });
        return true;
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        if (this.moves[event.code]) {
            event.preventDefault();
            const new_position = this.moves[event.code](this.piece);
            if (this.isValid(new_position)) {
                this.piece.clear();
                this.piece.move(new_position);
                this.piece.draw();
            }
        }
        else if (event.code === 'Space') {
            event.preventDefault();
            this.piece.clear();
            this.piece.rotate();
            this.piece.draw();
        }
    }
}
