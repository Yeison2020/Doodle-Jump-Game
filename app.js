document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let doodlerLeftSpace = 50;
  let startPoint = 150;
  doodleBottomSpace = startPoint;
  platFormCount = 5;
  let isGameOver = false;
  let platForms = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  isGoingLeft = false;
  isGoingRight = false;
  let leftTimerId;
  function createDoodle() {
    grid.append(doodler);
    doodler.classList.add("doodler");
    doodlerLeftSpace = platForms[0].left;
    doodler.style.left = doodlerLeftSpace + `px`;
    doodler.style.bottom = doodleBottomSpace + `px`;
  }

  class Platform {
    constructor(newPlatBottom) {
      this.bottom = newPlatBottom;
      this.left = Math.random() * 350;

      this.visual = document.createElement("div");
      const visual = this.visual;
      visual.classList.add("platform");

      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      grid.appendChild(visual);
    }
  }
  function createPlatforms() {
    for (let i = 0; i < platFormCount; i++) {
      let platGap = 600 / platFormCount;
      let newPlatBottom = 100 + i * platGap;
      let newPlatForm = new Platform(newPlatBottom);
      platForms.push(newPlatForm);
      console.log(platForms);
    }
  }
  function movePlatForms() {
    if (doodleBottomSpace > 200) {
      platForms.forEach((platForm) => {
        platForm.bottom -= 4;
        let visual = platForm.visual;
        visual.style.bottom = platForm.bottom + "px";
      });
    }
  }

  function jump() {
    clearInterval(upTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
      doodleBottomSpace += 20;
      doodler.style.bottom = doodleBottomSpace + "px";
      if (doodleBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
      doodleBottomSpace -= 5;
      doodler.style.bottom = doodleBottomSpace + "px";
      if (doodleBottomSpace <= 0) {
        gameOver();
        platForms.forEach((platform) => {
          if (
            doodleBottomSpace >= platform.bottom &&
            doodleBottomSpace <= platform.bottom + 15 &&
            doodlerLeftSpace + 60 >= platform.left &&
            doodlerLeftSpace <= platform.left + 85 &&
            !isJumping
          ) {
            console.log("Landed");
            startPoint = doodleBottomSpace;
            console.log(startPoint);
            console.log(doodleBottomSpace);
            jump();
          }
        });
      }
    }, 30);
  }

  function gameOver() {
    console.log("Game Over 😥💥");
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
  }

  function control(e) {
    if (e.key == "ArrowLeft") {
      // Move Left
      moveLeft();
    } else if (e.key == "ArrowRight") {
      moveRight();
    } else if (e.key == "ArrowUp") {
      // moveStraight()
    }
  }

  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5;
        doodler.style.left = doodlerLeftSpace + "px";
      } else {
        moveRight();
      }
    }, 30);
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (doodlerLeftSpace <= 340) {
        doodlerLeftSpace += 50;
        doodler.style.left = doodlerLeftSpace + "px";
      }
    }, 30);
  }

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodle();

      setInterval(movePlatForms, 30);
      jump();
      document.addEventListener("keyup", control);
    }
  }

  start();
});
