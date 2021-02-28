import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
import { BluetoothService } from 'src/app/Servicio/bluetooth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  tiempo : BehaviorSubject<string> = new BehaviorSubject('00:00');
  minutos : number = 0;
  segundos : number = 0;


  // Constructor
  constructor(
    private router: Router,
    private bluetoothService: BluetoothService,
    private alertController: AlertController,
    private bluetoothSerial: BluetoothSerial
  ) {}

  ngOnInit() {
    this.empezarTime();
    
    this.verificarLectura();
    
    this.bluetoothService.$getbluetoothSerial
      .subscribe((b) => {
        this.bluetoothSerial = b;
      })
      .unsubscribe();
    
  }


  // Enviar informacion , Nunca enviar una A, T  o números, si no se arruina la cinta y el reloj
  enviarInformacion(caracter: string) {    
    this.bluetoothSerial.write(caracter).then(
      (response) => {
        console.log('ok');
      },
      (error) => {
        console.error('Hubo un problema');
      }
    );
  }

  // Que cada 1/2 segundo verifique si no le han enviado información
  verificarLectura(){
    setInterval(() => {
        this.leerInfoBluetooth();
    }, 500);
  }

  //recibir información
  leerInfoBluetooth(){
    this.bluetoothSerial.available()
    .then((number: any) => {
        this.bluetoothSerial.read()
        .then((data: any) => {
          // Data es un arreglo A qui es donde severifica lo que envia proteus
        });
    });
  }

  // Lo que ya tiene este metodo no se debe borrar, se deben de reiniciar los valores por defecto del paso diseño matriz,
  emergencia(){
 
    this.bluetoothSerial.clear();
    this.bluetoothService.sendBluetoothSerial(this.bluetoothSerial);
    this.router.navigate(['/crear-matriz']);
  }

  // Lo que ya tiene este metodo no se debe borrar, se deben de reiniciar los valores por defecto del paso diseño matriz,
  aceptar() {
     
    this.bluetoothSerial.clear();
    this.bluetoothService.sendBluetoothSerial(this.bluetoothSerial);
    this.router.navigate(['/crear-matriz']);
  }


  desconectar() {
    this.bluetoothSerial.disconnect();
    this.mensajeAlerta('Dispositivo Desconectado');
    this.router.navigate(['/home']);
  }

  async mensajeAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: [
        {
          text: 'ok',
        },
      ],
    });
    alert.present();
  }


  // Métodos para el timer

  empezarTime(){
    setInterval(() => {
        this.actualizarTiempo();
    }, 1000);
  }

  actualizarTiempo(){
    let m : any = this.minutos;
    let s : any = this.segundos;

    m = String('0' + Math.floor(m)).slice(-2);
    s = String('0' + Math.floor(s)).slice(-2);

    const texto = `${m}:${s}`;
    this.tiempo.next(texto);
    if(this.segundos >= 59){
      this.segundos = -1;
      this.minutos++;
    }
    this.segundos++;
    this.enviarInformacion(`T${String(Math.floor(m)).slice(-2)}${s}`);
  }

}
