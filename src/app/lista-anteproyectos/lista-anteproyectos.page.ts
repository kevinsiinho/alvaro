import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAlert, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-lista-anteproyectos',
  templateUrl: './lista-anteproyectos.page.html',
  styleUrls: ['./lista-anteproyectos.page.scss'],
})
export class ListaAnteproyectosPage implements OnInit {
  public op!:string;
  @ViewChild('presentalert') alert1!: IonAlert;
  @ViewChild('presentalert2') alert2!: IonAlert;

  constructor(private link:Router)
   { }
  ngOnInit() {
  }

  @ViewChild(IonModal) modal!: IonModal;

  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

   // Función para abrir la alerta
   abrirAlerta() {
    // Llama al método present() para mostrar la alerta
    this.alert1.present();
  }

  public alertButtons = ['Cerrar'];
  public alertInputs = [
    {
      placeholder: 'Id proyecto',
    },
    {
      placeholder: 'Id usuario',
    },
    {
      placeholder: 'Nombre completo',
    },
    {
      placeholder: 'Nombre de usuario'
    },
    {
      placeholder: 'Email',
    }
  ];

  /*-----------------------------------------------------------------*/

  public alertButtons2 = ['OK'];
  public alertInputs2 = [
    {
      placeholder: 'Id usuario',
    },
    {
      placeholder: 'Nombre completo',
    },
    {
      placeholder: 'Nombre de usuario'
    },
    {
      placeholder: 'Email',
    },
    {
      type:'password',
      placeholder:"********",
      attributes: {
        maxlength: 8,
      },
    }
  ];

  /*-----------------------------------------------------------------*/
  opciones(){
    if(this.op==="config") {
      this.alert2.present();
    }else if(this.op==="cerrar"){
      this.link.navigate(['login'])
    }
  }


}
