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
  private banderas: boolean[][] = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ];

  // Constructor
  constructor(
    private router: Router,
    private bluetoothService: BluetoothService,
    private alertController: AlertController,
    private bluetoothSerial: BluetoothSerial
  ) {}

  ngOnInit() {
    this.bluetoothService.$getbluetoothSerial
      .subscribe((b) => {
        this.bluetoothSerial = b;
      })
      .unsubscribe();
  }

  // Enviar informacion
  enviarInformacion(caracter: string) {
    this.cambiarColor(caracter);
    this.bluetoothSerial.write(caracter).then(
      (response) => {
        console.log('ok');
      },
      (error) => {
        console.error('Hubo un problema');
      }
    );
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

  cambiarColor(caracter: String) {
    switch (caracter) {
      case 'A': // 1,1
        this.banderas[0][0] = !this.banderas[0][0];
        break;
      case 'B': // 1,2
        this.banderas[0][1] = !this.banderas[0][1];
        break;
      case 'C': // 1,3
        this.banderas[0][2] = !this.banderas[0][2];
        break;
      case 'D': // 1,4
        this.banderas[0][3] = !this.banderas[0][3];
        break;
      case 'E': // 1,5
        this.banderas[0][4] = !this.banderas[0][4];
        break;
      case 'F': // 1,6
        this.banderas[0][5] = !this.banderas[0][5];
        break;
      case 'G': // 1,7
        this.banderas[0][6] = !this.banderas[0][6];
        break;
      case 'H': // 1,8
        this.banderas[0][7] = !this.banderas[0][7];
        break;
      case 'I': // 2,1
        this.banderas[1][0] = !this.banderas[1][0];
        break;
      case 'J': // 2,2
        this.banderas[1][1] = !this.banderas[1][1];
        break;
      case 'K': // 2,3
        this.banderas[1][2] = !this.banderas[1][2];
        break;
      case 'L': // 2,4
        this.banderas[1][3] = !this.banderas[1][3];
        break;
      case 'M': // 2,5
        this.banderas[1][4] = !this.banderas[1][4];
        break;
      case 'N': // 2,6
        this.banderas[1][5] = !this.banderas[1][5];
        break;
      case 'O': // 2,7
        this.banderas[1][6] = !this.banderas[1][6];
        break;
      case 'P': // 2,8
        this.banderas[1][7] = !this.banderas[1][7];
        break;
      case 'Q': // 3,1
        this.banderas[2][0] = !this.banderas[2][0];
        break;
      case 'R': // 3,2
        this.banderas[2][1] = !this.banderas[2][1];
        break;
      case 'S': // 3,3
        this.banderas[2][2] = !this.banderas[2][2];
        break;
      case 'T': // 3,4
        this.banderas[2][3] = !this.banderas[2][3];
        break;
      case 'U': // 3,5
        this.banderas[2][4] = !this.banderas[2][4];
        break;
      case 'V': // 3,6
        this.banderas[2][5] = !this.banderas[2][5];
        break;
      case 'W': // 3,7
        this.banderas[2][6] = !this.banderas[2][6];
        break;
      case 'X': // 3,8
        this.banderas[2][7] = !this.banderas[2][7];
        break;
      case 'Y': // 4,1
        this.banderas[3][0] = !this.banderas[3][0];
        break;
      case 'Z': // 4,2
        this.banderas[3][1] = !this.banderas[3][1];
        break;
      case 'a': // 4,3
        this.banderas[3][2] = !this.banderas[3][2];
        break;
      case 'b': // 4,4
        this.banderas[3][3] = !this.banderas[3][3];
        break;
      case 'c': // 4,5
        this.banderas[3][4] = !this.banderas[3][4];
        break;
      case 'd': // 4,6
        this.banderas[3][5] = !this.banderas[3][5];
        break;
      case 'e': // 4,7
        this.banderas[3][6] = !this.banderas[3][6];
        break;
      case 'f': // 4,8
        this.banderas[3][7] = !this.banderas[3][7];
        break;
      case 'g': //5,1
        this.banderas[4][0] = !this.banderas[4][0];
        break;
      case 'h': // 5,2
        this.banderas[4][1] = !this.banderas[4][1];
        break;
      case 'i': // 5,3
        this.banderas[4][2] = !this.banderas[4][2];
        break;
      case 'j': // 5,4
        this.banderas[4][3] = !this.banderas[4][3];
        break;
      case 'k': // 5,5
        this.banderas[4][4] = !this.banderas[4][4];
        break;
      case 'l': // 5,6
        this.banderas[4][5] = !this.banderas[4][5];
        break;
      case 'm': // 5,7
        this.banderas[4][6] = !this.banderas[4][6];
        break;
      case 'n': // 5,8
        this.banderas[4][7] = !this.banderas[4][7];
        break;
      case 'o': // 6,1
        this.banderas[5][0] = !this.banderas[5][0];
        break;
      case 'p': // 6,2
        this.banderas[5][1] = !this.banderas[5][1];
        break;
      case 'q': // 6,3
        this.banderas[5][2] = !this.banderas[5][2];
        break;
      case 'r': // 6,4
        this.banderas[5][3] = !this.banderas[5][3];
        break;
      case 's': // 6,5
        this.banderas[5][4] = !this.banderas[5][4];
        break;
      case 't': // 6,6
        this.banderas[5][5] = !this.banderas[5][5];
        break;
      case 'u': // 6,7
        this.banderas[5][6] = !this.banderas[5][6];
        break;
      case 'v': // 6,8
        this.banderas[5][7] = !this.banderas[5][7];
        break;
      case 'w': // 7,1
        this.banderas[6][0] = !this.banderas[6][0];
        break;
      case 'x': // 7,2
        this.banderas[6][1] = !this.banderas[6][1];
        break;
      case 'y': // 7,3
        this.banderas[6][2] = !this.banderas[6][2];
        break;
      case 'z': // 7,4
        this.banderas[6][3] = !this.banderas[6][3];
        break;
      case '0': // 7,5
        this.banderas[6][4] = !this.banderas[6][4];
        break;
      case '1': // 7,6
        this.banderas[6][5] = !this.banderas[6][5];
        break;
      case '2': // 7,7
        this.banderas[6][6] = !this.banderas[6][6];
        break;
      case '3': // 7,8
        this.banderas[6][7] = !this.banderas[6][7];
        break;
      case '4': // 8,1
        this.banderas[7][0] = !this.banderas[7][0];
        break;
      case '5': // 8,2
        this.banderas[7][1] = !this.banderas[7][1];
        break;
      case '6': // 8,3
        this.banderas[7][2] = !this.banderas[7][2];
        break;
      case '7': // 8,4
        this.banderas[7][3] = !this.banderas[7][3];
        break;
      case '8': // 8,5
        this.banderas[7][4] = !this.banderas[7][4];
        break;
      case '9': // 8,6
        this.banderas[7][5] = !this.banderas[7][5];
        break;
      case '+': // 8,7
        this.banderas[7][6] = !this.banderas[7][6];
        break;
      case '-': // 8,8
      this.banderas[7][7] = !this.banderas[7][7];
        break;
      default:
        this.router.navigate(['/menu']);
        break;
    }
  }
}
