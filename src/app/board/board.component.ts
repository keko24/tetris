import { Component, OnInit } from '@angular/core';
import { ROWS, COLS, BLOCK_SIZE } from '../global-constants';
import { PieceComponent } from '../piece/piece.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
    canvas: HTMLCanvasElement | undefined;
    ctx: CanvasRenderingContext2D | undefined;

    constuctor() {}

    getCanvas(): HTMLCanvasElement {
        return document.getElementById("board")! as HTMLCanvasElement;
    }

    getContext(): CanvasRenderingContext2D {
        const ctx = this.canvas?.getContext('2d')!;
        ctx.canvas.width = BLOCK_SIZE * COLS;
        ctx.canvas.height = BLOCK_SIZE * ROWS;
        ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        return ctx;
    }

    drawPiece(): void {
    }

    ngOnInit() {
        this.canvas = this.getCanvas();
        this.ctx = this.getContext();
    }
}
