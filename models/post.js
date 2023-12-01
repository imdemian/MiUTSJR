const { firebaseDatabase } = require("../db/forumBd");
class Post {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        // this.userId = data.userId;
        this.title = data.title;
        this.content = data.content; 
        this.rating = data.rating;
    }

    set id(id) {
        if (id != null)
            id.length > 0 ? (this._id = id) : (this.bandera = 1);
    }

    // set userId(userId) {
    //     if (userId != null)
    //     userId.length > 0 ? (this._userId = userId) : (this.bandera = 1);
    // }

    set title(title) {
        title.length > 0 ? (this._title = title) : (this.bandera = 1);
    }

    set content(content) {
        content.length > 0 ? (this._content = content) : (this.bandera = 1);
    }

    set rating(rating) {
        rating.length > 0 ? (this._rating = rating) : (this.bandera = 1);
    }

    get id(){
        return this._id;
    }

    // get userId(){
    //     return this._userId;
    // }

    get title(){
        return this._title;
    }

    get content(){
        return this._content;
    }

    get rating(){
        return this._rating;
    }

    get obtenerPost() {
        const postObject = {
            // userId: this.userId,
            title: this.title,
            content: this.content,
            rating: this.rating,
        };

        if (this._id !== null && this._id !== undefined) {
            postObject.id = this.id;
        }

        return postObject;
    }
    static async findAll() {
        try {
            const postsSnapshot = await firebaseDatabase.collection("posts").get();

            const posts = [];
            postsSnapshot.forEach((doc) => {
                posts.push(new Post(doc.id, doc.data()));
            });

            return posts;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Post;
