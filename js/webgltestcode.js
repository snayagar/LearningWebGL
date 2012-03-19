var WebGLTestCodePage = function (uiControls, uiStrings) {
	
	/* Globals*/
	var stats, scene, renderer;
	var camera, cameraControl;
	var mesh;
    init();  
	animate();
	function init() {
	
		if( Detector.webgl ){
			renderer = new THREE.WebGLRenderer({
				antialias		: true,	// to get smoother output
				preserveDrawingBuffer	: true	// to allow screenshot
			});
			renderer.setClearColorHex( 0xBBBBBB, 1 );
		// uncomment if webgl is required
		//}else{
		//	Detector.addGetWebGLMessage();
		//	return true;
		}else{
			renderer	= new THREE.CanvasRenderer();
		}
		renderer.setSize( window.innerWidth, window.innerHeight );
		uiControls.container.append(renderer.domElement);

		// add Stats.js - https://github.com/mrdoob/stats.js
		stats = new Stats();
		stats.domElement.style.position	= 'absolute';
		stats.domElement.style.bottom	= '0px';
		uiControls.stats.append( stats.domElement );

		// create a scene
		scene = new THREE.Scene();

		// put a camera in the scene
		camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.set(0, 0, 5);
		scene.add(camera);

		// create a camera contol
		cameraControls	= new THREEx.DragPanControls(camera)

		// transparently support window resize
		THREEx.WindowResize.bind(renderer, camera);
		// allow 'p' to make screenshot
		THREEx.Screenshot.bindKey(renderer);
		// allow 'f' to go fullscreen where this feature is supported
		if( THREEx.FullScreen.available() ){
			THREEx.FullScreen.bindKey();	
			uiControls.inlineDoc.append("- <i>f</i> for fullscreen");				
		}

		// here you add your objects
		// - you will most likely replace this part by your own
		var geometry = new THREE.TorusGeometry( 1, 0.42 );
		var material	= new THREE.MeshNormalMaterial();
		mesh	= new THREE.Mesh( geometry, material );
		scene.add( mesh );
		
		var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('images/profile.jpg')
		});
		img.map.needsUpdate = true; //ADDED

		// plane
		var plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2),img);
		plane.overdraw = true;
		scene.add(plane);
    } 
	

   // animation loop
	function animate() {
		// loop on request animation loop
		// - it has to be at the begining of the function
		// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
		requestAnimationFrame( animate );

		// do the render
		render();

		// update stats
		stats.update();
	}

	// render the scene
	function render() {

		// update camera controls
		cameraControls.update();
		
		mesh.rotation.x += 0.02;
		mesh.rotation.y += 0.0225;
		mesh.rotation.z += 0.0175;

		// actually render the scene
		renderer.render( scene, camera );
	}	
}


