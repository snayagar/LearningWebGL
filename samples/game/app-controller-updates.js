/*
			function animate
			Game loop - requests each new frame
		*/
		animate: function() {
			requestAnimationFrame( this.animate );
			
			this.render();
		},
		
		
		/*
			function update
			Handles game state updates
		*/
		update: function() {
			appView.update();
		},
		
		
		/*
			function render
			Keeps updates at around 50 per second while trying to render the scene as fast as possible
		*/
		render: function() {
				loops = 0;
				
				// Attempt to update as many times as possible to get to our nextGameTick 'timeslot'
				// However, we only can update up to 10 times per frame
				while ( (new Date).getTime() > nextGameTick && loops < MAX_FRAME_SKIP ) {
					this.update();
					nextGameTick += SKIP_TICKS;
					loops++;
				}
				
				// Render our scene
				renderer.render( this.scene, this.camera );
		}