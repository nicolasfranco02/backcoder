
/*
export function sumar() {
    let suma = 0;
    for (let i = 0; i < 5e9; i++) {
        suma += i;
    }
    return suma;
}*/

process.on('message', function (cantidadvalor) {
;
  
    function calculo (){
        let cantidad = cantidadvalor;
        let resultado= []
        
        for (let i =0 ; i < cantidad ; i++){
            resultado.push(Math.floor(Math.random() * 1000 + 1))
        }
        return resultado
        }
        

   const calculorandom = calculo()
   process.send( calculorandom )

});
