console.log("html works correctly.");
let scene, renderer, camera, axes, grids;

// Define light
const light = new THREE.AmbientLight( 0x404040, 4 );

// Define some color constants
const RED = 0xFF0000;
const GREEN = 0x00FF00;
const BLUE = 0x0000FF;
const LIGHTRED = 0xFFCCCB;
const LIGHTGREEN = 0x90ee90;
const LIGHTBLUE = 0xADD8E6;


function init(){
    
    // Init renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(new THREE.Color(0x000000));// Toggle between dark and bright background?
    renderer.setSize(window.innerWidth, window.innerHeight);// Different size? Now it occupies the entire window

    // Init perspective camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.set( 2, 2, 2 );

    // Init scene
    scene = new THREE.Scene();

    // Init axes
    axes = new THREE.AxesHelper(10);// Length of the axes' arm
    
    // Init grids
    grids = new THREE.GridHelper(20, 20);// (size, divisons)

    var sphereGeometry = new THREE.SphereGeometry(0.2, 20, 20);
    var sphereMaterial = new THREE.MeshBasicMaterial({
        color: LIGHTGREEN,
        wireframe: false
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(1, 1, 1);


    scene.add( sphere );
    
    scene.add(light);
    scene.add(axes);
    scene.add(grids);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

}


function animate(){

    /*********************************/

    requestAnimationFrame( animate );
    
    camera.lookAt( sphere.position );
    
    renderer.render( scene, camera );

}
console.log("render complete");