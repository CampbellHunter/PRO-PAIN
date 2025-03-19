class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    update() {
        game.settings = {
            rank: 0,
            unlock: 0
        }
        this.scene.start('menuScene')    
    }
}