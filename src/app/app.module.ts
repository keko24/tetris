import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ContainerComponent } from './container/container.component';
import { ScoreTableComponent } from './score-table/score-table.component';
import { PieceComponent } from './piece/piece.component';
import { GameBoardComponent } from './game-board/game-board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ContainerComponent,
    ScoreTableComponent,
    PieceComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
