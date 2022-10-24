const arena = document.querySelector(".arena");
const go = document.querySelector(".btn-go");
const reset = document.querySelector(".btn-reset");
const audio = document.querySelector(".audio");
const extended = document.querySelector(".extended");

const scoreTable = document.querySelector(".score-table");
const scoreTableLable = document.querySelector(".score-table--lable");
const scoreTableValue = document.querySelector(".score-table--value");

const COUNT_ELEMENTS = 20;
const SPEED = 10;
const ICON_SIZE = 22;
const WIDTH = 500;
const HEIGHT = 500;
const TIK = 100;
const SCORE_TIK = 500;

const AUDIO_CONTEXT = new AudioContext();

const SOUND_ASSETS = {};

const ELEMENTS = [
  { name: "rock", targets: ["scissors", "lizard"], icon: "🗿" },
  { name: "scissors", targets: ["paper", "lizard"], icon: "✂️" },
  { name: "paper", targets: ["rock", "spock"], icon: "📜" },
  { name: "lizard", targets: ["spock", "paper"], icon: "🦎", extended: true },
  { name: "spock", targets: ["scissors", "rock"], icon: "🖖", extended: true },
];

let scoreData = {
  check(elems) {
    elems.forEach((e) => {
      let s = document.getElementsByClassName(e.name).length;
      document.querySelector(`.score-${e.name}`).innerHTML = s;
      if (s === COUNT_ELEMENTS * elems.length) {
        clearInterval(this.interval);
        stopAllUnit();
      }
    });
  },
  stopCheck() {
    clearInterval(this.interval);
  },
  interval: null,
};

class ElInstant {
  constructor({ name, targets, icon }) {
    this.name = name;
    this.targets = targets;
    this.icon = icon;

    this.sound = null;
    this.el = null;
    this.interval = null;

    this.init();
  }

  init() {
    let el = document.createElement("span");
    el.classList.add("unit");
    el.classList.add(this.name);
    this.setEl(el);
    this.setSound(this.name);
    this.positionElement(
      this.randomInteger(
        arena.offsetLeft,
        arena.offsetLeft + arena.offsetWidth - ICON_SIZE
      ),
      this.randomInteger(
        arena.offsetTop,
        arena.offsetTop + arena.clientHeight - ICON_SIZE
      )
    );
    arena.appendChild(el);
    el.el = this;

    el.style.position = "absolute";
    el.innerHTML = this.icon;
    this.moveToTarget();
  }

  remove() {
    this.stop();
    this.el.remove();
  }

  setEl(el) {
    this.el = el;
  }

  setSound(name) {
    this.sound = SOUND_ASSETS[name];
  }

  playSound() {
    if (audio.checked) {
      const source = AUDIO_CONTEXT.createBufferSource();
      source.buffer = this.sound;
      source.connect(AUDIO_CONTEXT.destination);
      source.start();
    }
  }

  infected(name, targets, icon) {
    this.el.classList.remove(this.name);
    this.el.classList.add(name);
    this.name = name;
    this.targets = targets;
    this.icon = icon;
    this.el.innerHTML = icon;

    this.setSound(name);
    this.stop();
    this.moveToTarget();
  }

  stop() {
    clearInterval(this.interval);
  }

  touchTarget(targetEl) {
    let xDif = this.el.offsetLeft - targetEl.offsetLeft;
    let yDif = this.el.offsetTop - targetEl.offsetTop;
    let touchRadius = ICON_SIZE;

    return (
      xDif <= touchRadius &&
      xDif >= -touchRadius &&
      yDif <= touchRadius &&
      yDif >= -touchRadius
    );
  }

  inArenaX(x) {
    return x > arena.offsetLeft && x < arena.offsetLeft + arena.offsetWidth;
  }

  inArenaY(y) {
    return y > arena.offsetTop && y < arena.offsetTop + arena.clientHeight;
  }

  decX(x) {
    if (this.inArenaX(x)) {
      x = x - SPEED;
    }
    return x;
  }

  incX(x) {
    if (this.inArenaX(x)) {
      x = x + SPEED;
    }
    return x;
  }

  decY(y) {
    if (this.inArenaY(y)) {
      y = y - SPEED;
    }
    return y;
  }

  incY(y) {
    if (this.inArenaY(y)) {
      y = y + SPEED;
    }
    return y;
  }

  moveToTarget() {
    this.stop();

    this.interval = setInterval(() => {
      console.log("tik");

      let x = this.el.offsetLeft;
      let y = this.el.offsetTop;

      let targetEl = this.findElelment(x, y, this.targets);

      if (targetEl) {
        if (this.touchTarget(targetEl)) {
          this.playSound();
          targetEl.el.infected(this.name, this.targets, this.icon);
        }

        if (targetEl.offsetLeft < this.el.offsetLeft) {
          x = this.decX(x);
        } else if (targetEl.offsetLeft > this.el.offsetLeft) {
          x = this.incX(x);
        }

        if (targetEl.offsetTop < this.el.offsetTop) {
          y = this.decY(y, "-");
        } else if (targetEl.offsetTop > this.el.offsetTop) {
          y = this.incY(y, "+");
        }
      }

      this.positionElement(
        x + this.randomInteger(-SPEED, SPEED),
        y + this.randomInteger(-SPEED, SPEED)
      );
    }, TIK);
  }

  positionElement(x, y) {
    this.el.style.left = x + "px";
    this.el.style.top = y + "px";
  }

  randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  findElelment = (x, y, targets) => {
    let closestEl, minDist, offset;

    [
      ...document.body.querySelectorAll(targets.map((t) => "." + t).join(", ")),
    ].forEach((el) => {
      offset = { left: el.offsetLeft, top: el.offsetTop };
      offset.left += el.offsetWidth / 2;
      offset.top += el.offsetHeight / 2;
      const dist = Math.sqrt(
        (offset.left - x) * (offset.left - x) +
          (offset.top - y) * (offset.top - y)
      );
      if (!minDist || dist < minDist) {
        minDist = dist;
        closestEl = el;
      }
    });
    return closestEl;
  };
}

const stopAllUnit = () => {
  [...arena.children].forEach((el) => el.el.stop());
};

const clearArena = () => {
  [...arena.children].forEach((el) => el.el.remove());
  scoreData.stopCheck();
  init_ui();
};

const spawn = () => {
  clearArena();

  let filtredElements = ELEMENTS.filter((e) => extended.checked || !e.extended)

  filtredElements.forEach((e) => {
      for (let n = 0; n < COUNT_ELEMENTS; n++) {
        new ElInstant(e);
      }
  });

  scoreData.interval = setInterval(() => {
    scoreData.check(filtredElements);
  }, SCORE_TIK);
};

const init_audio = () => {
  ELEMENTS.forEach((e) => {
    window
      .fetch(`./sound/${e.name}.mp3`)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => AUDIO_CONTEXT.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        SOUND_ASSETS[e.name] = audioBuffer;
      });
  });
};

const init_ui = () => {
  scoreTableLable.innerHTML = "";
  scoreTableValue.innerHTML = "";
  
  let filtredElements = ELEMENTS.filter((e) => extended.checked || !e.extended)

  filtredElements.forEach((e) => {
    if (extended.checked || !e.extended) {
      let templateColLable = document.createElement("th");
      templateColLable.title = e.name;
      templateColLable.innerHTML = e.icon;

      scoreTableLable.appendChild(templateColLable);

      let templateColValue = document.createElement("td");
      templateColValue.classList.add(`score-${e.name}`);
      templateColValue.title = e.name;
      templateColValue.innerHTML = 0;

      scoreTableValue.appendChild(templateColValue);
    }
  });
};

const main = () => {
  arena.style.width = WIDTH;
  arena.style.height = HEIGHT;

  init_audio();
  init_ui();

  go.addEventListener("click", spawn);
  reset.addEventListener("click", clearArena);
  extended.addEventListener("change", clearArena);
};

main();
