import * as THREE from 'three'
import Froggy from '../Froggy.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from "three/addons/loaders/DRACOLoader.js";

export default class Blades
{
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

        this.curvedButton = document.getElementById("curved");
        this.streightButton = document.getElementById("streight");
        this.selectedModel = null;

        this.loadCurvedBlade();

        this.curvedButton.addEventListener("click", () => {
            this.loadCurvedBlade();
        });
        this.streightButton.addEventListener("click", () => {
            this.loadStreightBlade();
        });
    }

    loadCurvedBlade() {
        if (this.selectedModel) {
            this.scene.remove(this.selectedModel);
        }

        this.textureLoader.load('texture/bladesBaked/curvedbaked.jpg', (texture) => {
            this.lamebakedMaterial = new THREE.MeshBasicMaterial({map: texture});
            texture.flipY = false
        });
        this.gltfLoader.load(
            "models/Blades/lamecurved.glb",
            (curvedBlade) => {
                this.selectedModel = curvedBlade.scene;
                this.selectedModel.traverse((child) => {
                    child.material = this.lamebakedMaterial;
                });
                this.selectedModel.scale.set(2, 2, 2);
                this.selectedModel.rotation.y = 1.6;
                this.scene.add(this.selectedModel);
            }
        );
    }
    loadStreightBlade() {
        if (this.selectedModel) {
            this.scene.remove(this.selectedModel);
        }

        this.bakedTexture = this.textureLoader.load('texture/bladesBaked/streightbaked.jpg')
        this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })
        this.bakedTexture.flipY = false
        this.gltfLoader.load(
            "models/Blades/lamestreight.glb",
            (streightBlade) => {
                this.selectedModel = streightBlade.scene;
                this.selectedModel.traverse((child) => {
                    child.material = this.bakedMaterial;
                });
                this.selectedModel.scale.set(2, 2, 2);
                this.selectedModel.rotation.y = 1.6;
                this.scene.add(this.selectedModel);
            }
        );
    }
}