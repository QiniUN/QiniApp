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
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map( document.getElementById('map'), mapOptions);

    var Est30 = new google.maps.Marker({
      position: {lat: 4.635051, lng: -74.080359 },
      map: this.map
    });

    var Est53 = new google.maps.Marker({
      position: {lat: 4.642994, lng: -74.083652 },
      map: this.map
    });

    var EstUriel = new google.maps.Marker({
      position: {lat: 4.638989, lng: -74.088619 },
      map: this.map
    });

    var EstCYT = new google.maps.Marker({
      position: {lat: 4.638433, lng: -74.084727 },
      map: this.map
    });

    var Est26 = new google.maps.Marker({
      position: {lat: 4.632979, lng: -74.083729 },
      map: this.map
    });

    let thisObj = this;

    Est26.addListener( 'click', function(){
      thisObj.navCtrl.push( Estacion, { id : 1 } );
    });

    Est30.addListener( 'click', function(){
      thisObj.navCtrl.push( Estacion, { id : 2 } );
    });

    Est53.addListener( 'click', function(){
      thisObj.navCtrl.push( Estacion, { id : 3 } );
    });

    EstCYT.addListener( 'click', function(){
      thisObj.navCtrl.push( Estacion, { id : 4 } );
    });

    EstUriel.addListener( 'click', function(){
      thisObj.navCtrl.push( Estacion, { id : 5 } );
    });




  }


}
