import * as THREE from  'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Froggy from './Froggy.js'

export default class Camera
{
    constructor(froggy)
    {
        this.froggy = new Froggy()
        this.sizes = this.froggy.sizes
        this.scene = this.froggy.scene
        this.canvas = this.froggy.canvas

        this.setInstance()
        this.setOrbitControls()

        this.sizes.on('resize', () =>
        {

        })
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            75,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(- 3.69, 1.36, - 0.52)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.target.set(0, 1, 0)

        this.controls.minDistance = 2;
        this.controls.maxDistance = 8;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.enablePan = false; //Disable right click function on orbits controls

        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}