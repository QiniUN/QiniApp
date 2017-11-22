import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Estacion } from '../estacion/estacion';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  center_position: any;

  constructor(public navCtrl: NavController) {
  }

  seleccionarEstacion ( $event ) : void {
    this.navCtrl.push( Estacion );
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let latLng = new google.maps.LatLng(4.636695, -74.083440);

    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map( document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
      position: {lat: 4.635051, lng: -74.080359 },
      map: this.map
    });

    console.log(this.map);
  }


}
