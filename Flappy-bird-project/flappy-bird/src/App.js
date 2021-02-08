import React,{Component} from "react";
import './App.css';

class App extends Component{

componentDidMount(){
    const bird = document.querySelector(".bird");
    const gameContainer = document.querySelector(".game-container");
  
    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let isGameReallyOver = false;
    let gap = 430;
  
    function startGame() {
      birdBottom -= gravity;
      bird.style.bottom = birdBottom + "px";
      bird.style.left = birdLeft + "px";
    }
    let birdTimerId = setInterval(startGame, 20);
    function control(e){
      if(e.keyCode === 32){
        jump();
        //startTheGame=true;
      }
    }
    function jump(){
      if(birdBottom < 500){
        birdBottom+=50;
      }
      bird.style.bottom=birdBottom+"px";
    }
    document.addEventListener("keydown",control);
    
    function generateObstacle(){
      let obstacleLeft=500;
      let obstacleBottom=Math.floor(Math.random()*150)+1;
      const obstacle=document.createElement("div");
      const topObstacle=document.createElement("div");
      if(!isGameOver) {
        obstacle.classList.add("obstacle");
        topObstacle.classList.add("topObstacle");
      }  
      obstacle.style.left=obstacleLeft+"px";
      topObstacle.style.left=obstacleLeft+"px";
      obstacle.style.bottom=obstacleBottom+"px";
      topObstacle.style.bottom=obstacleBottom+gap+"px";
      gameContainer.appendChild(obstacle);
      gameContainer.appendChild(topObstacle);
      function moveObstacle(){
        obstacleLeft-=2;
        obstacle.style.left=obstacleLeft+"px";
        topObstacle.style.left=obstacleLeft+"px";
        if(obstacleLeft === -60 ){
          clearInterval(obstacleTimerId);
          gameContainer.removeChild(obstacle);
          gameContainer.removeChild(topObstacle);
        }
        if (
          (obstacleLeft > 200 &&
            obstacleLeft < 280 &&
            birdLeft === 220 &&
            (birdBottom < obstacleBottom + 153 ||
              birdBottom > obstacleBottom + gap - 200)) ||
          birdBottom === 0
        ) {
          
          clearInterval(obstacleTimerId);
          gameOver(); 
        }
      }
      let obstacleTimerId=setInterval(moveObstacle,20);
      if(!isGameOver) setTimeout(generateObstacle,3000);
    }
    generateObstacle();
    
    function gameOver(){
      clearInterval(birdTimerId);
      isGameOver=true;
      document.removeEventListener("keydown",control);
      gameReallyOver();
    }
    function gameReallyOver(){
      if(gameOver && !isGameReallyOver){
        console.log("game over");
        isGameReallyOver=true;
        alert("game over");
      }
    }
   
}  
  
render(){
  return (
    <div>
      <div className="border-left"></div>
      <div className="game-container">
        <div className="border-top"></div>
        <div className="sky">
          <div className="bird"></div>
        </div>
      </div>
      <div className="ground-container"></div>
      <div className="border-right"></div>
    </div>
  );
}  
}

export default App;
