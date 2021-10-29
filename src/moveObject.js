let scene, render, camera, axes, grids, sphere;

let speed = 0.1

const light = new THREE.AmbientLight(0x404040, 4)

function init(){

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(new THREE.Color(0xFFFFFFFF));
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 1000);
    camera.position.set(5,5,5);

    scene = new THREE.Scene();

    axes = new THREE.AxesHelper(10);

    scene.add(light);
    scene.add(axes);

    document.body.appendChild(renderer.domElement)

    let sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
    let sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x90ee90,
        wireframe: false
    });

    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.set(1,1,1);

    scene.add(sphere);

}

function animate(){

    requestAnimationFrame( animate );

    camera.lookAt(0, 0, 0)

    sphere.translateZ(speed);

    document.body.addEventListener("keydown", function(event){
        switch(event.code){
            case "KeyB":{
                speed *= -1;
            }
            default: break;
        }
    })

    renderer.render( scene, camera );
}