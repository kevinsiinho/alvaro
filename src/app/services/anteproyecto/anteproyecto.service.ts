import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Anteproyecto } from 'src/app/clases/anteproyecto/anteproyecto';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AnteproyectoService {

  public url = environment.url
  public anteproyectos:Anteproyecto[]=[];
  public anteproyecto= new Anteproyecto()
  public msn!:string

  constructor(
    public loginservice:LoginService,
  ) { }


async todosAnteproyectos(){
  const { value } = await Preferences.get({ key: 'token' });
    this.anteproyectos=[]
    const options = {
      url: this.url+'/anteproyectos',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
   }
    };
  const response: HttpResponse = await CapacitorHttp.get(options);

        response.data.forEach((item:any)=> {
          this.anteproyecto=new Anteproyecto();
          this.anteproyecto.SetValues(item)
          this.anteproyectos.push(this.anteproyecto)
        });
        return this.anteproyectos;
  }

 async Createanteproyecto(anteproyecto:Anteproyecto){
  const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'/anteproyectos',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:anteproyecto
      };
    const response: HttpResponse = await CapacitorHttp.post(options);
          if(response.status==200){
            this.msn="Proyecto creado con exito";
          }else{
            this.msn="Error por favor verifica";
          }
          return this.msn
   };

async Unanteproyecto(){
    const { value } = await Preferences.get({ key: 'token' });
    if (value) {
      const res = await this.loginservice.Quien(value);
      const options = {
        url:this.url+"/anteproyectos?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22iduser%22%3A%22"+res.data+"%22%0A%20%20%7D%0A%7D",
        headers: { "Content-Type": "application/json",
        "Authorization": 'Bearer ' + value
        }
      };
        const response: HttpResponse = await CapacitorHttp.get(options);

        this.anteproyecto=new Anteproyecto()
        console.log(response.data[0])
        this.anteproyecto.SetValues(response.data[0])
        return this.anteproyecto
    }else{
      return this.anteproyecto
    }
  }

  async UpdateAnteproyecto(anteproyecto:Anteproyecto){
    const { value } = await Preferences.get({ key: 'token' });
    this.anteproyectos=[]
    const options = {
      url: this.url+'/anteproyectos/'+anteproyecto.id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:anteproyecto
    };

  const response: HttpResponse = await CapacitorHttp.put(options);
    console.log(response)
      if(response.status==204){
        this.msn="Proyecto actualizado con exito";
      }else{
        this.msn="Error por favor verifica";
      }
      return this.msn
  }

  /*
  async DeleteFactura(id:String){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'/anteproyectos/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      };
    const response: HttpResponse = await CapacitorHttp.delete(options);
  };
*/

}
