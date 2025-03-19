class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    
    preload() {
        this.load.path = './assets/'
        this.load.image('back', 'back.png')
        this.load.image('pain', 'pain.png')
        //this.load.image('hank', 'hank.png')
        this.load.audio('song', 'Tell-U-Hwatt.mp3')
        this.load.audio('tell', 'tell.mp3')
        this.load.audio('death', 'death.mp3')
        this.load.audio('punch', 'punch.mp3')
        this.load.audio('splode', 'splode.mp3')
        this.load.audio('yell', 'yell.mp3')
        this.load.audio('heat', 'heat.mp3')

        this.load.spritesheet('hank', 'hank.png', {
            frameWidth: 256,
            frameHeight: 320
        })

        this.load.spritesheet('baddie', 'baddie.png', {
            frameWidth: 256,
            frameHeight: 320
        })

        this.load.spritesheet('backer', 'backer.png', {
            frameWidth: 768,
            frameHeight: 512
        })
    }

    create() {
        if (!this.sound.isPlaying('song')) {
            this.music = this.sound.add('song')
            this.music.setLoop(true)
            this.music.setVolume(.2)
            this.music.play()
        } else {
            this.music.setVolume(.2)
        }
        //console.log("Rank: " + game.settings.rank)
        //console.log("Unlock: " + game.settings.unlock)

        if (!this.anims.exists('baddie-hit')) {
            this.anims.create({
                key: 'baddie-hit',
                frameRate: 8,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('baddie', {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 8, 8, 9, 10, 10, 11, 8]
                }),
            })

            this.anims.create({
                key: 'baddie-dead',
                frameRate: 8,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('baddie', {
                    frames: [9, 9, 9]
                }),
            })

            this.anims.create({
                key: 'hank-idel',
                frameRate: 8,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('hank', {
                    frames: [8]
                }),
            })

            this.anims.create({
                key: 'hank-run',
                frameRate: 8,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('hank', { start: 0, end: 7 }),
            })

            this.anims.create({
                key: 'hank-hit',
                frameRate: 8,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('hank', {
                    frames: [8, 9, 10, 10, 11, 8]
                }),
            })
            
            this.anims.create({
                key: 'scroll',
                frameRate: 4.5,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('backer', { start: 0, end: 4 })
            })
        }

        let menuConfig = {
            fontFamily: 'Stencil',
            fontSize: '72px',
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
        this.pain = this.add.image(0, 0, 'pain').setOrigin(0)

        //this.add.text(game.config.width/2, 15 + game.config.height/2 - borderUISize - borderPadding, 'PRO-PAIN!', menuConfig).setOrigin(0.5)
        menuConfig.color = '#ffeedf'
        menuConfig.fontSize = '27px'
        this.add.text(game.config.width/2, 95 + game.config.height/2, 'Press "ENTER" to start', menuConfig).setOrigin(0.5)
        //menuConfig.backgroundColor = '#A0B0D7'
        menuConfig.fontSize = '24px'
        //menuConfig.color = '#D9DFEE'
        this.add.text(game.config.width/2, 80 + game.config.height/2 + borderUISize + borderPadding, 'Press "SPACEBAR" for mode select', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '20px'
        this.add.text(game.config.width/2, 110 + game.config.height/2 + borderUISize + borderPadding, 'Press "SHIFT" for credits', menuConfig).setOrigin(0.5)

        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE) 
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT) 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            game.settings = {
                rank: game.settings.rank,
                unlock: game.settings.unlock
            }
            this.music.setVolume(.30)
            this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            game.settings = {
                unlock: game.settings.unlock
            }
            this.scene.start('selectScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {
            game.settings = {
                rank: game.settings.rank,
                unlock: game.settings.unlock
            }
            this.scene.start('creditsScene')    
        }
    }
}