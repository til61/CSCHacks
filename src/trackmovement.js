let camera, scene, renderer, mesh, goal, keys, follow;

let time = 0;
let newPosition = new THREE.Vector3();
let matrix = new THREE.Matrix4();

let stop = 1;
let DEGTORAD = 0.01745327;
let temp = new THREE.Vector3;
let dir = new THREE.Vector3;
let a = new THREE.Vector3;
let b = new THREE.Vector3;
let coronaSafetyDistance = 0.3;
let velocity = 0.0;
let speed = 0.0;

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.set( 0, .3, 0 );
    
    scene = new THREE.Scene();
    camera.lookAt( scene.position );

    let geometry = new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 );
    let material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    
    goal = new THREE.Object3D;
    follow = new THREE.Object3D;
    follow.position.z = -coronaSafetyDistance;
    mesh.add( follow );
    
    goal.add( camera );
    scene.add( mesh );
 

    
    let gridHelper = new THREE.GridHelper( 40, 40 );
    scene.add( gridHelper );
    
    scene.add( new THREE.AxesHelper() );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("webgl-output").appendChild(renderer.domElement);
  
keys = {
    a: false,
    s: false,
    d: false,
    w: false
  };
  
  document.body.addEventListener( 'keydown', function(e) {
    
    const key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = true;
    
  });
  document.body.addEventListener( 'keyup', function(e) {
    
    const key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = false;
    
  });

}


function animate() {

    requestAnimationFrame( animate );
    
  speed = 0.0;
  
  if ( keys.w )
    speed = 0.01;
  else if ( keys.s )
    speed = -0.01;

  velocity += ( speed - velocity ) * .3;
  mesh.translateZ( velocity );

  if ( keys.a )
    mesh.rotateY(0.05);
  else if ( keys.d )
    mesh.rotateY(-0.05);
    
  
  a.lerp(mesh.position, 0.4);
  b.copy(goal.position);
  
    dir.copy( a ).sub( b ).normalize();
    const dis = a.distanceTo( b ) - coronaSafetyDistance;
    goal.position.addScaledVector( dir, dis );
    goal.position.lerp(temp, 0.02);
    temp.setFromMatrixPosition(follow.matrixWorld);
    
    camera.lookAt( mesh.position );
    
    renderer.render( scene, camera );

}