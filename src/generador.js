import Bola from "./Bola.js";
export default class Generador{
    
    constructor(scene, bolasArray, y){
        this.scene = scene;
        this.y = y;
        this.bolasArray = bolasArray;
        this.bolasTotales = bolasArray.lenght -1;
        this.bolasGenerables = this.bolasTotales- 1;
    }

    generaBola()
    {
        let tag = Phaser.math.Between(this.bolasGenerables, this.bolasTotales)
        return new Bola(this.scene, 500, this.y, tag);
    }

    drop(bolaGrupo)
    {
        bolaGrupo.add(this.bolaActual);
    }

    addBolaGenerable(){
        this.bolasGenerables--;
    }
}