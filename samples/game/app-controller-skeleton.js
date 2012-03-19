Game.Controllers.App = (function() {
	
	var
		renderer,
		appView,
		
		// Game loop
		loops = 0,
		nextGameTick = (new Date).getTime(),
	
		// Constants
		FPS = 60,
		MAX_FRAME_SKIP = 10,
		SKIP_TICKS = 1000 / FPS;
	
	return {
		
		// App variables
		camera: null,
		scene: null,
		projector: null,
		
		/*
			Initialize scene
		*/
		initialize: function() {
		
		},
		
		
		/*
			function animate
			Game loop - requests each new frame
		*/
		animate: function() {

		},
		
		
		/*
			function update
			Handles game state updates
		*/
		update: function() {

		},
		
		
		/*
			function render
		*/
		render: function() {

		}
		
	};
})();