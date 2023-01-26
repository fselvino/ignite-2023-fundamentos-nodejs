import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {

  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {

  const buffer = []

  for await (const chunk of req) {
    buffer.push(chunk)
  }


  const fullStreamContente = Buffer.concat(buffer).toString()

  console.log(fullStreamContente)
  return res.end(fullStreamContente)


  //return res.end(new InverseNumberStream())
  //return req
  //.pipe(new InverseNumberStream())
  //.pipe(res)
})

server.listen(3333)