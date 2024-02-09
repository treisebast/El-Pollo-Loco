class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.bindBtnsTouchEvents();
        this.bindKeybuttonsEvents();
    }


    /**
     * controlling with keyboard
     */
    bindKeybuttonsEvents() {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = true;
            }
            if (e.keyCode == 37) {
                this.LEFT = true;
            }
            if (e.keyCode == 38) {
                this.UP = true;
            }
            if (e.keyCode == 40) {
                this.DOWN = true;
            }
            if (e.keyCode == 32) {
                this.SPACE = true;
            }
            if (e.keyCode == 68) {
                this.D = true;
            }
        });

        document.addEventListener("keyup", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = false;
            }
            if (e.keyCode == 37) {
                this.LEFT = false;
            }
            if (e.keyCode == 38) {
                this.UP = false;
            }
            if (e.keyCode == 40) {
                this.DOWN = false;
            }
            if (e.keyCode == 32) {
                this.SPACE = false;
            }
            if (e.keyCode == 68) {
                this.D = false;
            }
        });
    }


    /**
     * Touchbuttons for Mobiledevice
     */
    bindBtnsTouchEvents() {
        document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById("btnLeft").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById("btnRight").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById("btnRight").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.D = true;
        });
        document.getElementById("btnThrow").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.D = false;
        });

        document.getElementById("btnJump").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById("btnJump").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    }
}
