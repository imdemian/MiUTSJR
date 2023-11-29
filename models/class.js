class Class {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.subjet = data.subjet;
        this.day = data.day; 
        this.starhour = data.starhour;
        this.finalhour = data.finalhour;
    }

    set id(id) {
        if (id != null)
            id.length > 0 ? (this._id = id) : (this.bandera = 1);
    }

    set subjet(subjet) {
        subjet.length > 0 ? (this._subjet = subjet) : (this.bandera = 1);
    }

    set day(day) {
        day.length > 0 ? (this._day = day) : (this.bandera = 1);
    }

    set starhour(starhour) {
        starhour.length > 0 ? (this._starhour = starhour) : (this.bandera = 1);
    }

    set finalhour(finalhour) {
        finalhour.length > 0 ? (this._finalhour = finalhour) : (this.bandera = 1);
    }

    get id(){
        return this._id;
    }

    get subjet(){
        return this._subjet;
    }

    get day(){
        return this._day;
    }

    get starhour(){
        return this._starhour;
    }

    get finalhour(){
        return this._finalhour;
    }

    get obtenerClase() {
        if(this._id==null){
            return {
            subjet: this.subjet,
            day: this.day,
            starhour: this.starhour,
            finalhour: this.finalhour
        }
    }else {
        return{
            id: this.id,
            subjet: this.subjet,
            day: this.day,
            starhour: this.starhour,
            finalhour: this.finalhour
        }
        }
    }
}

        
module.exports = Class;
