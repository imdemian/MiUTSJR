class Post{
    constructor(id, data){
        this.bandera = 0;
        this.id = id;
        this.title = data.title;
        this.content = data.rating;
        this.createdAt = data.createdAt;   
    }
    set id(id){
        if (id!=null)
        id.length>0?this._id=id:this.bandera=1;
    }
    set title(title) {
        title.length>0?this._title = title:this.bandera=1;
    }
    set content(content) {
        content.length>0?this._content = title:this.bandera=1;
    }
    set createdAt(createdAt) {
        createdAt.length>0?this._createdAt = title:this.bandera=1;
    }
    get id(){
        return this._id;
    }
    get title(){
        return this._title;
    }
    get content(){
        return this._content;
    }
    get createdAt(){
        return this._createdAt;
    }
    get obtenerPost(){
        if(this._id==null){
            return {
                id:this.id,
                title:this.title,
                content:this.content,
                createdAt:this.createdAt
            }
    }else{
        return {
            id:this.id,
            title:this.title,
            content:this.content,
            createdAt:this.createdAt
        }
    }
}
}
module.exports = Post;