import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x222222)

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.set(3, 3, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05

// Grid
const grid = new THREE.GridHelper(20, 20)
scene.add(grid)

const planeGeometry = new THREE.PlaneGeometry(20,20)

const planeMaterial = new THREE.MeshStandardMaterial({

    color:0xdddddd,

    side:THREE.DoubleSide

})

const plane = new THREE.Mesh(
    planeGeometry,
    planeMaterial
)

plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true

scene.add(plane)

// Axis
const axes = new THREE.AxesHelper(5)
scene.add(axes)

// Cube
const cube = new THREE.Mesh(

    new THREE.BoxGeometry(1,1,1),

    new THREE.MeshStandardMaterial({

        color:0x4CAF50

    })

)

cube.position.set(0,0.5,0)

cube.castShadow = true

scene.add(cube)
cube.userData.name = "Cube"

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(5, 5, 5)
directionalLight.castShadow = true
scene.add(directionalLight)

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        0.6,
        32,
        32
    ),

    new THREE.MeshStandardMaterial({
        color:0x2196F3
    })
)

sphere.position.set(-3,0.6,0)

sphere.castShadow = true

scene.add(sphere)
sphere.userData.name = "Sphere"


// cylinder
const cylinder = new THREE.Mesh(

    new THREE.CylinderGeometry(

        0.5,

        0.5,

        1.5,

        32

    ),

    new THREE.MeshStandardMaterial({

        color:0xFFC107

    })

)

cylinder.position.set(3,0.75,0)

cylinder.castShadow = true

scene.add(cylinder)
cylinder.userData.name = "Cylinder"

// cone
const cone = new THREE.Mesh(

    new THREE.ConeGeometry(

        0.6,

        1.5,

        32

    ),

    new THREE.MeshStandardMaterial({

        color:0xE91E63

    })

)

cone.position.set(0,0.75,-3)

cone.castShadow = true

scene.add(cone)
cone.userData.name = "Cone"


// torus
const torus = new THREE.Mesh(

    new THREE.TorusGeometry(

        0.7,

        0.25,

        32,

        100

    ),

    new THREE.MeshStandardMaterial({

        color:0x9C27B0

    })

)

torus.position.set(-3,1,-3)

torus.castShadow = true

scene.add(torus)
torus.userData.name = "Torus"

// knot
const knot = new THREE.Mesh(

    new THREE.TorusKnotGeometry(

        0.5,

        0.18,

        120,

        16

    ),

    new THREE.MeshStandardMaterial({

        color:0xFF5722

    })

)

knot.position.set(3,1,-3)

knot.castShadow = true

scene.add(knot)
knot.userData.name = "Knot"

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const objects = [
    cube,
    sphere,
    cylinder,
    cone,
    torus,
    knot
]
window.addEventListener("click", onClick)

function onClick(event){

    mouse.x =

    (event.clientX/window.innerWidth)*2-1

    mouse.y =

    -(event.clientY/window.innerHeight)*2+1

    raycaster.setFromCamera(

        mouse,

        camera
    )

    const intersects =
    raycaster.intersectObjects(objects)
    objects.forEach((item)=>{
        item.scale.set(1,1,1)
        item.material.color.set(item.userData.originalColor)
    })

    if(intersects.length>0){
        const object = intersects[0].object
        object.material.color.set(0xff0000)
        object.scale.set(1.3,1.3,1.3)
        console.log(object.userData.name)
    }
}


// Animation
function animate() {
    requestAnimationFrame(animate)
    controls.update()
    cube.rotation.y += 0.01

    sphere.rotation.y += 0.01

    cylinder.rotation.y += 0.01

    cone.rotation.y += 0.01

    torus.rotation.x += 0.01
    torus.rotation.y += 0.01

    knot.rotation.x += 0.01
    knot.rotation.y += 0.01
    renderer.render(scene, camera)
}

animate()