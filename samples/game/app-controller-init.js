// Bind context
			_.bindAll( this, "animate", "render", "update" );
			
			// Initialize camera
			this.camera = new THREE.Camera( 45, window.innerWidth / window.innerHeight, -2000, 10000 );
			this.camera.projectionMatrix = THREE.Matrix4.makeOrtho( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -2000, 10000 );
			this.camera.position.y = 70.711;
			this.camera.position.x = 100;
			this.camera.position.z = 100;
			
			// Create scene
			this.scene = new THREE.Scene();
			
			// Create projector
			this.projector = new THREE.Projector();
			
			// Create renderer
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setSize( window.innerWidth, window.innerHeight );
			
			// Load scene
			appView = new Game.Views.App({ el: renderer.domElement });
			
			document.body.appendChild(renderer.domElement);