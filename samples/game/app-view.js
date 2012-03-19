Game.Views.App = Backbone.View.extend({
	
	events: {
		"click": "clickWorld"
	},
	
	
	/*
		function initialize
	*/
	initialize: function() {
		
		_.bindAll( this, "update" );
		
		this.initLand();
		
		this.characterView = new Game.Views.Character();
	},
	
	
	/*
		function update
	*/
	update: function() {
		this.characterView.update();
	},
	
	
	/*
		function renderLand
		Renders the landscape of the world and attaches to scene
	*/
	initLand: function() {
		var
			grass,
			plane,
			uvs, i, j,
			mesh;
		
		// Load texture
		grass  = THREE.ImageUtils.loadTexture( "textures/grass.gif" );
		grass.wrapT = grass.wrapS = THREE.RepeatWrapping;

		// Create plane
		plane = new THREE.Plane(8, 8, 8, 8);
		plane.doubleSided = true;
		
		// Create plane texture mapping
		for ( i = 0; i < plane.faceVertexUvs[ 0 ].length; i ++ ) {

			uvs = plane.faceVertexUvs[ 0 ][ i ];

			for ( j = 0; j < uvs.length; j ++ ) {

				uvs[ j ].u *= 8;
				uvs[ j ].v *= 8;

			}
		}
		
		// Create mesh for plane
		mesh = new THREE.Mesh( plane, new THREE.MeshBasicMaterial( { map: grass, wireframe: false} ));
		mesh.rotation.x = -90 * Math.PI / 180;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = 100;
		
		// Add object to scene
		Game.Controllers.App.scene.addObject( mesh );
	},
	
	
	/*
		function clickWorld
		Handles clicks for the entire world, since we don't really have sub-elements of the canvas
	*/
	clickWorld: function(e) {
		
		// Move character
		this.characterView.moveCharacter(e);
	}
	
});