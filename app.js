document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let doodlerLeftSpace = 50;
  doodleBottomSpace = 250;
  platFormCount = 5;
  let isGameOver = false;
  let platForms = [];
  let upTimerId;
  let downTimerId;

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
    upTimerId = setInterval(function () {
      doodleBottomSpace += 20;
      doodler.style.bottom = doodleBottomSpace + "px";
      if (doodleBottomSpace > 350) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(upTimerId);
    downTimerId = setInterval(function () {
      doodleBottomSpace -= 5;
      doodler.style.bottom = doodleBottomSpace + "px";
      if (doodleBottomSpace <= 0) {
        gameOver();
      }
    }, 30);
  }

  function gameOver() {
    console.log("Game Over 😥💥");
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
  }
  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodle();

      setInterval(movePlatForms, 30);
      jump();
    }
  }

  start();
});
