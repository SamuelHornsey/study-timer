export default class Timer extends HTMLElement {
    // HTML Elements
    private _start: HTMLElement;
    private _reset: HTMLElement;
    private _period: HTMLInputElement;

    private _currentTime: number;
    private _initTime: number = 30;

    get currentTime (): number {
        return this.currentTime;
    }

    get initTime(): number {
        return this._initTime;
    }

    set initTime(initTime: number) {
        this._initTime = initTime;
    }

    constructor () {
        super();
    }
    
    connectedCallback () {
        this._start = this.querySelector('.js-start');
        this._reset = this.querySelector('.js-reset');
        this._period = this.querySelector('.js-period');

        this._start.addEventListener('click', () => this.start());
        this._reset.addEventListener('click', () => this.stop());
        this._period.addEventListener('input', () => this.reset());
    }

    private start () {
        console.log(this);
    }

    private stop () {
        console.log('Stop');
    }

    private reset () {
        console.log(this._period.value);

        this._currentTime = +this._period.value * 60;
    }
}