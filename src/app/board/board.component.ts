import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { BoardService } from '../board.service';
import { ROWS, COLS, BLOCK_SIZE, KEYS } from '../global-constants';
import { Piece } from '../piece';
import { PIECE_COLOR, PieceInterface } from '../pieces';

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
        this.setEmptyBoard();
        this.boardService.setEmptyBoard();
        this.setNewPiece();
    }

    clearLines(): void {
        let value;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                value = this.boardService.getValueAtPosition(row, col);
                console.log(value);
                if (value > 0) {
                    this.ctx.fillStyle = PIECE_COLOR[value];
                    this.ctx.fillRect(col, row, 1, 1);
                }
            }
        }
    }

    isInsideWalls(col: number, row: number): boolean {
        return col >= 0 && col < COLS && this.boardService.getValueAtPosition(row, col) === 0;
    }

    isAboveFloor(col: number, row: number): boolean {
        return row < ROWS && this.boardService.getValueAtPosition(row, col) === 0;
    }

    isOnFloor(col: number, row: number): boolean {
        return row === ROWS - 1 || this.boardService.getValueAtPosition(row + 1, col) > 0;
    }

    isValid(p: PieceInterface): boolean {
        return p.shape.every((row, y) => 
            row.every((value, x) => 
                (value <= 0) || 
                (value > 0 && this.isAboveFloor(p.x + x, p.y + y) && this.isInsideWalls(p.x + x, p.y + y))
            )
        );
    }

    isAtBottom(p: PieceInterface): boolean {
        return p.shape.some((row, y) => 
            row.some((value, x) => 
                value > 0 && this.isOnFloor(p.x + x, p.y + y)
            )
        );
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
                if (this.isAtBottom(new_position)) {
                    this.boardService.setPiece(new_position);
                    this.setNewPiece();
                    if (this.boardService.checkLines()) {
                        this.clearLines();
                    }
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
