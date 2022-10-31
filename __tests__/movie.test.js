const supertest = require('supertest');
const app = require('../index');

const api = '/api/filmes/';

describe('movie', () => {

  describe('get movie route', () => {
    describe('get all movies', () => {
      it('should return a 200', async () => {
        await supertest(app).get(api).expect(200);
      });
    });
  });

  describe('given the movie does not exist', () => {
    it('should return a 404', async () => {
      await supertest(app).get(`${api}/222`).expect(404);
      // expect(true).toBe(true);
    })
  });

  describe('post movie route', () => {
    describe('save one movie', () => {
      it('should return a 200', async () => {
        await supertest(app).post(api).send({name: 'Teste', direction: 'Teste', link: 'www.ifsp.edu.br'}).expect(200);
      });
    });
  });

  describe('post movie route', () => {
      it('should return a 404', async () => {
        await supertest(app).post(api).send({direction: 'Teste', link: 'www.ifsp.edu.br'}).expect(404);
      });
  });

  describe('put movie route', () => {
    describe('update one movie', () => {
      it('should return a 200', async () => {
        await supertest(app).put(api+'/634dddf4f6044f97fafe1d71').send({name: 'Teste2'}).expect(200);
      });
    });
  });

  describe('put movie route', () => {
      it('should return a 404', async () => {
        await supertest(app).post(api+'5').send({name: 'Teste2'}).expect(404);
      });
  });


  describe('delete movie route', () => {
    describe('delete one movie', () => {
      it('should return a 200', async () => {
        await supertest(app).put(api+'/634dddf4f6044f97fafe1d71').expect(200);
      });
    });
  });

  describe('delete movie route', () => {
      it('should return a 404', async () => {
        await supertest(app).post(api+'5').expect(404);
      });
  });



});