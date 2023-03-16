import { BLOCK_SIZE, NUM_OF_PIECES } from './global-constants';
import { PIECES, PIECE_COLOR, PieceInterface } from './pieces';

export class Piece implements PieceInterface {
    x!: number;
    y!: number;
    shape!: number[][];
    color!: string;
    number!: number;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.spawn();
    }

    spawn(): void {
        this.number = Math.floor(Math.random() * NUM_OF_PIECES) + 1;
        this.color = PIECE_COLOR[this.number];
        this.shape = PIECES[this.number];

        this.x = 3;
        this.y = 0;
    }

    draw(): void {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    clear(): void {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.clearRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(new_position: PieceInterface): void {
        this.x = new_position.x;
        this.y = new_position.y;
    }

    rotate(): void {
        let temp = this.shape[0][0];
        this.shape[0][0] = this.shape[2][0];
        this.shape[2][0] = this.shape[2][2];
        this.shape[2][2] = this.shape[0][2];
        this.shape[0][2] = temp;
        temp = this.shape[0][1];
        this.shape[0][1] = this.shape[1][0];
        this.shape[1][0] = this.shape[2][1];
        this.shape[2][1] = this.shape[1][2];
        this.shape[1][2] = temp;
    }
}
