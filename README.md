# frontend-nanodegree-arcade-game by Brian Johnson

	A reboot of a classic arcade game called "frogger".  Developed for the Udacity front end web developer course.

## Getting Started
	Load any Web Server on your PC, then clone the repository under the webroot folder (ie. htdocs) to an arcade folder.  Example:

	`git clone https://github.com/bmj76/frontend-nanodegree-arcade-game.git c:\miniweb\htdocs\arcade`

	Simply open http://127.0.0.1:8000/arcade/index.html to start the game.

## GamePlay

### Controls
	Up Arrow - Move Up 1 space
	Down Arrow - Move Down 1 space
	Left Arrow - Move Left 1 space
	Right Arrow - Move Right 1 space
	Reset Game Button - Resets the player's position and the Win/Loss counter

### Movement
	The player should be able to move up, down, left or right freely within the game grid.  If the player tries to move off of the grid, a yellow error message should appear below the game grid.  This should work for any direction.

### Winning
	The player must move to the water at the top of the game grid without getting CHOMP'd by a bug along the way.  Upon reaching the top, a WINNER message should be displayed at the bottom of the page.  The player resets his position after 3 seconds for another try.

### Losing
	Getting Chomp'd by a bug immediately resets the player position back to the start, and increments the Loss counter at the top of the page.  Don't worry even losing is fun.



 
