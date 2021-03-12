import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
import { BluetoothService } from 'src/app/Servicio/bluetooth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Constructor
  constructor(
    private router: Router,
    private bluetoothService: BluetoothService,private alertController: AlertController,
    private bluetoothSerial: BluetoothSerial
  ) {}

  ngOnInit() {
    this.bluetoothService.$getbluetoothSerial
      .subscribe((b) => {
        this.bluetoothSerial = b;
      })
      .unsubscribe();
    
    this.verificarLectura();
  }
  
  // Que cada 1/2 segundo verifique si no le han enviado información
  verificarLectura(){
    setInterval(() => {
        this.leerInfoBluetooth();
    }, 200);
  }

  leerInfoBluetooth(){
    this.bluetoothSerial.available()
    .then((number: any) => {
        this.bluetoothSerial.read()
        .then((data: any) => {
          if (data[0] == "1") {       
            this.mensajeAlerta('Usuario Ingresado Correctamente');     
            this.bluetoothSerial.clear();
            this.bluetoothService.sendBluetoothSerial(this.bluetoothSerial);
            this.router.navigate(['/crear-matriz']);
          }
        });
    });
  }

  async mensajeAlerta(mensaje: string){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons : [
        {
          text: 'ok',
        }
      ]
    });
    alert.present();
  }


}
