import {Status} from'./status';


export class Gamelogic {

    gameField: Array<number> =[];
    currTurn : number;
    gameStatus: Status;

    public constructor(){
        this.currTurn =0;
        this.gameStatus = Status.STOP;
        this.gameField = [0,0,0,0,0,0,0,0,0];
    }
    gameStart(){
        this.gameStatus =Status.START;
        this.gameField =[0,0,0,0,0,0,0,0,0];
        this.currTurn = this.randomPlayerStart();
    }
    randomPlayerStart(): number{
        const startPlayer = Math.floor(Math.random() *2 ) + 1;
        return startPlayer; 
    }
}
