import Froggy from '../Froggy.js'
import Environment from "./Environment.js";
import Floor from './Floor.js'
import Handle from './Handle'

export default class World
{
    constructor()
    {
        this.froggy = new Froggy()
        this.scene = this.froggy.scene
        this.resources = this.froggy.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.handle = new Handle()
            this.environment = new Environment()
        })
    }
}