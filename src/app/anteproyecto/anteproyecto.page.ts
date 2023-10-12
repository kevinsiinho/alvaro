import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAlert } from '@ionic/angular';

@Component({
  selector: 'app-anteproyecto',
  templateUrl: './anteproyecto.page.html',
  styleUrls: ['./anteproyecto.page.scss'],
})
export class AnteproyectoPage implements OnInit {
  public op!:string;
  @ViewChild(IonAlert) alert!: IonAlert;
  constructor(private link:Router)
   { }

  ngOnInit() {
  }

  mostrar = false;
  selectedOption!: string;

  abrir() {
    this.mostrar = !this.mostrar;
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
      this.alert.present();
    }else if(this.op==="cerrar"){
      this.link.navigate(['login'])
    }
  }

}
