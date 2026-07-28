import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

/* ===========================================
   SCENE
=========================================== */

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf5f5f5)

/* ===========================================
   CAMERA
=========================================== */

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.set(3,3,5)

/* ===========================================
   RENDERER
=========================================== */

const renderer = new THREE.WebGLRenderer({
    antialias:true
})

renderer.setSize(
    window.innerWidth,
    window.innerHeight
)

renderer.shadowMap.enabled = true

document.body.appendChild(renderer.domElement)

/* ===========================================
   CONTROLS
=========================================== */

const controls = new OrbitControls(
    camera,
    renderer.domElement
)

controls.enableDamping = true

/* ===========================================
   LIGHT
=========================================== */

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1
)

scene.add(ambientLight)

const directionalLight =
new THREE.DirectionalLight(
    0xffffff,
    2
)

directionalLight.position.set(
    5,
    5,
    5
)

directionalLight.castShadow = true

scene.add(directionalLight)

/* ===========================================
   GRID
=========================================== */

const grid = new THREE.GridHelper(
    20,
    20
)

scene.add(grid)

/* ===========================================
   AXES
=========================================== */

const axes = new THREE.AxesHelper(5)

scene.add(axes)

/* ===========================================
   PLANE
=========================================== */

const plane = new THREE.Mesh(

    new THREE.PlaneGeometry(
        20,
        20
    ),

    new THREE.MeshStandardMaterial({

        color:0xdddddd,

        side:THREE.DoubleSide

    })

)

plane.rotation.x = -Math.PI/2

plane.receiveShadow = true

scene.add(plane)

/* ===========================================
   STL LOADER
=========================================== */

const loader = new STLLoader()

loader.load(
    'bearing.STL',
    function (geometry) {
        geometry.computeVertexNormals()

        // Pusatkan geometry ke origin
        geometry.center()

        const material = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.2,
            roughness: 0.5
        })

        const mesh = new THREE.Mesh(geometry, material)

        // Hitung ukuran geometry
        geometry.computeBoundingBox()

        const size = new THREE.Vector3()
        geometry.boundingBox.getSize(size)

        const maxDimension = Math.max(size.x, size.y, size.z)

        mesh.scale.setScalar(3 / maxDimension)

        mesh.castShadow = true
        mesh.receiveShadow = true

        // Setelah diskalakan, hitung bounding box dunia dan geser mesh
        // sehingga bagian bawahnya berada tepat di atas plane (y = 0).
        mesh.updateMatrixWorld(true)
        const box = new THREE.Box3().setFromObject(mesh)
        const yOffset = -box.min.y
        mesh.position.y += yOffset

        scene.add(mesh)

        /* -----------------------
           MODEL INFO
        ----------------------- */

        if (geometry.attributes && geometry.attributes.position) {
            console.log('Vertices :', geometry.attributes.position.count)
            console.log('Triangles :', geometry.attributes.position.count / 3)
        }
    },
    function (xhr) {
        if (xhr && xhr.total) {
            console.log(((xhr.loaded / xhr.total) * 100).toFixed(2) + '% loaded')
        }
    },
    function (error) {
        console.error('Error loading STL:', error)
    }
)

/* ===========================================
   RESIZE
=========================================== */

window.addEventListener(

    'resize',

    ()=>{

        camera.aspect =
        window.innerWidth /
        window.innerHeight

        camera.updateProjectionMatrix()

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        )

    }

)

/* ===========================================
   ANIMATION
=========================================== */

function animate(){

    requestAnimationFrame(animate)

    controls.update()

    renderer.render(
        scene,
        camera
    )

}

animate()