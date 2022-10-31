const app = require('./config/server');
const dbConn = require('./config/dbConnection');

const routes = require('./app/routes/routes');

routes.getMovies(app);
routes.addMovie(app);
routes.deleteMovie(app);
routes.updateMovie(app);
routes.getById(app);

module.exports = app;