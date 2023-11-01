class Usuario {
    constructor(id, data){
        this.bandera = 0;
        this.id=id;
        this.nombre=data.nombre;
        this.expediente=data.expediente;
        this.password=data.password;
        this.salt=data.salt;
        this.foto=data.foto;
        this.admin=data.admin;
    }
    set id(id){
        if (id!=null)
            id.length>0?this._id=id:this.bandera=1;
    }
    set nombre(nombre) {
        nombre.length>0?this._nombre = nombre:this.bandera=1;
    }
    set expediente(expediente) {
        expediente.length>0?this._expediente = expediente:this.bandera=1;
    }
    set password(password) {
        password.length>0?this._password = password:this.bandera=1;
    }
    set salt(salt){
        salt.length>0?this._salt= salt:this.bandera=1;
    }
    set foto(foto){
        foto.length>0?this._foto= foto:this.bandera=1;
    }
    set admin(admin){
        this._admin = admin
    }
    get id(){
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    get usuario() {
        return this._expediente;
    }
    get password() {
        return this._password;
    }
    get salt() {
        return this._salt;
    }
    get foto(){
        return this._foto;
    }
    get admin(){
        return this._admin;
    }
    get obtenerUsuario() {
        if(this._id==null){
            return {
                nombre:this.nombre,
                expediente:this.expediente,
                password:this.password,
                salt:this.salt,
                foto:this.foto,
                admin:this.admin
            }
        }
        else {
            return {
                id: this.id,
                nombre: this.nombre,
                expediente: this.expediente,
                password: this.password,
                salt: this.salt,
                foto: this.foto,
                admin:this.admin
            }
        }
    }
}

module.exports=Usuario;