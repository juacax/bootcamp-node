import express, { application } from 'express'

const server = express()

server.get('/', (req, res) => {
  res.send('Hola Mundo')
})

server.get('/error', (req, res, next) => {
  //Ejecuciones dentro de un try catch
  try {
    const err = new Error()
    err.statusCode = 409
    err.message = 'Mensaje de error'
    err.code = 'ERROR FORZADO'
    throw err
  } catch (error) {
    next(error)
  }
})

server.get('/chau', (req, res) => {
  res.send('Chau Mundo 1')
})

server.get('/chau', (req, res) => {
  res.send('Chau Mundo 2')
})

server.use((req, res) => {
  res.send('Endpoint Inexistente')
})

server.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err)
})

server.listen(8000, () => {
  console.log('Escuchando en el puerto 8000, url http://localhost:8000')
})
