const client = require('../../config/dbConnection');
const { ObjectId } = require('mongodb');

module.exports = class MoviesModel {

    static async getAllMovies() {
        console.log(`[Get Movies Model]`);
        const cursor = await client.db("dsw").collection("movies").find();
        const movies = await cursor.toArray();
        console.log(`[Movies Model]`)
        return movies;
    }

    static async getById(id) {
        console.log(`[Get Movies Model]`);
        const query = { _id: new ObjectId(id) };
        const cursor = await client.db("dsw").collection("movies").findOne(query);
        console.log(`[Movies Model]`)
        return cursor;
    }

    static async addMovie(data) {
        console.log(`[Movie Model - Add Movie] ${data}`);
        try {
            const newMovie = { name: data.name, director: data.director, link: data.link,
                date: new Date()
            }
            const addedMovie = await client.db("dsw").collection("movies").insertOne(newMovie);
            console.log(`New movie inserted with the following id ${addedMovie.insertedId}`);
            return addedMovie;
        } catch (error) {
            console.log(`[movieService] Error: ${error}`);
        } 
    }

    static async deleteMovie(delete_id) {
        console.log(`[Movie Model - Delete Movie] ${delete_id}`);
        const query = { _id: new ObjectId(delete_id) };
        return await client.db("dsw").collection("movies").deleteOne(query);
    }

    static async updateMovie(update_id, data) {
        console.log(`[Movie Model - Update Movie] ${update_id}`);
        const id = { _id: new ObjectId(update_id) };
        const query = {  $set: {name: data.name, director: data.director, link: data.link} }
        return await client.db("dsw").collection("movies").updateOne(id, query);
    }

}