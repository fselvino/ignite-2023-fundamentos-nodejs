import { Readable } from 'node:stream'


class OneToHundredStream extends Readable {

  index = 1
  //Esse metodo retorna quais sao os dados dessa Streams
  _read() {
    const i = this.index++
    //função que conta o tempo
    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        //constroe um buffer 
        //const buf = Buffer.from(String(i) + ',')

        
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000);//Um milessimo corresponde a um segundo

  }
}

fetch('http://localhost:3333', {
  method: 'POST',
  body: new OneToHundredStream()
}).then(response => {
  return response.text()
}).then(data => {


  /**
    //expressão regular /.$/ pode ser usada para obter o último
    //caractere de uma string.
    const calc = data.replace(/.$/, '').split(',')
    const saida = calc.map(iten => {
      return Number(iten) * 2
    })
  
    //retira o ultimo item do array que é zero
    const b = saida.filter(item =>
      item !== 0
    )  
    console.log(saida)  o retorno e um Array ([1,2,3,4,5] x 2) sem a ultima virgula    
   */

  //retira a virgula no ultimo caracter /.$/

  //Esse pedaço de codigo faz o mesmo que essa outra parte comentada.
  //const b = []
   //for( let i = 0; i < data.length; i++) {    
  // b.push(Number(data.charAt(i)) * 2)  
  //}
console.log(data)

})