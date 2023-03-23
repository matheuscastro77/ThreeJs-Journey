import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * teste
 */

let tl = gsap.timeline()

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const roofColorTexture = textureLoader.load('/textures/roof/color.jpg')
const roofAmbientOcclusionTexture = textureLoader.load('/textures/roof/ambientOcclusion.jpg')
const roofNormalTexture = textureLoader.load('/textures/roof/normal.jpg')
const roofRoughnessTexture = textureLoader.load('/textures/roof/roughness.jpg')
const roofHeightTexture = textureLoader.load('/textures/roof/height.png')

roofColorTexture.repeat.set(4, 0.75)
roofAmbientOcclusionTexture.repeat.set(4, 0.75)
roofNormalTexture.repeat.set(4, 0.75)
roofRoughnessTexture.repeat.set(4, 0.75)
roofHeightTexture.repeat.set(4, 0.75)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofRoughnessTexture.wrapS = THREE.RepeatWrapping
roofHeightTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofRoughnessTexture.wrapT = THREE.RepeatWrapping
roofHeightTexture.wrapT = THREE.RepeatWrapping

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

const windowColorTexture = textureLoader.load('/textures/window/color.jpg')
const windowAmbientOcclusionTexture = textureLoader.load('/textures/window/ambientOcclusion.jpg')
const windowHeightTexture = textureLoader.load('/textures/window/height.png')
const windowNormalTexture = textureLoader.load('/textures/window/normal.jpg')
const windowMetalnessTexture = textureLoader.load('/textures/window/metalness.jpg')
const windowRoughnessTexture = textureLoader.load('/textures/window/roughness.jpg')

windowColorTexture.repeat.set(0.25, 0.25)
windowAmbientOcclusionTexture.repeat.set(0.25, 0.25)
windowNormalTexture.repeat.set(0.25, 0.25)
windowRoughnessTexture.repeat.set(0.25, 0.25)
windowHeightTexture.repeat.set(0.25, 0.25)
windowMetalnessTexture.repeat.set(0.25, 0.25)

windowColorTexture.wrapS = THREE.RepeatWrapping
windowAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
windowNormalTexture.wrapS = THREE.RepeatWrapping
windowRoughnessTexture.wrapS = THREE.RepeatWrapping
windowHeightTexture.wrapS = THREE.RepeatWrapping
windowMetalnessTexture.wrapS = THREE.RepeatWrapping

windowColorTexture.wrapT = THREE.RepeatWrapping
windowAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
windowNormalTexture.wrapT = THREE.RepeatWrapping
windowRoughnessTexture.wrapT = THREE.RepeatWrapping
windowHeightTexture.wrapT = THREE.RepeatWrapping
windowMetalnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */

// Group
const house = new THREE.Group()
scene.add(house)

//Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
     })
)
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofAmbientOcclusionTexture,
        displacementMap: roofHeightTexture,
        displacementScale: 0.0001,
        normalMap: roofNormalTexture,
        roughnessMap: roofRoughnessTexture
     })
)
roof.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2)
)
roof.position.y = 3
roof.rotation.y = Math.PI / 4
house.add(roof)


// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.08,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture

    })
)
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)

door.position.z = 2 + 0.01
door.position.y = 1
house.add(door)

// Window
const windows = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100,100),
    new THREE.MeshStandardMaterial({
        map: windowColorTexture,
        aoMap: windowAmbientOcclusionTexture,
        displacementMap: windowHeightTexture,
        displacementScale: 0.025,
        normalMap: windowNormalTexture,
        metalnessMap: windowMetalnessTexture,
        roughnessMap: windowRoughnessTexture
    })
)
windows.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(windows.geometry.attributes.uv.array, 2)
)

windows.rotation.y = Math.PI / 2
windows.position.x = 2 + 0.001
windows.position.y = 1.25

const windows2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100,100),
    new THREE.MeshStandardMaterial({
        map: windowColorTexture,
        aoMap: windowAmbientOcclusionTexture,
        displacementMap: windowHeightTexture,
        displacementScale: 0.025,
        normalMap: windowNormalTexture,
        metalnessMap: windowMetalnessTexture,
        roughnessMap: windowRoughnessTexture
    })
)
windows2.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(windows2.geometry.attributes.uv.array, 2)
)

windows2.rotation.y = Math.PI * 1.5
windows2.position.x = -2 - 0.001
windows2.position.y = 1.25

house.add(windows, windows2)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Floor
const floor = new THREE.Mesh(
    new THREE.CircleGeometry(15, 150),
    new THREE.MeshStandardMaterial({ 
        side: THREE.DoubleSide,
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture })
)
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 1.2, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for (let i = 0; i < 60; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 9
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random())
    grave.rotation.z = (Math.random()) - 0.5
    grave.castShadow = true
    graves.add(grave)
}



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')


/** 
 * Shadows
*/
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true
walls.receiveShadow = true
door.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7


  //Rotate Camera
  tl.to(camera.position, { z: Math.PI * 2, duration: 5}) 
  tl.to(camera.position, { x: Math.PI * 2, duration: 5})
  tl.to(camera.position, { y: Math.PI * 2, duration: 5})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Ghots
    const ghostAngle = elapsedTime * 0.6
    ghost1.position.x = Math.cos(ghostAngle) * 8
    ghost1.position.z = Math.sin(ghostAngle) * 8
    ghost1.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5) 

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 4
    ghost2.position.z = Math.sin(ghost2Angle) * 4
    ghost2.position.y = Math.sin(elapsedTime * 3) 

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5) 


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()