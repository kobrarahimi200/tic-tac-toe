import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})

export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }
  
  startGame(): void {
    this.game.gameStart();
    const cuurentPlayer = 'Current turn: Player' + this.game.currTurn;
    const information = document.querySelector('.current-status');
    information.innerHTML = cuurentPlayer;
  }

 //promise is used to call the async functions.
  async clickSubfield(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      console.log("pos " + position);
      if(this.game.currTurn ==0){
        position
      }
    }
  }
}
