import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.width = 0.75 * window.innerWidth
        this.height = window.innerHeight
        this.pixelRation = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () =>
        {
            this.width = 0.75 * window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }
}