import React,{useEffect, useState} from "react";
import './App.css';

function App(){

  const [score,setScore]=useState(0);
  const [showGameOver,setShowGameOver]=useState({visibility:"hidden"});

  // function scoreTimer(){
  //   setScore(score+1);
  // }

  useEffect(() =>{
  
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
      setScore(score+1)
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
    if(!isGameOver) {
      setTimeout(generateObstacle,3000);
    }
  }
  generateObstacle();
  
  function gameOver(){
    clearInterval(birdTimerId);
    console.log("game over");
    isGameOver=true;
    document.removeEventListener("keydown",control);
    gameReallyOver();
  }
  function gameReallyOver(){
    if(gameOver && !isGameReallyOver){
      isGameReallyOver=true;
      //alert("game over");
      setShowGameOver({visibility:"visible"});
      //clearInterval(scoreTimerr);
    }
  }


  return function something(){
    clearInterval(birdTimerId);
  };
},[]);

  useEffect(() =>{
    let scoreTimerr=setInterval(()=>setScore(score+1),1000);
    console.log("use effect 2");
    return function fun(){
      clearInterval(scoreTimerr);
    }
  },[score]);

  return (
    <>
    <div className="whole">
      <div className="border-left"></div>
      <div className="game-container">
        <div className="border-top"></div>
        <div className="sky">
          <div className="bird"></div>
        </div>
        <div className="game-over-card" style={showGameOver}
        >Game Over</div>
        <div className="score">Score:{score}</div>
      </div>
      <div className="ground-container"></div>
      <div className="border-right"></div>
    </div>
    </>
  );
}  

export default App;
