const Movie = require("../models/moviesModel");
const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().required().min(1).max(50),
    director: Joi.string().required().min(1).max(50),
    link: Joi.string().required().min(1).max(150)
 });

module.exports = class Movies {
    static async apiGetAllMovies(req, res, next){
        console.log('Controller Movies - get movies');
        try {
            const movies = await Movie.getAllMovies();
            if(!movies){
                res.status(404).json(`Não existe filme cadastrado.`);
                return;
            }
            movies.forEach(movie => {
                console.log(`[Movie controller: retorno do banco] ${movie.name}`);
            });
            res.status(200).json(movies);
        } catch (error) {
            console.log(`[getallmovies error] ${error}`);
            res.status(500).json({error: error});
            return;
        }
    }

    static async getById(req, res, next){
      console.log('Controller Movies - get movies');
      try {
          const movies = await Movie.getById(req.params.id);
          res.status(200).json(movies);
      } catch (error) {
          console.log(`[getallmovies error] ${error}`);
          res.status(500).json({error: error});
          return;
      }
  }

    static async addMovie(req, res, next) {
        console.log('[Add Movie Controller]', req.body);
        const { error, value } = schema.validate(req.body);
        if (error) {
            const result = {
               msg: 'Filme não incluído. Campos não foram preenchidos corretamente.',
               error: error.details
            }
            res.status(404).json(result);
            return;
         }
        try {
           const addedMovie = await Movie.addMovie(req.body);
           res.status(200).json(addedMovie);
        } catch (error) {
           res.status(500).json({ error: error });
        }
     }

     static async deleteMovie(req, res, next) {
        console.log('[Delete Movie Controller]', req.params.id);
        try {
           const deleteMovie = await Movie.deleteMovie(req.params.id);
           res.status(200).json(deleteMovie);
        } catch (error) {
           res.status(500).json({ error: error });
        }
     }

     static async updateMovie(req, res, next) {
        console.log('[Update Movie Controller]', req.params.id);
        try {
           const updateMovie = await Movie.updateMovie(req.params.id, req.body);
           res.status(200).json(updateMovie);
        } catch (error) {
           res.status(500).json({ error: error });
        }
     }

}