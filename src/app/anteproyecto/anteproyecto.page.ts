import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public item = new Items
  public user = new User
  public items:Items[]=[]
  public anteproyecto= new Anteproyecto
  public titulo!:string
  public eliminar=false
  mostrar = false;
  selectedOption!: string;
  public alertButtons = ['Cerrar'];
  public alertInputs: any[] = [];
  isModalOpen = false;
  public tipo:string="";

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private link:Router,
    public anteproyectoservice:AnteproyectoService,
    public loginservice:LoginService,
    private alertController: AlertController,
    public router:ActivatedRoute
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
  this.OnQuien();
  this.tipo=this.router.snapshot.paramMap.get('tipo')!
  this.anteproyectoservice.Unanteproyecto().then(async (res)=>{
    this.anteproyecto=res
    this.items=this.anteproyecto.items
    this.loginservice.Usuario(await this.OnQuien().then()).then((data)=>{
      console.log(data)
      if(data.rol==1){
        if(this.tipo=="estudiante"){
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

        }else{
        this.link.navigate(['lista-anteproyectos/admin']);
      }

      }else{
        this.link.navigate(['lista-anteproyectos/admin']);
      }

    })
  })

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

add(){
  if(this.titulo!="" && this.titulo!=null){
    this.item.estado="Pendiente"
    this.item.texto=""
    this.item.titulo=this.titulo
    this.items.push(this.item)
    this.presentAlert("Añadido exitosamente")
    this.titulo=""
    this.item= new Items
  }else{
    this.presentAlert("Error, verifica")
  }

}

async guardar(){
  this.anteproyecto.items=this.items
  if(typeof this.anteproyecto.id == 'undefined'){
      this.OnQuien().then((id)=>{
         //creo el usuario
         this.anteproyecto.iduser=id
         this.anteproyectoservice.Createanteproyecto(this.anteproyecto).then((res)=>{
          this.presentAlert((res))
       })
      })
  }else{
   this.anteproyectoservice.UpdateAnteproyecto(this.anteproyecto).then((res)=>{
    this.presentAlert((res))
   })
  }
}

async OnQuien() {
    const { value } = await Preferences.get({ key: 'token' });
    if (value) {
      const res = await this.loginservice.Quien(value);
      this.anteproyecto.iduser = res.data;

    }
    return this.anteproyecto.iduser;
}

MostrarEliminar(){
  if(this.eliminar){
    this.eliminar=false
  }else if(!this.eliminar){
    this.eliminar=true
  }
}

eliminarItem(x:number){
  this.items.splice(x,1)
}


}
