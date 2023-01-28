
//CommonJS => require --- const http = require('http')
//ESModules => import/export

import http from 'node:http'
import { Transform } from 'node:stream'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

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

//tres formas de nossa aplicaçao enviar informações para o back-end
// Query Parameters - Parametros nomedos que enviamos no endereço da requisição
// exp. http://localhost:3333/users?userId=1  uso - filtros, paginação, não-obrigatorios
// Route Parameters - São usados para identificação de recurso
// exp. GET http://localhost:3333/users/1
// Request Body - É utilizado para envio de informações de um formulário
// exp POST http://localhost:3333/users


class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = {...routeParams.groups}
    
    return route.handler(req, res)
  }

  //console.log(route)
  return res.writeHead(404).end()
})


server.listen(3000)

