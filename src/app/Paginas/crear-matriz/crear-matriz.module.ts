import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearMatrizPageRoutingModule } from './crear-matriz-routing.module';

import { CrearMatrizPage } from './crear-matriz.page';

// Bluetooth
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearMatrizPageRoutingModule
  ],
  declarations: [CrearMatrizPage],
  providers: [
    BluetoothSerial
  ]
})
export class CrearMatrizPageModule {}
