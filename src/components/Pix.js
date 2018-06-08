import React from 'react'


class Pix extends React.Component {

	render() {

		var pix = ['aqua_ball','asteroids_ship','asteroid1','asteroid2','asteroid3',
		      'atom1a','atom1b','atom2a','atom2b','atom3a','atom3b','atom4a','atom4b',
		      'baddie_cat_1','baddie2','baddie3','ball','ball2','blue_ball','car','car90','brick1','brick2','brick3',
		      'brick4','brick5','bullet','bullet2','bullet3','car1','carrot','centroid','chick','dude','diamond',
		      'eggplant','enemy-bullet','explode','firstaid','fishie',
		      'green_ball','invader','lazer','loop','muzzle-flash','master','melon',
		      'mushroom','mushroom2','onion','orb-red','orb-green','orb-blue','pepper','player2',
		      'purple_ball','red_ball','paddle','paddle1','paddle2','player','powerup_ball',
		      'powerup_lazer','powerup_multiball','powerup_p','powerup_s','powerup_x',
		      'slimeeyes','snowflakes','snowflakes_large','tomato','ufo','wabbit','shadow','ship',
		      'splatter1','splatter2','splatter3','star','star2','turret']

		return(
			<div style={{background: 'white', width: "888px"}} className="horizontal layout wrap">
				{pix.map( pic => 
					<div style={{width:'60px',height:'60px','margin':'17px'}}>
						<img alt={pic} key={pic} src={"../pix/"+pic+".png"} />
					</div>
				)}
			</div>
		)
	}
	
}

export default Pix



