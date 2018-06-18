'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* By Samuel Hornsey
* Timer JS
*/

var Timer = function () {
  function Timer() {
    _classCallCheck(this, Timer);

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

  _createClass(Timer, [{
    key: '_addEventListeners',
    value: function _addEventListeners() {
      this.startBtn.addEventListener('click', this._startTimer);
      this.stopBtn.addEventListener('click', this._stopTimer);
      this.input.addEventListener('input', this._resetTimer);
    }
  }, {
    key: '_startTimer',
    value: function _startTimer() {
      var _this = this;

      if (this.timerId) return;

      this.timerId = setInterval(function () {
        if (_this.currentTime <= 0) {
          _this._stopTimer(_this.timerId);
        }

        var min = Math.floor(_this.currentTime / 60);

        var sec = _this.currentTime % 60;

        var percent = (_this.startTime - _this.currentTime) / _this.startTime;

        if (Math.round(percent * 100) < 10) {
          var bottom = 0;
        } else {
          var bottom = Math.round(percent * 100) - 10;
        }

        if (min < 10) min = '0' + min;

        if (sec < 10) sec = '0' + sec;

        _this.el.innerHTML = min + ':' + sec;
        _this.currentTime--;

        _this.percentage.style.background = 'linear-gradient(to right, #531cb3 ' + bottom + '%, #eee ' + Math.round(percent * 100) + '%)';
        document.title = '(' + min + ':' + sec + ') Study Timer';
      }, this.interval);
    }
  }, {
    key: '_stopTimer',
    value: function _stopTimer() {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }, {
    key: '_resetTimer',
    value: function _resetTimer() {
      this.currentTime = this.input.value * 60;
      this.startTime = this.currentTime;

      var min = Math.floor(this.currentTime / 60);

      var sec = this.currentTime % 60;

      if (min < 10) min = '0' + min;

      if (sec < 10) sec = '0' + sec;

      document.title = '(' + min + ':' + sec + ') Study Timer';
      this.el.innerHTML = min + ':' + sec;
      this.percentage.style.background = 'linear-gradient(to right, #531cb3 0%, #eee 0%)';
    }
  }]);

  return Timer;
}();

document.addEventListener('load', new Timer());