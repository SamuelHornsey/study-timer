/**
* By Samuel Hornsey
* Timer JS
*/

class Timer {
  constructor () {
    this.el = document.getElementById('timer');
    this.startBtn = document.getElementsByClassName('start')[0];
    this.stopBtn = document.getElementsByClassName('stop')[0];
    this.input = document.getElementById('timerTime');
    this.percentage = document.getElementsByClassName('timer-perc')[0];
    this.interval = 1000;
    this.el.innerHTML = this.currentTime;

    this._addEventListeners = this._addEventListeners.bind(this);
    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._resetTimer = this._resetTimer.bind(this);

    this._resetTimer();
    this._addEventListeners();
  }

  _addEventListeners() {
    this.startBtn.addEventListener('click', this._startTimer);
    this.stopBtn.addEventListener('click', this._stopTimer);
    this.input.addEventListener('input', this._resetTimer);
  }

  _startTimer() {
    if (this.timerId)
      return;
    
    this.stopBtn.innerHTML = 'Stop';

    this.timerId = setInterval(() => {
      if (this.currentTime <= 0) {
        this._stopTimer(this.timerId);
      }

      let min = Math.floor(this.currentTime / 60);

      let sec = this.currentTime % 60;

      let percent = (this.startTime - this.currentTime) / this.startTime;

      if (Math.round(percent * 100) < 10) {
        var bottom = 0;
      } else {
        var bottom = Math.round(percent * 100) - 10;
      }

      if (min < 10)
        min = `0${min}`;

      if (sec < 10)
        sec = `0${sec}`;

      this.el.innerHTML = `${min}:${sec}`;
      this.currentTime--;

      this.percentage.style.background = `linear-gradient(to right, #531cb3 ${bottom}%, #eee ${Math.round(percent * 100)}%)`
      document.title = `(${min}:${sec}) Study Timer`;
    }, this.interval);
  }

  _stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
      this.stopBtn.innerHTML = 'Reset';
    } else {
      this._resetTimer();
    }
  }

  _resetTimer() {
    this.currentTime = this.input.value * (60);
    this.startTime = this.currentTime;

    let min = Math.floor(this.currentTime / 60);

    let sec = this.currentTime % 60;

    if (min < 10)
      min = `0${min}`;

    if (sec < 10)
      sec = `0${sec}`;

    document.title = `(${min}:${sec}) Study Timer`;
    this.el.innerHTML = `${min}:${sec}`;
    this.percentage.style.background = `linear-gradient(to right, #531cb3 0%, #eee 0%)`
  }
}

document.addEventListener('load', new Timer());
