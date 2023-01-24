import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


var objHidden = true;
/**
 * Loading Progress Bar
 */

const loadingManager = new THREE.LoadingManager()

const progressBar = document.getElementById('progress-bar');

loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
    console.log('Component', loaded, 'loaded', url);
}

const progressBarContainer = document.querySelector('.progress-bar-container');

loadingManager.onLoad = function() {
    progressBarContainer.style.display = 'none';
    console.log('Website loaded');
}

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load('/texture/plank.jpeg')
texture.repeat.set( 8, 8)
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
console.warn('Texture OK');

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ closed: true })

// Canvas
const canvas = document.querySelector('canvas.webgl')
console.warn('Canvas OK');
// Scene
const scene = new THREE.Scene(loadingManager)
scene.background = new THREE.Color(0x010101);

/**
 * Models
 */
const dracoLoader = new DRACOLoader(loadingManager)
dracoLoader.setDecoderPath('/draco/')
console.warn('Dracoloader OK')

const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)
console.warn('GLTFLoader OK')

// AXES HELPER
const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

/**
 * Floor
 */

const floorMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: 0x817a74,
    metalness: 0,
    roughness: 0.82
})
const floorPlane = new THREE.PlaneGeometry(40, 40)
const floor = new THREE.Mesh(floorPlane, floorMaterial, loadingManager)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
//const folder5 = gui.addFolder('Material Floor');
//folder5
//    .addColor(floorMaterial, 'color')
//folder5
//    .add(floorMaterial, 'metalness').min(- 2).max(2).step(0.01)
//folder5
//    .add(floorMaterial, 'roughness').min(- 2).max(2).step(0.01)
//folder5
//    .add(floorMaterial, 'visible')
//folder5
//    .add(floorMaterial, 'wireframe')
floor.receiveShadow = true
scene.add(floor)
console.warn('Floor OK');

/**
 * Lights
 */
//const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
//scene.add(ambientLight)

//const directionalLight = new THREE.DirectionalLight(0xffffff, )
//directionalLight.castShadow = true
//directionalLight.shadow.mapSize.set(1024, 1024)
//directionalLight.shadow.camera.far = 15
//directionalLight.shadow.camera.left = - 7
//directionalLight.shadow.camera.top = 7
//directionalLight.shadow.camera.right = 7
//directionalLight.shadow.camera.bottom = - 7
//directionalLight.position.set(- 3, 6, 1)
//scene.add(directionalLight)

const spotLight = new THREE.SpotLight(0xfde8c4, 3.54, 17.55, 0.4, 1, 0.59)
spotLight.position.set(- 0.15, 14.35, 0.58)
spotLight.rotation.set(6.435, 0.043, 0)
//const spotLight2 = new THREE.SpotLight(0xfde8c4, 2.06, 28.61, 0.287, 0.59, 0.59)
//spotLight2.position.set(7.96, 10, - 8.27)

const spotLightHelper = new THREE.SpotLightHelper(spotLight);


gui.add(spotLight.position, 'x').min(- 10).max(50).step(0.01)
gui.add(spotLight.position, 'y').min(- 0).max(50).step(0.01)
gui.add(spotLight.position, 'z').min(- 10).max(50).step(0.01)
gui.addColor(spotLight, 'color')
gui.add(spotLight, 'intensity').min(- 10).max(50).step(0.01)
gui.add(spotLight, 'distance').min(- 10).max(50).step(0.01)
gui.add(spotLight, 'angle').min(0).max(1).step(0.001)
gui.add(spotLight, 'penumbra').min(- 10).max(50).step(0.01)
gui.add(spotLight, 'decay').min(- 10).max(50).step(0.01)
gui.add(spotLight.rotation, 'x').min(0).max(10).step(0.001)
gui.add(spotLight.rotation, 'y').min(0).max(10).step(0.001)
gui.add(spotLight.rotation, 'z').min(0).max(10).step(0.001)
gui.add(spotLightHelper, 'visible')
scene.add(spotLight)
//scene.add(spotLight2)
spotLight.castShadow = true
//spotLight2.castShadow = true
console.warn('Light OK');


//Import model with baked texture
const bakedTexture = textureLoader.load('/texture/baked2.jpg')
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding
gltfLoader.load(
    '/models/Froggy/froggyblack4.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = bakedMaterial
        })
        gltf.scene.scale.set(0.35, 0.35, 0.35)
        gltf.scene.rotation.y = - 1.6
        scene.add(gltf.scene)
    }
)

//Model 1
const lamebakedTexture = textureLoader.load('texture/bakedlames2.jpg')
const lamebakedMaterial = new THREE.MeshBasicMaterial({ map: lamebakedTexture })
lamebakedTexture.flipY = false
lamebakedTexture.encoding = THREE.sRGBEncoding

gltfLoader.load(
    'models/lame.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = lamebakedMaterial
        })

        gltf.scene.scale.set(-0.35, 0.35, 0.35)

        gltf.scene.position.x = - 0.2
        gltf.scene.position.z = 1.85
        gltf.scene.position.y = 0.96

        gltf.scene.rotation.x = 2.98
        gltf.scene.rotation.z = - 0.234
        gltf.scene.rotation.y = 4.75

        scene.add(gltf.scene)
        document.getElementById("streight").addEventListener("click", function(){
            scene.remove(gltf.scene)
        });
        document.getElementById("curved").addEventListener("click", function(){
            scene.add(gltf.scene)
        });
    }
)

//Models 2
const lamebakedStreightTexture = textureLoader.load('texture/bakedlames.jpg')
const lamebakedStreightMaterial = new THREE.MeshBasicMaterial({ map: lamebakedStreightTexture })
lamebakedStreightTexture.flipY = false
lamebakedStreightTexture.encoding = THREE.sRGBEncoding

gltfLoader.load(
    'models/lamedroite.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = lamebakedStreightMaterial
        })

        gltf.scene.scale.set(-0.35, 0.35, 0.35)

        gltf.scene.position.x = - 0.2
        gltf.scene.position.z = 1.85
        gltf.scene.position.y = 0.96

        gltf.scene.rotation.x = 2.98
        gltf.scene.rotation.z = - 0.234
        gltf.scene.rotation.y = 4.75

        scene.remove(gltf.scene)
        document.getElementById("streight").addEventListener("click", function(){
            scene.add(gltf.scene)
        });
        document.getElementById("curved").addEventListener("click", function(){
            scene.remove(gltf.scene)
        });
    }
)


//Change texture on click
const woodbutton = document.getElementById('wood');
woodbutton.addEventListener('click', () => {
    const texture = new THREE.TextureLoader().load('texture/baked2.jpg');
    texture.flipY = false;
    texture.encoding = THREE.sRGBEncoding;
    bakedMaterial.map = texture;
});

const redbutton = document.getElementById('red');
redbutton.addEventListener('click', () => {
    const texture = new THREE.TextureLoader().load('texture/baked3.jpg');
    texture.flipY = false;
    texture.encoding = THREE.sRGBEncoding;
    bakedMaterial.map = texture;
});

const blackbutton = document.getElementById('black');
blackbutton.addEventListener('click', () => {
    const texture = new THREE.TextureLoader().load('texture/baked4.jpg');
    texture.flipY = false;
    texture.encoding = THREE.sRGBEncoding;
    bakedMaterial.map = texture;
});

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
console.warn('Sizes OK');

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(- 3.69, 1.36, - 0.52)

//const folder4 = gui.addFolder('Position Camera');
//folder4
//    .add(camera.position, 'x')
//    .min(- 15)
//    .max(15)
//    .step(0.01)
//folder4
//    .add(camera.position, 'y')
//    .min(- 15)
//    .max(15)
//    .step(0.01)
//folder4
//    .add(camera.position, 'z')
//    .min(- 15)
//    .max(15)
//    .step(0.01)
//folder4.add(camera, 'fov').min(0).max(85).step(1)
scene.add(camera)
console.warn('Camera OK');

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 1, 0)

//Set limit at orbit controls
controls.minDistance = 2;
controls.maxDistance = 8;
controls.maxPolarAngle = Math.PI / 2;
controls.enablePan = false; //Disable right click function on orbits controls

//Set smooth at orbit controls
controls.enableDamping = true
console.warn('OrbitControls OK');

//Slider zoomer
const wheeldetector = document.getElementById('body');
wheeldetector.addEventListener("wheel", function (e) {
    const zoomer = document.querySelector('#zoom input');
    if (e.deltaY < 0) {
        zoomer.value += 0.01;
    } else {
        zoomer.value -= 0.01;
    }
    e.stopPropagation();
    zoomer.value = camera.position.length();
    zoomer.addEventListener('input', function (e) {
        const zoomDistance = Number(zoomer.value),
            currDistance = camera.position.length(),
            factor = zoomDistance / currDistance;
        camera.position.x *= factor;
        camera.position.y *= factor;
        camera.position.z *= factor;
    });
})
// Duplicate without if else, for fix the bug of zoom
const zoomer = document.querySelector('#zoom input');
zoomer.value = camera.position.length();
zoomer.addEventListener('input', function (e) {
    const zoomDistance = Number(zoomer.value),
        currDistance = camera.position.length(),
        factor = zoomDistance / currDistance;
    camera.position.x *= factor;
    camera.position.y *= factor;
    camera.position.z *= factor;
});

console.warn('Zoomer input range OK');

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding
console.warn('Renderer OK');
/**
 * Animate
 */
const clock = new THREE.Clock(loadingManager)
let previousTime = 0


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()