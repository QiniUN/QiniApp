import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Estacion } from '../estacion/estacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  seleccionarEstacion ( $event ) : void {
    this.navCtrl.push( Estacion );
  }



}
