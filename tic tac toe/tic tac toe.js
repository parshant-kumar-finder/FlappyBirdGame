class tictactoe {
    constructor() {
        this.boardState = [["", "", ""], ["", "", ""], ["", "", ""]];
        this.activePlayer = "X";
        this.winner = "none";
    }
    implementTurn(ele) {
        if (ele.innerText.trim(" ") == "") {
            ele.innerText = this.activePlayer;
            let [row, col] = this.getIndexById(ele.id);
            this.boardState[row][col] = this.activePlayer;
            this.changeActivePlayer();
            document.getElementById(ele.id).style.backgroundColor= "rgb(228, 245, 212)";
            let end=this.checkendGame();
            if(end){
                this.showWinner();
            }
        }
    }
    showWinner(){
        // alert(this.winner);
        if(this.winner==="DRAW"){
            alert("Pull your socks up, you both lose!")
            return;
        }
        else{
            alert(`Congrats! The winner is: ${this.winner}`)
            return;
        }

    }
    changeActivePlayer() {
        this.activePlayer = this.activePlayer == "X" ? "O" : "X";
        document.getElementById("activePlayer").innerText = this.activePlayer;
    }
    getIndexById(id) {
        return [parseInt((id - 1) / 3), parseInt((id - 1) % 3)];
    }
    checkendGame(){
        const board = this.boardState;
        let end=true;
        console.log(board);
        //row check
        for(let i=0;i<3;i++){
            end=true;
            for(let j=1;j<3;j++){
                if(board[i][j]!=board[i][j-1]||board[i][j]===""){
                    end = false;
                    // break;
                }
            }
            if(end){
                this.winner=board[i][0];
                return true;
            }
        }

        for(let j=0;j<3;j++){
            end=true;
            for(let i=1;i<3;i++){
                if(board[i][j]!=board[i-1][j]||board[i][j]===""){
                    end = false;
                    // break;
                }
            }
            if(end){
                this.winner=board[0][j];
                return true;
            }
        }

        if(board[0][0]==board[1][1]&& board[1][1]==board[2][2]){
            if(board[1][1]!=""){
                this.winner=board[1][1];
                return true;
            }
        }
        if(board[0][2]==board[1][1]&& board[1][1]==board[2][0]){
            if(board[1][1]!=""){
                this.winner=board[1][1];
                return true;
            }
        }
        let draw = true;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j]===""){
                    draw=false;
                }
            }
        }
        if(draw){
            this.winner="DRAW";
            return true;
        }

        return false;

    }
}

let currentGame = new tictactoe();

function implementTurn(ele) {
    currentGame.implementTurn(ele);
}




console.log(typeof(x));