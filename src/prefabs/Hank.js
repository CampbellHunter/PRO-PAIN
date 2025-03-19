class Hank extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width * 0.25, this.height * 0.25)
        this.body.setOffset(100, 100)
        this.body.setCollideWorldBounds(true)

        this.direction = direction
        this.hankVelocity = 500

        scene.hankFSM = new StateMachine('idle', {
            idle: new IdleState(),
            running: new RunState(),
            hiting: new HitState(),
            throwing: new ThrowState(),
        }, [scene, this])
    }
}

class IdleState extends State {
    
    enter(scene, hank) {
        hank.setVelocity(0)
        hank.anims.play('hank-idel')
    }

    execute(scene, hank) {
        const { left, right, up, down, space, shift } = scene.keys

        if(left.isDown || right.isDown || up.isDown || down.isDown ) {
            this.stateMachine.transition('running')
            return
        }

        if(space.isDown) {
            this.stateMachine.transition('hiting')
            return
        }
    }
    
}

class RunState extends State {

    execute(scene, hank) {
        const { left, right, up, down, space, shift } = scene.keys
        
        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle')
            return
        } else if(space.isDown) {
            this.stateMachine.transition('hiting')
            return
        }

        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(up.isDown) {
            moveDirection.y = -1
            hank.direction = 'up'
        } else if(down.isDown) {
            moveDirection.y = 1
            hank.direction = 'down'
        }
        if(left.isDown) {
            moveDirection.x = -1
            hank.direction = 'left'
            if (hank.flipX == false) {
                hank.setFlipX(true)
                hank.x -= hank.width/2
            }
        } else if(right.isDown) {
            moveDirection.x = 1
            hank.direction = 'right'
            if (hank.flipX == true) {
                hank.setFlipX(false)
                hank.x += hank.width/2
            }
        }
        
        moveDirection.normalize()
        hank.setVelocity(hank.hankVelocity * moveDirection.x, hank.hankVelocity * moveDirection.y)
        hank.anims.play('hank-run', true)
    }
    
}

class HitState extends State {
    enter(scene, hank) {
        hank.x -= 5
        hank.setVelocity(0)
        hank.anims.play(`hank-hit`)
        hank.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}

class ThrowState extends State {
    enter(scene, hank) {
        this.stateMachine.transition('idel')
    }
}