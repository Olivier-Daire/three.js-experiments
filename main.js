
var camera, scene, renderer, group, cubes, tween; 
//assign three.js objects to each variable 
function init(){ 
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

	camera = new THREE.PerspectiveCamera( 75, document.documentElement.clientWidth / document.documentElement.clientHeight, 0.1, 1000 ); 
	scene = new THREE.Scene(); 
	renderer = new THREE.WebGLRenderer({antialias: true}); 

	renderer.setSize( document.documentElement.clientWidth, document.documentElement.clientHeight ); 
	//set the camera position 
    camera.position.z = 5; 
	document.body.appendChild( renderer.domElement ); 
}


function addCube(){ 
    //create box geometry object
    group = new THREE.Object3D(); 
    var geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    //create material with colour 
    var colors=[0x20a0aa,0xfead13,0xed4039];
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } ); 
    for ( var i = 0; i < geometry.faces.length; i++ ) {
		 geometry.faces[ i ].color.setHex( colors[Math.floor(i/4) ]);
	}

	cubes=[];
	var cubes_pos=[
		[-1,1,-1],
		[-1,1,1],
		[1,1,1],
		[1,1,-1],
		[1,-1,-1],
		[1,-1,1],
		[-1,-1,1],
		[-1,-1,-1]
	];

	for ( var k = 0; k < cubes_pos.length; k ++ ) {
		var cube = new THREE.Mesh( geometry, material );
		cube.position.x=cubes_pos[k][0];
		cube.position.y=cubes_pos[k][1];
		cube.position.z=cubes_pos[k][2];
		cubes.push(cube);
		group.add(cube);
	}
	// var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	// directionalLight.position.set(1, 1, 1 );
	// scene.add( directionalLight );
    //add the cube to the scene 
    scene.add( group ); 
}

function animate(){
	rotateGroup();
	//groupCubes();
}

// Rotate cubes by 90 degrees
function rotateGroup() {
	var new_rotation = group.rotation.y+(Math.PI/180)*90;

	TweenLite.to(group.rotation, 1, {ease:Expo.easeInOut, delay: 0.2, y: new_rotation, onComplete: rotateCubes});
}

// rotating each cube by 90 degrees
function rotateCubes() {
	//TweenLite.to(group.rotation, 1, {delay:0.2, onComplete: rotateGroup});
	for ( var i = 0; i < cubes.length; i++ ) {
		var new_rotation=cubes[i].rotation.x+(Math.PI/180)*90;
		TweenLite.to(cubes[i].rotation, 1, {ease:Expo.easeInOut ,delay: 0.2 , x:new_rotation, y:0, z:0, onComplete: groupCubes});
	}
}

function groupCubes(){
	var positions = [
		[-0.5,0.5,-0.5],
		[-0.5,0.5,0.5],
		[0.5,0.5,0.5],
		[0.5,0.5,-0.5],
		[0.5,-0.5,-0.5],
		[0.5,-0.5,0.5],
		[-0.5,-0.5,0.5],
		[-0.5,-0.5,-0.5]
	];
	for ( var i = 0; i < cubes.length; i++ ) {
		TweenLite.to(cubes[i].position, 1, {ease:Expo.easeInOut ,delay: 0.2 , x: positions[i][0], y: positions[i][1], z: positions[i][2], onComplete: resetCubes});
	}
}

function resetCubes(){
	var positions = [
		[-1,1,-1],
		[-1,1,1],
		[1,1,1],
		[1,1,-1],
		[1,-1,-1],
		[1,-1,1],
		[-1,-1,1],
		[-1,-1,-1]
	];
	for ( var i = 0; i < cubes.length; i++ ) {
		TweenLite.to(cubes[i].position, 1, {ease:Expo.easeInOut ,delay: 0.2 , x: positions[i][0], y: positions[i][1], z: positions[i][2], onComplete: rotateGroup});
	}
}


function render() { 
    //get the frame 
    requestAnimationFrame( render ); 
    //render the scene 
    renderer.render( scene, camera );
}

init()
addCube()
animate()
render()
