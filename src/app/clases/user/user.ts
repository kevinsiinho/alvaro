export class User {
  public id?:string
  public nombre!:String
  public apellidos!:String
  public email!:String
  public password:String=""
  public rol!:number

  SetValues(item:any){
    this.id=item.id
    this.nombre=item.nombre
    this.apellidos=item.apellidos
    this.email=item.email
    this.password=item.password
    this.rol=item.rol
  }

}
