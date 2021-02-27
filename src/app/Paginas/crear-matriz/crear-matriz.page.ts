import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
import { BluetoothService } from 'src/app/Servicio/bluetooth.service';

@Component({
  selector: 'app-crear-matriz',
  templateUrl: './crear-matriz.page.html',
  styleUrls: ['./crear-matriz.page.scss'],
})
export class CrearMatrizPage implements OnInit {

  // Constructor
  constructor(private router: Router, private bluetoothService : BluetoothService, private alertController: AlertController, private bluetoothSerial: BluetoothSerial){
  }


  ngOnInit() {
    this.bluetoothService.$getbluetoothSerial.subscribe(b => {
      this.bluetoothSerial = b;
    }).unsubscribe();
  }

  
  // Enviar informacion
  enviarInformacion(info: string){
    this.bluetoothSerial.write(info).then(
      response => {
        console.log('ok');
      }, error => {
        console.error('Hubo un problema');
      }
    )
  }

  desconectar(){
    this.bluetoothSerial.disconnect();
    this.mensajeAlerta("Dispositivo Desconectado");
    this.router.navigate(['/home']);
  }

  async mensajeAlerta(mensaje: string){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons : [
        {
          text: 'okay'
        }
      ]
    });
    alert.present();
  }


}
