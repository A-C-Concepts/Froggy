import * as THREE from 'three'
import Froggy from '../Froggy.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from "three/addons/loaders/DRACOLoader.js";

export default class Handle {
    constructor() {
        this.froggy = new Froggy()
        this.scene = this.froggy.scene
        this.resources = this.froggy.resources
        this.time = this.froggy.time
        this.debug = this.froggy.debug

        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('/draco/')
        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.setDRACOLoader(this.dracoLoader)

        this.textureLoader = new THREE.TextureLoader()
        this.texture = this.textureLoader.load('/texture/plank.jpeg')
        this.texture.repeat.set( 8, 8)
        this.texture.wrapS = THREE.RepeatWrapping
        this.texture.wrapT = THREE.RepeatWrapping


        this.setModel()
    }

    setModel() {
        this.bakedTexture = this.textureLoader.load('/texture/newbaked.jpg')
        this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })
        this.bakedTexture.flipY = false
        this.bakedTexture.encoding = THREE.sRGBEncoding
        this.gltfLoader.load(
            '/models/NewFroggy/newFroggy.glb',
            (gltf) => {
                gltf.scene.traverse((child) => {
                    child.material = this.bakedMaterial
                })
                gltf.scene.scale.set(2, 2, 2)
                gltf.scene.rotation.y = 1.6
                this.scene.add(gltf.scene)
            }
        )
    }
}