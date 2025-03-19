class Select extends Phaser.Scene {
    constructor() {
        super("selectScene")
    }

    create() {
        //this.add.rectangle(0, 0, game.config.width, game.config.height, 0xA0B0D7).setOrigin(0, 0)
        let menuConfig = {
            fontFamily: 'Stencil',
            fontSize: '64px',
            color: '#ffeedf',
            align: 'center',
            padding: {
                 top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.backer = this.add.sprite(0, 0, 'backer').setOrigin(0)
        this.backer.anims.play('scroll')
        this.faded = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000).setOrigin(0, 0)
        this.faded.alpha = 0.5
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'SELECT RANK', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '32px'
        this.add.text(game.config.width/2, 10 + game.config.height/2, 'Press "Q" for EMPLOYEE MODE', menuConfig).setOrigin(0.5)
        if (game.settings.unlock < 1) {
            menuConfig.color = '#986f67'
        }
        this.add.text(game.config.width/2, 15 + game.config.height/2 + borderUISize + borderPadding, 'Press "W" for ASSISTANT MANAGER MODE', menuConfig).setOrigin(0.5)
        if (game.settings.unlock < 2) {
            menuConfig.color = '#986f67'
        }
        this.add.text(game.config.width/2, 60 + game.config.height/2 + borderUISize + borderPadding, 'Press "E" for MANAGER MODE', menuConfig).setOrigin(0.5)

        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            game.settings = {
                rank: 0,
                unlock: game.settings.unlock
            }
            this.scene.start('menuScene')    
        } else if (Phaser.Input.Keyboard.JustDown(keyCREDITS) && game.settings.unlock >= 1) {
            game.settings = {
                rank: 1,
                unlock: game.settings.unlock
            }
            this.scene.start('menuScene')    
        } else if (Phaser.Input.Keyboard.JustDown(keyMENU) && game.settings.unlock == 2) {
            game.settings = {
                rank: 2,
                unlock: game.settings.unlock
            }
            this.scene.start('menuScene')    
        }
    }
}