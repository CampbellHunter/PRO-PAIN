class Baddie extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, hank) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setSize(this.width * .45, this.height * .25)
        this.body.setOffset(100, 100)
        
        this.moveSpeed = 1
    }

    update() {
        if (this.x <= -900) {
            this.destroy()
        }
        if(this.x <= 0 - this.width) {
            this.x = 1000
        }
    }
}