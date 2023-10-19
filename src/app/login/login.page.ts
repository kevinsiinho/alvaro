import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Login } from '../clases/login/login';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import { AlertInput } from '@ionic/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login= new Login()
  public token:string=""
  constructor(
    public loginService: LoginService,
    private alertController: AlertController,
    private link:Router,
    ) { }

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

  public datos: AlertInput[] = [
    {
      name: 'nombre',
      type: 'text',
      placeholder: 'Nombres',
    },
    {
      name: 'apellidos',
      type: 'text',
      placeholder: 'Apellidos'
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Contraseña (Mínimo 8 caracteres)',
      attributes: {
        minlength: 2,
      },
    },
    {
      name: 'rol',
      type: 'number',
      placeholder: '1.Estudiante y 2. Admin',
      attributes: {
        maxlength: 1,
      },
    }
  ];

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Crear usuario',
      inputs: this.datos,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data)
            data.rol=Number(data.rol)
            if(data.nombre!="" && data.apellidos!="" && data.email!="" && data.password!="" && data.rol>0 && data.rol<3){
              this.loginService.Create(data).then(res=>{
                if (res===200) {
                  this.presentAlert("Usuario "+data.nombre+" ha sido registrado con exito")
                }else{
                  this.presentAlert("Error en los datos")

                }
              })
            }
          },
        },
      ],
    });

    await alert.present();
  }

autenticar(){
    if(this.login.email!=null && this.login.password!=null){
      this.loginService.Login(this.login).then(async(res)=>{
         await Preferences.set({
          key: 'token',
          value: res.data.token,
        });
        if(res.data.token){
           this.OnQuien()
        }else{
          this.presentAlert("Usuario no encontrado, verifacar los campos")
        }
     })
    }else{
      this.presentAlert("Faltan campos por llenar")
    }

  }


  async OnQuien(){
    const { value } = await Preferences.get({ key: 'token' });
    if(value)
      this.loginService.Quien(value).then((res)=>{
        //aquí hay que ver que tipo de rol es
        if(true===true){
          this.link.navigate(['anteproyecto'])
        }else{
          this.link.navigate(['lista-anteproyectos'])
        }

      })

    }
}
