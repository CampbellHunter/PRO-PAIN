class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        /*
        this.music = this.sound.add('song')
        this.music.setLoop(true)
        this.music.setVolume(.25)
        this.music.play()
        */
        this.physics.world.drawDebug = false
        this.keys = this.input.keyboard.createCursorKeys()
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        document.getElementById('info').innerHTML = 'Use Arrrow Keys to Move | Press "D" for Debug Mode (Toggle)'

        this.numKilled = 0
        this.back = this.add.tileSprite(0, 0, 768, 512, 'back').setOrigin(0, 0)
        this.physics.world.setBounds(0, 175, 458, 242)

        if (game.settings.rank == 0) {
            this.numKills = 10
            this.spawntime = 1000
            this.Xframes = 200
            this.timeSinceHit = 200
        } else if (game.settings.rank == 1) {
            this.numKills = 15
            this.spawntime = 950
            this.Xframes = 200
            this.timeSinceHit = 200
        } else {
            this.numKills = 1000
            this.spawntime = 800
            this.Xframes = 100
            this.timeSinceHit = 100
        }

        this.faded = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000).setOrigin(0, 0)
        this.faded.alpha = 0
        this.done = false

        this.keys = this.input.keyboard.createCursorKeys()
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.hank = new Hank(this, 140, 320, 'hank', 0, 'right')
        this.hank.depth = 4.5
        
        this.baddie1 = new Baddie(this, -1000, 350, 'baddie', 0, this.hank).setScale(.25)
        this.baddie2 = new Baddie(this, -1000, 350, 'baddie', 0, this.hank).setScale(.25)
        this.baddie3 = new Baddie(this, -1000, 350, 'baddie', 0, this.hank).setScale(.25)
        this.baddie4 = new Baddie(this, -1000, 350, 'baddie', 0, this.hank).setScale(.25)
        this.baddie5 = new Baddie(this, -1000, 350, 'baddie', 0, this.hank).setScale(.25)

        this.baddie1.isMoving = true
        this.baddie2.isMoving = true
        this.baddie3.isMoving = true
        this.baddie4.isMoving = true
        this.baddie5.isMoving = true


        this.spawnList = [false, false, false, false, false]

        this.keys = this.input.keyboard.createCursorKeys()

        this.moved = 0
        this.lastspawn = 0
        this.score = 0

        this.moveSpeed = 0.5

        let scoreConfig = {
            fontFamily: 'Stencil',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#ffeedf',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 240
        }
        this.healthLeft = 100
        
        this.health = this.add.text(515, 10, 'HEALTH\: 100', scoreConfig)
        this.scoretext = this.add.text(10, 10, 'SCORE\: 00000', scoreConfig)
    }

    update() {
        if (this.numKilled >= this.numKills && !this.spawnList[0] && !this.spawnList[1] && !this.spawnList[2] && !this.spawnList[3] && !this.spawnList[4] && game.settings.rank != 2) {
            if (this.faded.alpha < 1) {
                this.faded.alpha += 0.0015
            } else {
                //this.music.pause()
                game.settings = {
                    unlock: game.settings.unlock,
                    rank: game.settings.unlock
                }
                this.scene.start("menuScene")
            }
        } else if (this.healthLeft == 0) {
            if (this.faded.alpha < 1) {
                this.faded.alpha += 0.0015
            } else {
                //this.music.pause()
                game.settings = {
                    unlock: game.settings.unlock,
                    rank: game.settings.unlock
                }
                this.scene.start("menuScene")
            }
        } else {
            this.health.text = "HEALTH: " + ("000" + this.healthLeft).slice(-3)
            this.scoretext.text = "SCORE: " + ("00000" + this.score).slice(-5)
            
            /*
            this.physics.add.collider(this.hank, this.baddie1, () => this.hitMe(this.hank, this.baddie1), null, this)
            this.physics.add.collider(this.hank, this.baddie2, () => this.hitMe(this.hank, this.baddie2), null, this)
            this.physics.add.collider(this.hank, this.baddie3, () => this.hitMe(this.hank, this.baddie3), null, this)
            this.physics.add.collider(this.hank, this.baddie4, () => this.hitMe(this.hank, this.baddie4), null, this)
            this.physics.add.collider(this.hank, this.baddie5, () => this.hitMe(this.hank, this.baddie5), null, this)
            */
            if (this.physics.world.overlap(this.hank, this.baddie1)) {
                this.hitMe(this.hank, this.baddie1)
                this.hurtMe(this.hank, this.baddie1, 0)
            } else if (this.physics.world.overlap(this.hank, this.baddie2)) {
                this.hitMe(this.hank, this.baddie2)
                this.hurtMe(this.hank, this.baddie2, 1)
            } else if (this.physics.world.overlap(this.hank, this.baddie3)) {
                this.hitMe(this.hank, this.baddie3)
                this.hurtMe(this.hank, this.baddie3, 2)
            } else if (this.physics.world.overlap(this.hank, this.baddie4)) {
                this.hitMe(this.hank, this.baddie4)
                this.hurtMe(this.hank, this.baddie4, 3)
            } else if (this.physics.world.overlap(this.hank, this.baddie5)) {
                this.hitMe(this.hank, this.baddie5)
                this.hurtMe(this.hank, this.baddie5, 4)
            }

            const { left, right, up, down, space, shift } = this.keys
            this.timeSinceHit += 1
            if (this.timeSinceHit > this.Xframes) {
                console.log("hey")
                this.hankFSM.step()
                this.hank.setTint(0xFFFFFF)
            } else {
                this.hank.x -= 0.25
            }
            this.baddie1.update()
            this.baddie2.update()
            this.baddie3.update()
            this.baddie4.update()
            this.baddie5.update()

            this.moveBaddie(this.hank, this.baddie1, 100)
            this.moveBaddie(this.hank, this.baddie2, 200)
            this.moveBaddie(this.hank, this.baddie3, 300)
            this.moveBaddie(this.hank, this.baddie4, 150)
            this.moveBaddie(this.hank, this.baddie5, 125)
        
            

            if ((this.hank.x >= 398) && this.hank.anims.currentAnim.key == 'hank-run') {
                this.back.tilePositionX += (3)
                this.moved += 3
                
                this.baddie1.x -= 2
                this.baddie2.x -= 2
                this.baddie3.x -= 2
                this.baddie4.x -= 2
                this.baddie5.x -= 2
            }

            if (this.moved - this.lastspawn >= this.spawntime) {
                this.number = Math.floor(Math.random() * 6)
                if (this.number > 4) {
                    this.spawnBaddies()
                    this.spawnBaddies()
                    this.spawnBaddies()
                } else if (this.number > 2) { 
                    this.spawnBaddies()
                    this.spawnBaddies()
                } else {
                    this.spawnBaddies()
                }
                
                //this.spawner = Math.floor(Math.random() * 5)
                //this.baddie = new Baddie(this, 1000, 350, 'baddie', 0, this.hank).setScale(.25)
            }
        }
    }

    moveBaddie(hank, baddie, distance) {
        if (hank.x < baddie.x) {
            if (baddie.flipX == true) {
                baddie.setFlipX(false)
                baddie.x -= (baddie.width/2)
            }
        } else if (hank.x > baddie.x + (baddie.width/2)) {
            if (baddie.flipX == false) {
                baddie.setFlipX(true)
                baddie.x += (baddie.width/2)
            }
        }
        if (baddie.isMoving) {
            if (hank.x + 75 + 2 * (Math.abs(distance - 155)) < baddie.x + 92){
                baddie.x -= this.moveSpeed - (distance / 1200)
            }
            if (hank.x + 75 + 2 * (Math.abs(distance - 155)) > baddie.x + 92){
                baddie.x += this.moveSpeed - (distance / 1200)
            }
            if (hank.y - 75 + Math.abs(distance - 220) > baddie.y) {
                baddie.y += this.moveSpeed - (distance / 800)
            }
            if (hank.y - 75 + Math.abs(distance - 220) < baddie.y) {
                baddie.y -= this.moveSpeed - (distance / 800)
            }
        }
    }

    spawnBaddies() {
        if (!this.spawnList[0] || !this.spawnList[1] || !this.spawnList[2] || !this.spawnList[3] || !this.spawnList[4]){
            let spawning = true
            while (spawning) {
                this.spawner = Math.floor(Math.random() * 5)
                console.log(this.spawner)
                if (!this.spawnList[this.spawner]) {
                    if (this.spawner == 0) {
                        this.baddie1 = new Baddie(this, 1000, 350, 'baddie', 0, this.hank).setScale(0.95)
                        this.baddie1.anims.play({ key: 'baddie-hit', startFrame: 0}, true)
                        this.baddie1.isMoving = true
                        this.baddie1.depth = 5
                        this.spawnList[0] = true
                    } else if (this.spawner == 1) {
                        this.baddie2 = new Baddie(this, 1000, 350, 'baddie', 0, this.hank).setScale(0.95)
                        this.baddie2.anims.play({ key: 'baddie-hit', startFrame: 2}, true)
                        this.baddie2.isMoving = true
                        this.baddie2.depth = 1
                        this.spawnList[1] = true
                    } else if (this.spawner == 2) {
                        this.baddie3 = new Baddie(this, 1000, 350, 'baddie', 0, this.hank).setScale(0.95)
                        this.baddie3.anims.play({ key: 'baddie-hit', startFrame: 5}, true)
                        this.baddie3.isMoving = true
                        this.baddie3.depth = 2
                        this.spawnList[2] = true
                    } else if (this.spawner == 3) {
                        this.baddie4 = new Baddie(this, 1000, 350, 'baddie', 0, this.hank).setScale(0.95)
                        this.baddie4.anims.play({ key: 'baddie-hit', startFrame: 8}, true)
                        this.baddie4.isMoving = true
                        this.baddie4.depth = 3
                        this.spawnList[3] = true
                    } else {
                        this.baddie5 = new Baddie(this, 1000, 350, 'baddie', 0, this.hank).setScale(0.95)
                        this.baddie5.anims.play({ key: 'baddie-hit', startFrame: 11}, true)
                        this.baddie5.isMoving = true
                        this.baddie5.depth = 4
                        this.spawnList[4] = true
                    }
                    console.log(this.spawnList)
                    spawning = false
                    this.lastspawn = this.moved
                }
            }
        }
    }

    hitMe(hank, baddie) {
        let frame = baddie.anims.currentFrame.index
        //console.log(frame)
        //console.log(baddie.anims.currentFrame.index, this.timeSinceHit, this.Xframes)
        if (frame == 23 || frame == 24) {
            if (this.timeSinceHit > this.Xframes) {
                hank.setTint(0xFF0000)
                hank.setVelocityX(0)
                hank.anims.play('hank-idel')
                this.sound.play('punch')
                this.timeSinceHit = 0
                this.healthLeft -= 10
                let menuConfig = {
                    fontFamily: 'Stencil',
                    fontSize: '48px',
                    color: '#C80000',
                    align: 'center',
                    padding: {
                        top: 5,
                        bottom: 5,
                    },
                    fixedWidth: 0
                }
                if (this.healthLeft == 0) {

                    if (this.spawnList[0] == true) {
                        this.baddie1.destroy()
                    }
                    if (this.spawnList[1] == true) {
                        this.baddie2.destroy()
                    }
                    if (this.spawnList[2] == true) {
                        this.baddie3.destroy()
                    }
                    if (this.spawnList[3] == true) {
                        this.baddie4.destroy()
                    }
                    if (this.spawnList[4] == true) {
                        this.baddie5.destroy()
                    }
                    this.sound.play('death')
                    hank.anims.play("hank-idel")
                    this.add.text(game.config.width/2, -20 + game.config.height/2 - borderUISize - borderPadding, 'YOU\'VE BEEN', menuConfig).setOrigin(0.5)
                    menuConfig.fontSize = '72px'
                    this.add.text(game.config.width/2, -10 + game.config.height/2, 'ACCESSORIZED', menuConfig).setOrigin(0.5)
                    this.health.destroy()
                    this.scoretext.destroy()
                }
            }
            //hank.anims.play('hank-idel')
        }
        /*
        if (frame <= 21) {
            baddie.isMoving = true
        } else {
            baddie.isMoving = false
        }
        */
    }

    hurtMe(hank, baddie, key) {
        if (hank.anims.isPlaying && hank.anims.currentAnim.key == 'hank-hit') {
            console.log("Hit!")
            baddie.setTint(0xFF0000)
            if (hank.flipX == false) {
                baddie.x += 5
            } else {
                baddie.x -= 5
            }
            
            if (this.spawnList[key] == true) {
                this.sound.play('yell')
                this.spawnList[key] = false
                this.sound.play('punch')
                baddie.anims.play('baddie-dead')
                baddie.once('animationcomplete', () => {
                    baddie.destroy()
                    this.numKilled++
                    this.score += 100
                    console.log(this.numKilled)
                
                    let menuConfig = {
                        fontFamily: 'Stencil',
                        fontSize: '48px',
                        color: '#ffeedf',
                        align: 'center',
                        padding: {
                            top: 5,
                            bottom: 5,
                        },
                        fixedWidth: 0
                    }
                    console.log(this.spawnList)
                    if (this.numKilled >= this.numKills && !this.spawnList[0] && !this.spawnList[1] && !this.spawnList[2] && !this.spawnList[3] && !this.spawnList[4] && game.settings.rank != 2 && this.done == false) {
                        this.done = true
                        this.add.text(game.config.width/2, -20 + game.config.height/2 - borderUISize - borderPadding, 'YOU\'VE UNLOCKED', menuConfig).setOrigin(0.5)
                        menuConfig.fontSize = '72px'
                        console.log('Rank: ' + game.settings.rank)
                        hank.anims.play("hank-idel")
                        if (game.settings.rank == 0) {
                            if (!this.sound.isPlaying('heat')) {
                                this.sound.play('heat')
                            }
                            this.add.text(game.config.width/2, -10 + game.config.height/2, 'ASSISTANT', menuConfig).setOrigin(0.5)
                            this.add.text(game.config.width/2, 50 + game.config.height/2, 'MANAGER MODE', menuConfig).setOrigin(0.5)
                            this.health.destroy()
                            this.scoretext.destroy()
                            game.settings = {
                                unlock: 1
                            }
                        } else {
                            if (!this.sound.isPlaying('heat') && !this.sound.isPlaying('tell')) {
                                this.sound.play('tell')
                            
                                this.add.text(game.config.width/2, -10 + game.config.height/2, 'MANAGER MODE', menuConfig).setOrigin(0.5)
                                this.health.destroy()
                                this.scoretext.destroy()
                                game.settings = {
                                    unlock: 2
                                }
                            }
                        }
                    }
                })
            }
        }
    }
}