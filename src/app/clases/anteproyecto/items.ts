export class Items {
  titulo!:string
  texto?:string
  estado:string="Pendiente"

  SetValues(item:any){
    this.titulo=item.titulo
    this.texto=item.texto
    this.estado=item.estado
  }
}
