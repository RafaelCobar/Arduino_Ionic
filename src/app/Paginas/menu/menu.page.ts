import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
import { BluetoothService } from 'src/app/Servicio/bluetooth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  estacion1 : boolean;
  estacion2 : boolean;
  estacion3: boolean;
  btnAceptar : boolean;
  terminarEns: boolean;
  tiempo : BehaviorSubject<string> = new BehaviorSubject('00:00');
  minutos : number = 0;
  segundos : number = 0;
  temperatura : string ;
  temp : number;
  info: string;
  desconexion : boolean;
  timer1;
  timer2;


  // Constructor
  constructor(
    private router: Router,
    private bluetoothService: BluetoothService,
    private alertController: AlertController,
    private bluetoothSerial: BluetoothSerial
  ) {}

  ngOnInit() {
    this.desconexion = false;
    this.estacion1 = true;
    this.estacion2 = false;
    this.estacion3 = false;
    this.btnAceptar = false; 
    this.terminarEns = false;
    this.minutos = 0;
    this.segundos = 0;
    this.temperatura = "";
    this.temp = 0;
    this.tiempo = new BehaviorSubject('00:00');
    this.info = "";
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
    this.timer2 = setInterval(() => {
        this.leerInfoBluetooth();
    }, 200);
  }

  //recibir información
  leerInfoBluetooth(){
    this.bluetoothSerial.available()
    .then((number: any) => {
        this.bluetoothSerial.read()
        .then((data: any[]) => {
          if(data.length > 0){
            if(data.length >= 3){
              if(data[0] == 'T'){
                this.temperatura = data.toString().substring(1, data.length-1);
              }
              this.info = data.toString();
              this.info = `${this.info.substring(1, this.info.length - 1)}°C`;
              this.temp = Number(this.temperatura);
            }
            if(data[0] == '#'){
              clearInterval(this.timer1);   
              clearInterval(this.timer2);   
              this.tiempo.next('00:00');
              this.bluetoothSerial.clear();
              this.bluetoothService.sendBluetoothSerial(this.bluetoothSerial);
              this.router.navigate(['/crear-matriz']);              
            }
            if(data[0] == '/'){
              clearInterval(this.timer1);   
              clearInterval(this.timer2);  
              this.tiempo.next('00:00');   
              this.bluetoothSerial.disconnect();
              this.mensajeAlerta('Dispositivo Desconectado');
              this.router.navigate(['/home']);
            }
            this.verificarTemperatura();
            this.bluetoothSerial.clear();
          }
          // Data es un arreglo A qui es donde severifica lo que envia proteus
        });
    });
  }

  verificarTemperatura(){
    if(this.temp > 45){
      this.mensajeAlerta("Temperatura mayor a 45°C, se suspende el proceso");
      this.salir();
    }
  }

  encenderEstacion1(){
    this.estacion1 = false;
    this.estacion2 = true;
    this.enviarInformacion('B');
  }
  
  encenderEstacion2(){
    this.estacion2 = false;
    this.estacion3 = true;
    this.enviarInformacion('C');
  }
  
  encenderEstacion3(){
    this.estacion1 = false;
    this.estacion2 = false;
    if(!this.terminarEns) {
      this.enviarInformacion('D');
    } else {
      this.estacion3 = false;
      this.btnAceptar = true;
      this.enviarInformacion('E');
    }    
    this.terminarEns = !this.terminarEns;
  }



  // aceptar o emergencia
  // Lo que ya tiene este metodo no se debe borrar, se deben de reiniciar los valores por defecto del paso diseño matriz,
  salir(){
    this.temp = 35;
    this.enviarInformacion("F");
  }


  desconectar() {   
    this.enviarInformacion("/");
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

  empezarTime(){
    this.timer1 = setInterval(() => {
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
