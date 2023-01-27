
//CommonJS => require --- const http = require('http')
//ESModules => import/export

import http from 'node:http'
import {randomUUID} from 'node:crypto'
import { Transform } from 'node:stream'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

/**
 * Criar usuarios
 * Listagem de usuarios
 * edição de usuarios
 * remoçao de usuarios
 * 
 * metodos http
 * GET - Utilizado para buscar uma informação
 * POST - Criar uma informação
 * PUT - Editar ou Atualizar varias informação ou recurso
 * PATCH - Atualizar uma informaçao unica ou especifica
 * DELETE - Deletar um recurso do back-end
 * 
 * Aplicaçao Stateful - aplicaçao depende de informaçao em memoria
 * Aplicaçao Stateless - aplicaçao salva as informaçoes de bancos de dados
 * 
 * JSON - JavaScript Object Notation
 * 
 * Cabeçalhos (Requisição/resposta) => Metadados
 * 
 * HTTP Status code
 */

const database = new Database


class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)
  //console.log(body)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    console.log(database)

    return res
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email
    }

    

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})


server.listen(3000)

