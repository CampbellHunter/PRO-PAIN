// Name: Campbell Hunter 
// Date: 3/7/25

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