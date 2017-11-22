import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

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

  countQueue: number;
  countServer: number;
  queue: number;
  server: number;

  stopwatchStart: number;
  stopwatchEnd: number;
  counting1: boolean;
  counting2: boolean;
  counting3: boolean;

  constructor(public navCtrl: NavController, private http: Http ){
    this.getData();
  }

  getData(): void{
    this.counting1 = false;
    this.counting2 = true;
    this.counting3 = true;
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
      franja = hora+":20 "+periodo+" - "+hora+":39 "+periodo;
    }
    else if( minuto <= 59 ) {
      franja = hora+":40 "+periodo+" - "+hora+":59 "+periodo;
    }

    franja = "7:00 am - 7:19 am";

    let body = "/1/"+franja+"";
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.get( 'http://localhost:3000/station/getStation'+body, { headers: headers } )
    .map( res => res.json() )
    .subscribe(
      (data) => {
       if( data.esperaActual == null ) this.esperaActual = data.esperaActual;
       else this.esperaActual = Math.round( data.esperaActual * 10)/10;
       this.esperaPromedio = data.esperaPromedio;
       this.franja = franja;
       if( data.fila == null ) this.fila = data.fila;
       else this.fila = Math.round( data.fila * 10)/10 ;
       this.ciclas = data.ciclas;
     },
      error => {
       console.log(error);
      }
    );
  }

  sendForm( $event ): void {

    let body = { id: 1, tiempoCola: this.countQueue + 16.2, tiempoServicio: this.countServer+3, fila: this.queue, servidores: this.server, franja: this.franja };

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post( 'http://localhost:3000/station/postStation', JSON.stringify(body), { headers: headers } )
    .map( res => res.json() )
    .subscribe(
      (data) => {
       if(data.guardar) this.getData;
     },
      error => {
       console.log(error);
      }
    );
  }

  startStopwatchQueue($event): void {
    this.counting1 = true;
    this.counting2 = false;
    var d = new Date();
    this.stopwatchStart = d.getTime();
  }

  stopStopwatchQueue( $event ): void {
    this.counting2 = true;
    this.counting3 = false;
    var d = new Date();
    this.stopwatchEnd = d.getTime();
    this.countQueue = Math.round( ((this.stopwatchEnd - this.stopwatchStart)/1000)/60 * 100)/100;
    this.startStopwatchServer();
  }

  startStopwatchServer(): void {
    var d = new Date();
    this.stopwatchStart = d.getTime();
  }

  stopStopwatchServer( $event ): void {
    this.counting3 = true;
    var d = new Date();
    this.stopwatchEnd = d.getTime();
    this.countServer = Math.round( ((this.stopwatchEnd - this.stopwatchStart)/1000)/60 * 100)/100;
  }
}
