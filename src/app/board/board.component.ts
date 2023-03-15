import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { BoardService } from '../board.service';
import { ROWS, COLS, BLOCK_SIZE, KEYS } from '../global-constants';
import { Piece } from '../piece';
import { PieceInterface } from '../pieces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
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

    setNewPiece(): void {
        this.piece = new Piece(this.ctx);
        this.piece.draw();
    }
    
    startGame(): void {
        this.board = this.boardService.setEmptyBoard();
        this.setNewPiece();
    }

    isInsideWalls(x: number, y: number): boolean {
        return x >= 0 && x < COLS && this.board[y][x] === 0;
    }

    isAboveFloor(x: number, y: number): boolean {
        return y < ROWS && this.board[y][x] === 0;
    }

    isOnFloor(x: number, y: number): boolean {
        return y === ROWS - 1 || this.board[y][x] > 0;
    }

    isValid(p: PieceInterface): boolean {
        return p.shape.every((row, y) => 
            row.every((value, x) => 
                (value <= 0) || 
                (value > 0 && this.isAboveFloor(p.x + x, p.y + y) && this.isInsideWalls(p.x + x, p.y + y))
            )
        );
    }

    isAtBottom(): boolean {
        return this.piece.shape.some((row, y) => 
            row.some((value, x) => 
                value > 0 && this.isOnFloor(this.piece.x + x, this.piece.y + y)
            )
        );
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        if (this.moves[event.code]) {
            event.preventDefault();
            const new_position = this.moves[event.code](this.piece);
            console.log(this.isValid(new_position));
            if (this.isValid(new_position)) {
                this.piece.clear();
                this.piece.move(new_position);
                this.piece.draw();
                if (this.isAtBottom()) {
                    this.board = this.boardService.setPiece(this.piece);
                    this.setNewPiece();
                }
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
