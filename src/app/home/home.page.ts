import { Component } from '@angular/core';
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  
  //Atributos
  public bluetoothSerial: BluetoothSerial;
  public alertController: AlertController;
  public dispositivos:any[] = [];
  private conectado:boolean = false;


  // Constructor
  constructor(bluetoothSerial: BluetoothSerial, alertController: AlertController) {
    this.bluetoothSerial = bluetoothSerial;
    this.alertController = alertController;
    this.conectado = false;
  }

  // Verificar si el bluetooth esta activado
  activarBluetooth(){
    // me retorna un true o un false si estan encendido o apagado
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
        this.dispositivos = response; // trae name, address, id, class
      }, error => {
        this.mensajeAlerta("No existen dispositivos");
      }
    );
  }

  // Conectamos al dispositivo
  conectar(address){
    this.conectado = true;
    this.bluetoothSerial.connect(address).subscribe(
      success => {
        this.dispositivos = [];
        this.dispositivoConectado();
        this.mensajeAlerta("Dispositivo Conectado");
      }, error => {
        console.error('Eror');
      }
    )
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
    this.conectado = false;
    this.mensajeAlerta("Dispositivo Desconectado")
  }

  // Dispositivo conectado
  dispositivoConectado(){
    this.bluetoothSerial.subscribe('/n').subscribe(
      success => {
        console.log("DISPOSITIVO CONECTADO = " +success);
      }
    )
  }

  // Muestra un mensaje de alerta
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

  cambiarEstado(){
    if(this.conectado){
      this.conectado = false;
    } else {
      this.conectado = true;
    }
  }

  



}
