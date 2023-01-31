import * as THREE from 'three'
import Froggy from '../Froggy.js'

export default class Handle
{
    constructor()
    {
        this.froggy = new Froggy()
        this.scene = this.froggy.scene
        this.resources = this.froggy.resources
        this.time = this.froggy.time
        this.debug = this.froggy.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('handle')
        }

        // Resource
        this.resource = this.resources.items.handleModel
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }
}