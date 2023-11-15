import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Login } from '../clases/login/login';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import { AlertInput } from '@ionic/core';
import { AnteproyectoService } from '../services/anteproyecto/anteproyecto.service';
import { Anteproyecto } from '../clases/anteproyecto/anteproyecto';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login= new Login()
  public anteproyecto= new Anteproyecto
  public token:string=""
  constructor(
    public loginService: LoginService,
    public anteproyectoservice:AnteproyectoService,
    private alertController: AlertController,
    private link:Router,
    ) { }

//esto es una alerta de ionic y recibe un estring
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
//Esto es para registrar, es un array de objeto que luego se mostrará en la alerta
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
//esta es la alerta de ionic y recibe lo anterior
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
            data.rol=Number(data.rol) //cambia el rol de string a numero
            // en la linea de abajo comprueba que los datos hallan sido ingresados
            if(data.nombre!="" && data.apellidos!="" && data.email!="" && data.password!="" && data.rol>0 && data.rol<3){
              // si esta los datos ingresado enviar el formulario al servicio loginservice y si obtine una respuesta 200
              //es porque todo fue correcto de lo contario saldra error en los datos
              this.loginService.Create(data).then(res=>{
                if (res===200) {
                  this.presentAlert("Usuario "+data.nombre+" ha sido registrado con exito")
                  this.anteproyectoservice.Createanteproyecto(this.anteproyecto)
                }else{
                  this.presentAlert("Error en los datos")

                }
              })
            }else{
              this.presentAlert("Error en los datos")

            }
          },
        },
      ],
    });

    await alert.present();
  }
//aquí es el proceso por el cual se verifica que usuairo ingrese el correo y el password
autenticar(){
    if(this.login.email!=null && this.login.password!=null){
      this.loginService.Login(this.login).then(async(res)=>{
         await Preferences.set({ // si el usuario existe y los datos estan bien, creará el token y lo guardará en el localstorage
          key: 'token',
          value: res.data.token,
        });
        if(res.data.token){
           this.OnQuien()// aquí llama a esta función para saber quien es el usuario
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
      this.loginService.Usuario(res.data).then((data)=>{
        //aquí hay que ver que tipo de rol es
        if(data.rol==1){
          this.link.navigate(['anteproyecto'])
        }else{
          this.link.navigate(['lista-anteproyectos'])
        }
      })
      })

    }
}
