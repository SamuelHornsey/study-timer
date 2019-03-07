export default class Timer extends HTMLElement {
    // HTML Elements
    private _start: HTMLElement;
    private _reset: HTMLElement;
    private _period: HTMLInputElement;
    private _currentTimeElement: HTMLElement;
    private _percent: HTMLElement;

    // Properties
    private _currentTime: number;
    private _initTime: number = 30;
    private _timerId: any;

    // Getter for current time
    get currentTime (): number {
        return this.currentTime;
    }

    // Getter for init time
    get initTime (): number {
        return this._initTime;
    }

    // Setter for init time
    set initTime (initTime: number) {
        this._initTime = initTime;
    }

    /**
     * Constructor
     */
    constructor () {
        super();
    }
    
    /**
     * Connected Callback
     * 
     * Runs when the custom element is connected to the DOM
     */
    connectedCallback () {
        // Get elements
        this._start = this.querySelector('.js-start');
        this._reset = this.querySelector('.js-reset');
        this._period = this.querySelector('.js-period');
        this._currentTimeElement = this.querySelector('.js-current-time');
        this._percent = this.querySelector('.js-percent');

        // Add event listeners
        this._start.addEventListener('click', () => this.start());
        this._reset.addEventListener('click', () => this.stop());
        this._period.addEventListener('input', () => this.reset());

        // Run reset on start
        this.reset();
    }

    /**
     * Start
     * 
     * Starts the timer interval
     */
    private start () {
        // Prevent creating multiple timers
        if (this._timerId) return;

        // Set the stop buttton
        this._reset.innerHTML = 'Stop';

        // Create an interval time
        this._timerId = setInterval(() => {
            // Exit if at 0
            if (this._currentTime === 0) {
                this.stop();
                return;
            }

            // Decreae time increment
            this._currentTime--;
            this.renderTime();
        }, 1000);
    }

    /**
     * Stop
     * 
     * Stops the timer interval. Also handles timer reset event.
     */
    private stop () {
        // Stopping the time
        if (this._timerId) {
            clearInterval(this._timerId);
            this._timerId = null;
            this._reset.innerHTML = 'Reset';

            // Return if the timer needs to stopped
            return;
        }

        // Calls the reset function
        this.reset();
    }

    /**
     * Reset
     * 
     * Resets timer
     */
    private reset () {     
        // Get the current and start times   
        this._currentTime = +this._period.value * 60;
        this._initTime = this._currentTime;

        // If the value is not a number return
        if (isNaN(this._currentTime)) return;

        // Render the time information
        this.renderTime();
    }

    /**
     * Render Time
     * 
     * Renders the time information to the screen
     */
    private renderTime () {
        let min = Math.floor(this._currentTime / 60);
        let sec = this._currentTime % 60;

        // Convert times to string
        let minToString: string = min < 10 ? `0${min}` : `${min}`;
        let secToString: string = sec < 10 ? `0${sec}` : `${sec}`;

        // Get timer percent
        let percent = (this._initTime - this._currentTime) / this._initTime;

        document.title = `(${minToString}:${secToString}) Study Timer`;
        this._currentTimeElement.innerHTML = `${minToString}:${secToString}`;
        this._percent.style.background = `linear-gradient(to right, #531cb3 0%, #eee ${Math.round(percent * 100)}%)`
    }
}