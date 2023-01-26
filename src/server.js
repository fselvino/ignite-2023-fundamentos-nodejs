
//CommonJS => require --- const http = require('http')
//ESModules => import/export

import http from 'node:http'
import { Transform } from 'node:stream'

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

const users = []

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffer = []

  for await (const chunk of req) {
    buffer.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffer).toString())
  } catch {
    req.body = null
  }


  //console.log(body)

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users
      ))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email
    })
    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})


server.listen(3000)

