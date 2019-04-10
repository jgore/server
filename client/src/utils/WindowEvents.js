import { EventEmitter } from "events";

class WindowEvents extends EventEmitter {
    constructor() {
        super()
        let that = this
        window.addEventListener("resize", function (e) {
            that.emit("resize", e)
        })
    }
}

export default WindowEvents