import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Qini } from './app.component';
import { HomePage } from '../pages/home/home';
import { Estacion } from '../pages/estacion/estacion';

@NgModule({
  declarations: [
    Qini,
    HomePage,
    Estacion
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Qini)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Qini,
    HomePage,
    Estacion
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
