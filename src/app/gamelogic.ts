import { Status } from './status';


export class Gamelogic {

    gameField: Array<number> = [];
    currTurn: number;
    gameStatus: Status;
    winSituationOne: Array<Array<number>> = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],

    ]
    winSituationTwo: Array<Array<number>> = [
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 2, 0, 0],
        [2, 0, 0, 0, 2, 0, 0, 0, 2],

    ]

    public constructor() {
        this.currTurn = 0;
        this.gameStatus = Status.STOP;
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    gameStart(): void {
        this.gameStatus = Status.START;
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currTurn = this.randomPlayerStart();
    }
    randomPlayerStart(): number {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }
    setField(position: number, value: number): void {
        this.gameField[position] = value;
    }
    getPlayerColorClass(): string {
        const colorClass = (this.currTurn === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }
    /**
     * change the current player 
     */
    changePlyaer(): void {
        this.currTurn = (this.currTurn === 2) ? 1 : 2;
    }
    /**
     * checks if the given arrays are eqaul
     * @param a first given array
     * @param b second given array
     * @returns true if the arrays are equal
     */
    arrayEquals(a: Array<any>, b: Array<any>): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
            a.every((value, index) => value === b[index]); //TODO read about it
    }
    /**
     * checks winner
     * he return type of an async function
     *  or method must be the global Promise<T> type.
     */
    async checkWinner(): Promise<boolean> {
        let isWinner = false;
        const checckArry = (this.currTurn === 1) ? this.winSituationOne : this.winSituationTwo;
        const currentArray: any = [];

        this.gameField.forEach((subfield, index) => {
            if (subfield !== this.currTurn) {
                currentArray[index] = 0;
            } else {
                currentArray[index] = subfield;
            }

            checckArry.forEach((checkfield, checkindex) => {
                if (this.arrayEquals(checkfield, currentArray)) {
                    isWinner = true;
                }
            })
        });

        if (isWinner) {
            this.gameEnd();
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * checks if the field is full or not
     */
    async checkisFieldFull(): Promise<boolean> {
        let isFull = true;
        if (this.gameField.includes(0)) {
            isFull = false;
        }
        if (isFull) {
            this.gameEnd();
            return true;
        }
        else {
            return false;
        }
    }

    gameEnd(): void {
        this.gameStatus = Status.STOP;
    }
}
