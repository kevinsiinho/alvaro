import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Login } from 'src/app/clases/login/login';
import { User } from 'src/app/clases/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url = environment.url
  public usuarios:User[]=[];
  public usuario= new User()
  constructor() { }

  async alluser():Promise<any>{
    this.usuarios=[]
    const options = {
      url: this.url+'/signup'
    };

  const response: HttpResponse = await CapacitorHttp.get(options);
    console.log(response.data)
        response.data.forEach((item:any)=> {
          this.usuario=new User();
          this.usuario.SetValues(item)
          this.usuarios.push(this.usuario)
        });
        return this.usuarios
  }

  async Login(login:Login){
    const options = {
      url: this.url+'/users/login/',
      headers: { "Content-Type": "application/json" },
      data: login
    };

  const response: HttpResponse = await CapacitorHttp.post(options);
   return response
  }

  async Quien(token:string){
    const options = {
      url: this.url+'/whoAmI',
      headers: { "Content-Type": "application/json",
                  "Authorization": 'Bearer ' + token
               }
    };

  const response: HttpResponse = await CapacitorHttp.get(options);
       return response
  }

  async Create(user:User){
    const options = {
      url: this.url+'/signup',
      headers: { "Content-Type": "application/json" },
      data: user
      };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response.status
  };

  async Usuario(id:string){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'/usuario/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };

  const response: HttpResponse = await CapacitorHttp.get(options);
    console.log(response.data)
  return response.data
  }
}
