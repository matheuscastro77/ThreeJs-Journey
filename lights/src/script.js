import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

const parameters = {
    color: 0xffffff,
    colorSpotLight: 0x78ff00,
    colorReactLight: 0x4e00ff,
    colorPointLight: 0xff9000,
    colorHemisphere: 0xff0000,
    groundColorHemisphere: 0x0000ff,
    colorDirection: 0x00fffc,
    colorAmbientLight: 0xffffff
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// ambientLight.color = new THREE.Color(0xffffff)
// ambientLight.intensity = 0.5
scene.add(ambientLight)



const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)

const reactAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
reactAreaLight.position.set(1, -0.5, 1.5)
reactAreaLight.lookAt(new THREE.Vector3)
scene.add(reactAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25,  1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)

spotLight.target.position.x = -0.75
scene.add(spotLight.target)

// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const pointLighttHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLighttHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

const reactAreaLightHelper = new RectAreaLightHelper(reactAreaLight)
scene.add(reactAreaLightHelper)


/**
 * Debug
 */

const ambientLightFolder = gui.addFolder('Ambient Light')
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.01)
ambientLightFolder.addColor(parameters, 'colorAmbientLight').onChange(() => {
    ambientLight.color.set(parameters.colorAmbientLight)
})

const directionalLightFolder = gui.addFolder('Directional Light')
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01)
directionalLightFolder.addColor(parameters, 'colorDirection').onChange(() => {
    directionalLight.color.set(parameters.colorDirection)
})

const hemisphereLightFolder = gui.addFolder('Hemisphere Light')
hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01)
hemisphereLightFolder.addColor(parameters, 'colorHemisphere').onChange(() => {
    hemisphereLight.color.set(parameters.colorHemisphere)
})
hemisphereLightFolder.addColor(parameters, 'groundColorHemisphere').onChange(() => {
    hemisphereLight.groundColor.set(parameters.groundColorHemisphere)
})


const pointLightFolder = gui.addFolder('Point Light')
pointLightFolder.add(pointLight, 'intensity').min(0).max(1).step(0.01)
pointLightFolder.add(pointLight, 'distance').min(0).max(10).step(0.5)
pointLightFolder.add(pointLight.position, 'y').min(0).max(1).step(0.01).name('elevation')
pointLightFolder.add(pointLight.position, 'x').min(0).max(1).step(0.01).name('Right/Left')
pointLightFolder.add(pointLight.position, 'z').min(0).max(1).step(0.01).name('Up/Down')
pointLightFolder.addColor(parameters, 'colorPointLight').onChange(() => {
    pointLight.color.set(parameters.colorPointLight)
})


const reactAreaLightFolder = gui.addFolder('React Area Light')
reactAreaLightFolder.add(reactAreaLight, 'intensity').min(0).max(10).step(0.5)
reactAreaLightFolder.add(reactAreaLight, 'width').min(0).max(10).step(0.5)
reactAreaLightFolder.add(reactAreaLight, 'height').min(0).max(10).step(0.5)
reactAreaLightFolder.add(reactAreaLight.position, 'y').min(-1).max(2).step(0.1).name('elevation')
reactAreaLightFolder.add(reactAreaLight.position, 'x').min(-3).max(3).step(0.25).name('Right/Left')
reactAreaLightFolder.add(reactAreaLight.position, 'z').min(-5).max(5).step(0.25).name('Up/Down')
reactAreaLightFolder.addColor(parameters, 'colorReactLight').onChange(() => {
    reactAreaLight.color.set(parameters.colorReactLight)
})

const spotLightFolder = gui.addFolder('Spot Light Folder')
spotLightFolder.add(spotLight, 'intensity').min(0).max(10).step(0.5)
spotLightFolder.add(spotLight, 'distance').min(5).max(20).step(0.5)
spotLightFolder.add(spotLight, 'angle').min(0).max(3).step(0.0001)
spotLightFolder.add(spotLight, 'penumbra').min(-2).max(4).step(0.0001)
spotLightFolder.add(spotLight, 'decay').min(-2).max(3).step(0.001)
spotLightFolder.addColor(parameters, 'colorSpotLight').onChange(() => {
    spotLight.color.set(parameters.colorSpotLight)
})

gui
    .addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color)
    })


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4
// material.side = THREE.DoubleSide
// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()