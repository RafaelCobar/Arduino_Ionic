import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from "@ionic/angular";
import { BluetoothService } from '../Servicio/bluetooth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public dispositivos:any[] = [];
  public conectado: boolean = false;

  // Constructor
  constructor(private router: Router, private bluetoothService : BluetoothService, private alertController: AlertController, private bluetoothSerial: BluetoothSerial){
  }
  
  ngOnInit() {
    this.conectado = false;
  }

  // Verificar si el bluetooth esta activado
  activarBluetooth(){
    this.bluetoothSerial.isEnabled().then(
      response => {
        this.listaDispositivo();
      }, error => {
        this.mensajeAlerta("Bluetooth apagado");
      }
    );
  }

  // Obtenemos la lista de dispositivos
  listaDispositivo(){
    this.bluetoothSerial.list().then( 
      response => {
        this.conectado = true;
        this.dispositivos = response; // trae name, address, id, class
      }, error => {
        this.mensajeAlerta("No existen dispositivos");
      }
    );
  }

  // Conectamos al dispositivo
  conectar(address){
    this.bluetoothSerial.connect(address).subscribe(
      success => {
        this.dispositivos = [];
        this.mensajeAlerta("Dispositivo Conectado");
        this.dispositivoConectado();
        this.conectado = false;
      }, error => {
        console.error('Error');
      }
    );

    this.bluetoothService.sendBluetoothSerial(this.bluetoothSerial);
    this.router.navigate(['/login']); // TODO habilitar
  }


  // Dispositivo conectado
  dispositivoConectado(){
    this.bluetoothSerial.subscribe('/n').subscribe(
      success => {
        console.log("DISPOSITIVO CONECTADO = " +success);
      }
    )
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
