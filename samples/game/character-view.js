Game.Views.Character = Backbone.View.extend({

	// View variables
	startVector: new THREE.Vector3(),
	endVector: new THREE.Vector3(),
	dirVector: new THREE.Vector3(),
	goalVector: new THREE.Vector3(),
	isWalking: false,
	SPEED: 10,
	IMAGE_OFFSET: .04167,
	
	
	/*
		Initialize the character
	*/
	initialize: function() {
		
		_.bindAll( this, "moveCharacter", "update" );
		
		this.initCharacter();
	},
	
	
	/*
		Update character
	*/
	update: function() {
		var 
			dir,
			camera = Game.Controllers.App.camera;
		
		if ( this.isWalking ) {
			dir = new THREE.Vector3();
			dir.sub( this.goalVector, this.sprite.position);
			
			if (Math.abs( dir.x ) < 1 && Math.abs( dir.z ) < 1) {
				this.isWalking = false;
			}
			
			dir.normalize();
			
			// Position movement
			this.sprite.position.x += this.SPEED * dir.x;
			this.sprite.position.z += this.SPEED * dir.z;
			
			// Texture animation
			this.sprite.uvOffset.x += this.IMAGE_OFFSET;
			if (this.sprite.uvOffset.x > 1.0) {
				this.sprite.uvOffset.x = 0.0;
			}
			
			// Change camera position to match character
			camera.position.x += this.SPEED * dir.x;
			camera.position.z += this.SPEED * dir.z;
			camera.target.position.x += this.SPEED * dir.x;
			camera.target.position.z += this.SPEED * dir.z;
		}
	},
	
	
	/*
		Create character sprite, collision detection, and add to scene
	*/
	initCharacter: function() {
		var 
			texture;

		// Load sprite map
		texture = THREE.ImageUtils.loadTexture( "assets/ball_sprite_red_upper_right.png" );
	
		// Create sprite
		this.sprite = new THREE.Sprite( { map: texture, useScreenCoordinates: false, affectedByDistance: true} );
		
		// Set scale to 1/24 of image (200px)
		this.sprite.scale.y = .041667 / client.innerHeight;
		this.sprite.scale.x = -0.041167 / client.innerHeight;

		// Set offset to first sprite of 24 images
		this.sprite.uvOffset.x = .95834;
		this.sprite.uvScale.x = 0.041167;
		
		// Add collision detection
		this.sprite.boundingMesh = new THREE.Mesh( new THREE.Cube(60, 60, 60, 1, 1, 1) );
		THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB(this.sprite.boundingMesh) );

		// Center sprite at 0, 0, 0 of world
		this.setPosition(0, 40, 0);
		
		
		Game.Controllers.App.scene.addObject( this.sprite );
		Game.Controllers.App.scene.addObject( this.sprite.boundingMesh );
	},
	
	
	/*
		function setPosition
		utility function to set position of both boundingMesh and sprite at the same time
	*/
	setPosition: function(x, y, z) {
		this.sprite.position.set(x, y, z);
		this.sprite.boundingMesh.position.set(x, y, z);
	},
	
	
	/*
		function moveCharacter
		translates x, y coordinates to world space and updates character
	*/
	moveCharacter: function(e) {
		var
			camera = Game.Controllers.App.camera,
			projector = Game.Controllers.App.projector,
			x, 
			y,
			t;
		
		// Convert screen coordinates to NDC coordinates -1.0 to 1.0
		x = ( e.clientX / window.innerWidth ) * 2 - 1;
		y = - ( e.clientY / window.innerHeight ) * 2 + 1;
		
		// Obtain one vector at click position for each side of the cube mapping
		this.startVector.set( x, y, -1.0 );
		this.endVector.set( x, y, 1.0 );
		console.log("x :" + x + ", y: " + y);
		// Convert coordinates back to world coordinates
		this.startVector = projector.unprojectVector( this.startVector, camera );
		this.endVector = projector.unprojectVector( this.endVector, camera );
	
		// Get direction from startVector to endVector
		this.dirVector.sub( this.endVector, this.startVector );
		this.dirVector.normalize();
	
		// Find intersection where y = 0
		t = this.startVector.y / - ( this.dirVector.y );

		// Start walking
		this.goalVector.set( this.startVector.x + t * this.dirVector.x,
			this.startVector.y + t * this.dirVector.y,
			this.startVector.z + t * this.dirVector.z );
			
		this.isWalking = true;	
	}
	
});