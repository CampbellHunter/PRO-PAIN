class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000).setOrigin(0, 0)
        let menuConfig = {
            fontFamily: 'Stencil',
            fontSize: '32px',
            color: '#ffeedf',
            align: 'center',
            padding: {
                 top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Game, Art, and Music by Campbell Hunter', menuConfig).setOrigin(0.5)

        this.add.text(game.config.width/2, game.config.height/2, 'Inspiration and Sound by King of the Hill', menuConfig).setOrigin(0.5)
        
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Explosion Graphics by PopCap Games', menuConfig).setOrigin(0.5)
        
        this.add.text(game.config.width/2, game.config.height/2 + 2 * (borderUISize + borderPadding), 'Press "SPACEBAR" for main menu', menuConfig).setOrigin(0.5)


        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE) 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            this.scene.start('menuScene')    
        }
    }
}