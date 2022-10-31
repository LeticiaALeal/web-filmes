const Movies = require('../controllers/moviesController')

module.exports = {
    getMovies: (app) => {
        console.log('[Routes] get movies')
        app.get('/api/filmes', Movies.apiGetAllMovies);
    },
    getById:(app) => {
        console.log('[Routes] get movie by id')
        app.get('/api/filmes/:id', Movies.getById);

    },
    addMovie: (app) => {
        app.post('/api/filmes', Movies.addMovie);
    },
    deleteMovie: (app) => {
        app.delete('/api/filmes/:id', Movies.deleteMovie);
    },
    updateMovie: (app) => {
        app.put('/api/filmes/:id', Movies.updateMovie);
    }
}
