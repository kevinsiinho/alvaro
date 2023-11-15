import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAlert, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Anteproyecto } from '../clases/anteproyecto/anteproyecto';
import { AnteproyectoService } from '../services/anteproyecto/anteproyecto.service';
import { User } from '../clases/user/user';
import { LoginService } from '../services/login/login.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-lista-anteproyectos',
  templateUrl: './lista-anteproyectos.page.html',
  styleUrls: ['./lista-anteproyectos.page.scss'],
})
export class ListaAnteproyectosPage implements OnInit {
  public op!:string;
  @ViewChild('presentalert') alert1!: IonAlert;
  @ViewChild('presentalert2') alert2!: IonAlert;
  public anteproyecto= new Anteproyecto
  public anteproyectos:Anteproyecto[]=[]
  public alertButtons = ['Cerrar'];
  public alertInputs: any[] = [];
  public user= new User
  public alertButtons2 = ['OK'];
  public alertInputs2:any[]=[]

  constructor(
    private link:Router,
    public anteproyectoservice:AnteproyectoService,
    public loginservice:LoginService
    )
   { }

  ngOnInit(){
    this.anteproyectoservice.todosAnteproyectos().then((res:Anteproyecto[])=>{
      this.anteproyectos=res
    })

    this.OnQuien()
  }

  @ViewChild(IonModal) modal!: IonModal;

  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
    if(this.name!=""){
      this.anteproyecto.comentarios.push(this.name)
      this.anteproyecto.estado="Revisado"
      this.anteproyectoservice.UpdateAnteproyecto(this.anteproyecto)
      this.name=""
    }
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


  /*-----------------------------------------------------------------*/

  /*-----------------------------------------------------------------*/
async  opciones(){
    if(this.op==="config") {
      this.alert2.present();
    }else if(this.op==="cerrar"){
      await Preferences.remove({ key: 'token' });
      this.link.navigate(['login'])
    }
  }
/*---------------------------------------------------------------------------------*/
//funcion para cambiar el fondo segun el estado
ColorEstado(estado: string): string {
  if (estado === "Pendiente") {
    return "warning";
  } else if (estado === "Revisado") {
    return "secondary";
  } else {
    return "success";
  }
}

selectproyecto(id:string){
  this.anteproyectos.forEach(element => {
    if(element.id===id){
      this.anteproyecto=element
      this.loginservice.Usuario(this.anteproyecto.iduser).then((data)=>{
        this.user=data
          this.alertInputs = [
            {
              value: this.anteproyecto.id,
              disabled: true
            },
            {
              value: this.user.id,
              disabled: true
            },
            {
              value: this.user.nombre,
              disabled: true
            },
            {
              value: this.user.apellidos,
              disabled: true
            },
            {
              value: this.user.email,
              disabled: true
            }
          ];
      })

    }
  });
}



async OnQuien() {
  const { value } = await Preferences.get({ key: 'token' });
  if (value) {
    const res = await this.loginservice.Quien(value);
    this.loginservice.Usuario(res.data).then((data)=>{
      this.user=data
        this.alertInputs2 = [
          {
            value: this.user.id,
            disabled: true
          },
          {
            value: this.user.nombre,
            disabled: true
          },
          {
            value: this.user.apellidos,
            disabled: true
          },
          {
            value: this.user.email,
            disabled: true
          }
        ];
    })


  }
}


}
