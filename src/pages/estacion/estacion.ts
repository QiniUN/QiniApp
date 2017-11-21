import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-estacion',
  templateUrl: 'estacion.html'
})
export class Estacion {
  esperaActual: number;
  esperaPromedio:number;
  franja: string;
  fila: number;
  ciclas: number;

  count: number;
  queue: number;
  server: number;

  stopwatchStart: number;
  stopwatchEnd: number;
  counting: boolean;

  constructor(public navCtrl: NavController ){
    this.counting = false;
    let d = new Date();
    let hora = d.getHours()
    let minuto = d.getMinutes();
    let franja: string;
    let periodo = "am";


    if( hora > 12 ){
      periodo = "pm";
      hora -= 12;
    }

    if( minuto < 20 ){
      franja = hora+":00 "+periodo+" - "+hora+":19 "+periodo;
    }
    else if( minuto < 40 ){
      franja = hora+":20 "+periodo+" - "+hora+":39"+periodo;
    }
    else if( minuto <= 59 ) {
      franja = hora+":40 "+periodo+" - "+hora+":59"+periodo;
    }

    let data = { esperaActual: 5.0, esperaPromedio: 7.0, fila: 5, ciclas: 10 };
    this.esperaActual = data.esperaActual;
    this.esperaPromedio = data.esperaPromedio;
    this.franja = franja;
    this.fila = data.fila;
    this.ciclas = data.ciclas;
  }

  sendForm( $event ): void {
    alert( this.queue );
    alert( this.server );
    alert( this.count );
  }

  startStopwatch($event): void {
    this.counting = true;
    var d = new Date();
    this.stopwatchStart = d.getTime();
  }

  stopStopwatch( $event ): void {
    this.counting = false;
    var d = new Date();
    this.stopwatchEnd = d.getTime();
    this.count = Math.round( ((this.stopwatchEnd - this.stopwatchStart)/1000)/60 * 100)/100;
  }
}
