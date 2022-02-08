import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})

export class GameComponent implements OnInit {

  currentPlayer: string = "";

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart();
    this.currentPlayer = 'Current turn: Player' + this.game.currTurn;
    const information = <HTMLParagraphElement>document.querySelector('.current-status');
    information.innerHTML = this.currentPlayer;
  }

  //promise is used to call the async functions.
  async clickSubfield(subfield: any): Promise<void> {

    if (this.game.gameStatus === 1) {
      const information = <HTMLParagraphElement>document.querySelector('.current-status');
      const position = subfield.currentTarget.getAttribute('position');

      this.game.setField(position, this.game.currTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          information.innerHTML = "winner is player " + this.game.currTurn;
        }
      });
      // await this.game.checkWinnner(); //why use await : becuase we should wait until get the result of this function and
      //when we dont have any winner then go the the next func and check if the field is full or not.
      await this.game.checkisFieldFull().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          information.innerHTML = "no Winner";
        }
      });

      this.game.changePlyaer();

      //update the current player status
      if (this.game.gameStatus === 1) {
        this.currentPlayer = 'Current turn: Player' + this.game.currTurn;

        information.innerHTML = this.currentPlayer;
      }
    }

  }
}
