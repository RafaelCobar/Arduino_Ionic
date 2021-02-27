import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  // Atributos
  private bluetooh = new BluetoothSerial();
  private bluetoothSerial = new BehaviorSubject<BluetoothSerial>(this.bluetooh);
  $getbluetoothSerial = this.bluetoothSerial.asObservable();

  constructor() { }

  public sendBluetoothSerial(b : BluetoothSerial){
    this.bluetoothSerial.next(b);
  }


}
