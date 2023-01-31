import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Froggy from '../Froggy.js'

export default class World
{
    constructor()
    {
        this.froggy = new Froggy()
        this.scene = this.froggy.scene
        this.debug = this.froggy.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Frog Model')
            this.debugPosition = this.debugFolder.addFolder('Position')

        }

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load('/texture/plank.jpeg')
        texture.repeat.set( 8, 8)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping

        const bakedTexture = textureLoader.load('/texture/newbaked.jpg')
        const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
        bakedTexture.flipY = false
        bakedTexture.encoding = THREE.sRGBEncoding
        gltfLoader.load(
            '/models/NewFroggy/newFroggy.glb',
            (gltf) => {
                gltf.scene.traverse((child) => {
                    child.material = bakedMaterial
                })
                gltf.scene.scale.set(2, 2, 2)
                gltf.scene.rotation.y = 1.6
                this.scene.add(gltf.scene)

                // Debug
                if(this.debug.active)
                {
                    this.debugPosition
                        .add(this.scene.position, 'y', -10, 10, 0.01)
                        .name('Y')

                    this.debugPosition
                        .add(this.scene.position, 'x', -10, 10, 0.01)
                        .name('X')

                    this.debugPosition
                        .add(this.scene.position, 'z', -10, 10, 0.01)
                        .name('Z')

                }
            }
        )
    }
}