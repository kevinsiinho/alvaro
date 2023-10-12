import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private link:Router)
   { }

  ngOnInit() {
  }

  public alertButtons = ['Crear'];
  public alertInputs = [
    {
      placeholder: 'Nombre completo',
    },
    {
      placeholder: 'Nombre de usuario'
    },
    {
      type: 'email',
      placeholder: 'Email',
    },
    {
      type:'password',
      placeholder:"Contraseña (Mínimo 8 caracteres)",
      attributes: {
        maxlength: 8,
      },
    }
  ];

  autenticar(){
    this.link.navigate(['anteproyecto'])

  }
}
