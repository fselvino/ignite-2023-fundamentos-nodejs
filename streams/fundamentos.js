//Streams
//process.stdin
//.pipe(process.stdout)
import { copyFileSync } from 'node:fs';
//Duplex e para realizar a leitura e escrita no mesmo arquivo a mesmo tempo
import { Readable, Writable, Transform, Duplex } from 'node:stream'

class OneToHundredStream extends Readable {

  index = 1
  //Esse metodo retorna quais sao os dados dessa Streams
  _read() {
    const i = this.index++
    //função que conta o tempo
    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        //constre um buffer 
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000);//Um milessimo corresponde a um segundo

  }
}

class MultiplyByTenStream extends Writable {
  //Metodo de escreta recebe tres paramentros
  //chunk pedaço que foi lido da stream de leitura é o que esta sendo enviado por this.push(buf)
  //Encoding e como os dados estão sendo codificados
  //Callback é uma funçao que a stream de escrita deve chamar quanto terminiu a leitura.
  _write(chunk, encoding, callback) {
    console.log(chunk.toString() * 10)
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback){
    const transformed =  Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

//retorna a saida pela stream de escrita process.stdout
new OneToHundredStream()//Stream de leitura
.pipe(new InverseNumberStream())//Stream de transforção
.pipe(new MultiplyByTenStream())//Stream de escrita.