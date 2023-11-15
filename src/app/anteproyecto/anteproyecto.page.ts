import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonAlert, IonModal } from '@ionic/angular';
import { Items } from '../clases/anteproyecto/items';
import { Anteproyecto } from '../clases/anteproyecto/anteproyecto';
import { AnteproyectoService } from '../services/anteproyecto/anteproyecto.service';
import { Preferences } from '@capacitor/preferences';
import { LoginService } from '../services/login/login.service';
import { User } from '../clases/user/user';

@Component({
  selector: 'app-anteproyecto',
  templateUrl: './anteproyecto.page.html',
  styleUrls: ['./anteproyecto.page.scss'],
})
export class AnteproyectoPage implements OnInit {
  public op!:string;
  @ViewChild(IonAlert) alert!: IonAlert;
  @ViewChild(IonModal) modal!: IonModal;
  mostrar = false;
  selectedOption!: string;
  public alertButtons = ['Cerrar'];
  public alertInputs: any[] = [];
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private link:Router,
    private alertController: AlertController
    )
   { }

   async presentAlert(msn:String) {

    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: ''+msn,
      buttons: ['OK'],
    });
    await alert.present();
  }


ngOnInit() {
  }

  abrir() {
    this.mostrar = !this.mostrar;
  }

  /*-----------------------------------------------------------------*/
async  opciones(){
    if(this.op==="config") {
      this.alert.present();
    }else if(this.op==="cerrar"){
      await Preferences.remove({ key: 'token' });
      this.link.navigate(['login'])
    }
  }
//parte para ante proyectos----------------------------------------------

cancel() {
  this.modal.dismiss(null, 'cancel');
}

}
