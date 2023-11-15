import { Items } from "./items"

export class Anteproyecto {
  next(data: any) {
    throw new Error('Method not implemented.')
  }
  id?:string
  iduser:string=""
  comentarios:string[]=[]
  items:Items[]=[]
  estado:string="Pendiente"
  SetValues(item:any){
    this.id=item.id
    this.iduser=item.iduser
    this.comentarios=item.comentarios
    this.items=item.items
    this.estado=item.estado
  }
}
