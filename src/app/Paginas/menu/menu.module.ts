import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';

// Bluetooth
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage],
  providers: [
    BluetoothSerial
  ]
})
export class MenuPageModule {}
