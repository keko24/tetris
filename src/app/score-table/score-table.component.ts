import { Component } from '@angular/core';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})

export class ScoreTableComponent {
    score: Number = 0;
    moves: Number = 0;
    lines: Number = 0;

    constructor() {}
    
    startGame() {
        
    }
}
