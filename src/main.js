// PRO-PAIN!
// Name: Campbell Hunter 
// Date: 3/18/25
/*
 This game includes an animated opening screen, with a credits and level select menu (which unlokcs as you play).
 Each level increases the difficulty of the game by both increasing the spawn rate and, for the first two, increasing
 the amount of kills needed to proceed. Finally, the last level is effectivly an endless mode, which only ends when
 the player dies.
 P.S. - Sorry about the lack of a gthub history, my original github save seems to have corrupted and is no longer usable,
 so I had to copy my code over into a fresh Git project. Thanks!
*/
//Citations: Using frameworks provided for previous assignments, and some inspiration and guidance from https://docs.phaser.io/phaser/concepts/
'use strict'

let config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL,
    width: 768,
    height: 512,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
          debug: true
      }
  },
  scene: [ Load, Menu, Select, Play, Credits]
  }

let game = new Phaser.Game(config)
let keyCREDITS, keyRESET, keyMENU
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3