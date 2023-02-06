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

        this.setModel()

        const woodbutton = document.getElementById('wood');
        woodbutton.addEventListener('click', () => {
            const texture = new THREE.TextureLoader().load('/texture/woodhandletexture.jpg');
            texture.flipY = false;
            texture.encoding = THREE.sRGBEncoding;
            this.bakedMaterial.map = texture;
        });

        const blackbutton = document.getElementById('black');
        blackbutton.addEventListener('click', () => {
            const texture = new THREE.TextureLoader().load('/texture/blackhandletexture.jpg');
            texture.flipY = false;
            texture.encoding = THREE.sRGBEncoding;
            this.bakedMaterial.map = texture;
        });

        const nrbutton = document.getElementById('red');
        nrbutton.addEventListener('click', () => {
            const texture = new THREE.TextureLoader().load('/texture/nrhandletexture.jpg');
            texture.flipY = false;
            texture.encoding = THREE.sRGBEncoding;
            this.bakedMaterial.map = texture;
        });
    }


    setModel() {
        this.textureLoader = new THREE.TextureLoader()
        this.bakedTexture = this.textureLoader.load('/texture/greenhandletexture.jpg')
        this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })
        this.bakedTexture.flipY = false
        this.bakedTexture.encoding = THREE.sRGBEncoding
        this.gltfLoader.load(
            '/models/NewFroggy/handleFroggy.glb',
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