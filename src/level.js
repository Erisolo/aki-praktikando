import ContainerWall from './ContainerWall.js';
import Bola from "./Bola.js";
import Player from './player.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    this.add.image(0, 0, 'fondo').setScale(0.25, 0.2).setOrigin(0,0);
    this.BolasArray = ['bola1', 'bola2', 'bola3', 'bola4', 'bola5', 'bola6']

   
    this.player = new Bola(this, 400, 300, 0).setScale(0.5);
    this.Bolas = this.add.group();
    this.Bolas.add(this.player);

    this.Bolas.add(new Bola(this, 550, 100, 1));
    this.Bolas.add(new Bola(this, 450, 50, 2));
    this.Bolas.add(new Bola(this, 500, 50, 3));
    this.Bolas.add(new Bola(this, 530, 90, 4));
    this.Bolas.add(new Bola(this, 530, 90, 5));
    
    this.Floor = new ContainerWall(this, this.Bolas, 515, 465, 400, 50).setVisible(false);
    this.ContainerWallLeft = new ContainerWall(this, this.Bolas, 302, 260, 70, 500).setVisible(false);
    this.ContainerWallRight = new ContainerWall(this, this.Bolas, 735, 260, 70, 500).setVisible(false);

    this.creceBola(this.player);
    this.physics.add.collider(this.Bolas, this.Bolas);

    //los colliders de circulos funciona fatal en phaser (segun he visto) y esto lo arregla (mas o menos)
    this.physics.add.overlap(this.ContainerWallLeft, this.Bolas, function (ob1, ob2) { ob2.moveright()});
    this.physics.add.overlap(this.ContainerWallRight, this.Bolas, function (ob1, ob2) { ob2.moveleft()});

    
  }

  creceBola(bola) {
    this.tween = this.tweens.add({
      targets: bola,
      scale: 1,
      yoyo: false,
      duration: 700,
      repeat: 2,
      //al ser una interpolación, se la sudan los colliders. por ello, esto es un arreglo chapucero para que no se salgan las bolas
      onUpdate: function () {
        if (() => this.physics.collide(bola, () => this.ContainerWallLeft)) {
          bola.moveleft();
        }
        else if (() => this.physics.collide(bola, () => this.ContainerWallRight)) {
          bola.moveright();
        }
        if (() => this.physics.collide(bola, () => this.Floor))
        {
          bola.pushdown();
          console.log("jiji");
        }
      },
    })
  }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      }
  }
}