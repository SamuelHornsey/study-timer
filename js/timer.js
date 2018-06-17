/**
* By Samuel Hornsey
* Timer JS
*/

class Timer {
  constructor () {
    console.log(window)
    this.el = document.getElementById('timer');
    this.startBtn = document.getElementById('startBtn');
    this.stopBtn = document.getElementById('stopBtn');
    this.reset = document.getElementById('reset');
    this.input = document.getElementById('timerTime');
    this.slider = document.getElementById('range');
    this.summary = document.getElementById('summary');
    this.interval = 1000;
    this.el.innerHTML = this.currentTime;

    this._addEventListeners = this._addEventListeners.bind(this);
    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._resetTimer = this._resetTimer.bind(this);
    this._breakPercentage = this._breakPercentage.bind(this);
    this._summary = this._summary.bind(this);

    this._resetTimer();
    this._addEventListeners();
    this._breakPercentage();
    this._summary();
  }

  _summary() {
    let studyTime = this.currentTime * (1 - this.breakPercentage);

    let breakTime = this.currentTime * this.breakPercentage;
    this.summary.innerHTML = `Study Time: ${studyTime}, Break Time: ${breakTime}`;
  }

  _addEventListeners() {
    this.startBtn.addEventListener('click', this._startTimer);
    this.stopBtn.addEventListener('click', this._stopTimer);
    this.reset.addEventListener('click', this._resetTimer);
    this.slider.addEventListener('change', this._breakPercentage);
  }

  _breakPercentage() {
    this.breakPercentage = this.slider.value / 100;
    this._summary();
  }

  _startTimer() {
    this.timerId = setInterval(() => {
      if (this.currentTime <= 0) {
        this._stopTimer(this.timerId);
      }

      let min = Math.floor(this.currentTime / 60);

      let sec = this.currentTime % 60;

      this.el.innerHTML = `${min}:${sec}`;
      this.currentTime--;
      document.title = `(${min}:${sec}) Study Timer`;
    }, this.interval);
  }

  _stopTimer(id) {
    clearInterval(this.timerId);
  }

  _resetTimer() {
    this.currentTime = this.input.value * (60);

    let min = Math.floor(this.currentTime / 60);

    let sec = this.currentTime % 60;

    this.el.innerHTML = `${min}:${sec}`;
    this._summary();
  }
}

document.addEventListener('load', new Timer());
