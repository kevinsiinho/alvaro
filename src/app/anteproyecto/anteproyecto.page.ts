import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAlert, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-anteproyecto',
  templateUrl: './anteproyecto.page.html',
  styleUrls: ['./anteproyecto.page.scss'],
})
export class AnteproyectoPage implements OnInit {
  public op!:string;
  @ViewChild(IonAlert) alert!: IonAlert;
  @ViewChild(IonModal) modal!: IonModal;
  public titulo!:string
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
//parte para ante proyectos----------------------------------------------
public items:any[]=[
  {
    titulo:"Titulo:",
    texto:"",
    estado:"Pendiente",
  },
  {
    titulo:"Objetivos:",
    texto:"",
    estado:"Pendiente",
  },
  {
    titulo:"Descrición:",
    texto:"",
    estado:"Pendiente",
  },
]

cancel() {
  this.modal.dismiss(null, 'cancel');
}

add(){
   const temporal={titulo:this.titulo,texto:"",estado:"Pendiente"}
   this.items.push(temporal)
   this.titulo=""
   console.log(this.items)
}

}
