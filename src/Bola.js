export default class Bola extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, tag) {
        super(scene, x, y, scene.BolasArray[tag]);
        this.tag = tag;
        //this.score = score;
        this.scene.add.existing(this);
        
        this.scene.physics.add.existing(this);
        this.body.setCircle(this.width/2);
        console.log(this.body.mass);
        this.body.setMass(1 - tag/15 );
        this.body.setBounce(0.3, 0.5);
        
    }

    updateX(x)
    {
        if (x < (100 + this.width/2) && x > (50 - this.width/2)) 
        {
            this.x = x;
        }
    }

    checkCollision(collisioned)
    {
        if(collisioned.tag == this.tag)
        {
            let newX = (collisioned.x + this.x)/2; 
            let newY = (collisioned.y + this.y)/2;
           // this.scene.fuseBolas(this, collisioned, newX, newY, tag);
        }
    }

    //para q los tweens no se vuelvan lokisimos con las colisiones
    moveleft()
    {
      this.body.setVelocityX(-7);
    }
  
    moveright()
    {
      this.body.setVelocityX(7);
    }
    pushdown()
    {
        this.body.setVelocityY(this.body.velocity.y +1);
    }

    stop()
    {
        this.body.setVelocityX(0);
    }
}