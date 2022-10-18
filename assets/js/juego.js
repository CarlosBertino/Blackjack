(() => {                       // Funcion anonima autoinvocada
     'use strict'


     //  C = Clubs (Treboles)
     //  D = Diaminds (Diamantes o Rombos)
     //  H = Hearts (Corazones)
     //  S = Spades (Espadas o Picas

     let deck         = [];
     const tipos      = ['C','D','H','S'],
          especiales  = ['A','J','Q','K'];
     


     let puntosJugador     = 0;
     let puntosComputadora = 0;

     // Creamos deck para barajar
     const crearDeck = () => {

          for(let i = 2; i <= 10; i++){
               
               for(let tipo of tipos){
                    deck.push(i + tipo);
               }
          } 
     
          for(let especial of especiales){
               
               for(let tipo of tipos){
                    deck.push(especial + tipo);
               }
          }
     
          deck = _.shuffle (deck);                // Incorporamos extension underscore para hacer el shuffle
          return deck;
     };
     
     crearDeck();

     // Tomamos una carta que al mismo tiempo sale del deck
     const pedirCarta = () => {
     
          if (deck.length === 0) {
               throw 'No hay cartas en el deck';
          }

          return deck.pop();
     }
     
     // Asignamos puntaje a cada carta.
     // PD: recordar que A es 11 o 1, aca lo tomamos siempre como 11. Arreglarlo mas adelante.
     const valorCarta = (carta) => {
          let valor = carta.substring(0, carta.length-1);      // Tomamos la carta y leemos desde la posición 0 hasta el anteúltimo caracter
             
          if (puntosComputadora === 0) {                       // Para ver si la computadora barajó: entra en el ciclo Jugador o ciclo Computadora

               if (valor === 'J' || valor === 'Q' || valor === 'K') {           
                    valor = 10
               } else if (valor === 'A'){
                    if (puntosJugador > 10) {                  // Si los puntos son 10 o menores le asigna 1 para no pasarse...
                         valor = 1
                    } else {
                         valor = 11                            // sino es 11
                    }
               } else {
                    valor = valor*1
               }
          }
          
          else {
               if (valor === 'J' || valor === 'Q' || valor === 'K') {
                    valor = 10
               } else if (valor === 'A'){
                    if (puntosComputadora > 10) {                  // Si los puntos son 10 o menores le asigna 1 para no pasarse...
                         valor = 1
                    } else {
                         valor = 11                            // sino es 11
                    }
               } else {
                    valor = valor*1
               }
          }

          return valor;
     };

     // DOM - Referencias y botones del html
     

     
     const btnNuevo   = document.querySelector('#btnNuevo'),
          btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          divCartasJugador     = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'),
     
          puntosHTML = document.querySelectorAll('small');      // Para luego seleccionar puntosJugador [0] y puntosComputadora [1]
     
     // Eventos
     
     //Turno del jugador
     
     btnPedir.addEventListener('click', () => {                  // Esta es una funcion que se utiliza como argumento de otra funcion. Se llama CALLBACK. Al hacer clic en la función addEventListener se va a ejecutar la indicación que sigue
          
          const carta = pedirCarta();
         
          puntosJugador = puntosJugador + valorCarta(carta);
          puntosHTML[0].innerText = puntosJugador;
     
          const imgCarta = document.createElement('img');        // Creamos el espacio para la carta en memoria
          imgCarta.src = `assets/cartas/${carta}.png`;           // Acá asignamos el source donde se encuentra cada imagen que va a variar
          imgCarta.classList.add('carta');
          
          divCartasJugador.append(imgCarta);
          
          if (puntosJugador > 21) {
               // alert('Lo siento mucho, perdiste =(');
               btnPedir.disabled = true;
               btnDetener.disabled = true;
               turnoComputadora(puntosJugador)
               
          } else if (puntosJugador === 21) {
               // alert('Ganaste!!');
               btnPedir.disabled = true;
               btnDetener.disabled = true;
               turnoComputadora(puntosJugador)
          }
     
     });
     
     btnDetener.addEventListener('click', () => {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
     
          turnoComputadora(puntosJugador)
     });
     
     btnNuevo.addEventListener('click', () => {
          deck = [];                                   // Vaciamos el deck, xq sino lo duplica y pueden llegar a salir dos cartas iguales en una mano
          deck = crearDeck();

     
          puntosJugador = 0;
          puntosComputadora = 0;
     
          puntosHTML[0].innerText = 0;
          puntosHTML[1].innerText= 0;
     
          divCartasJugador.innerHTML='';
          divCartasComputadora.innerHTML='';
     
          btnPedir.disabled = false;
          btnDetener.disabled = false;
     });
     
     // Turno de la conmputadora
     
     const turnoComputadora = ( puntosMinimos ) => {
     
          do {
               
               const carta = pedirCarta();
         
               puntosComputadora = puntosComputadora + valorCarta(carta);
               puntosHTML[1].innerText = puntosComputadora;
          
               const imgCarta = document.createElement('img');        // Creamos el espacio para la carta en memoria
               imgCarta.src = `assets/cartas/${carta}.png`;           // Asignamos el source donde se encuentra cada imagen que va a variar
               imgCarta.classList.add('carta');                       // Asignamos la clase
               
               divCartasComputadora.append(imgCarta);                 // Finalmente ingresamos la imagen
     
               if( puntosMinimos > 21){
                    break;                                            // Si el jugador se pasa ya perdió. Ver si funciona sacando esta línea
               }
     
          } while (puntosComputadora < puntosMinimos && puntosMinimos < 22);
     
         // Mensajes de resultado
          setTimeout(() => {                                          // Se utiliza para demorar esta acción, sino sucede mientras se ejecutan las ultimas lineas y la alerta sale antes
               
               if (puntosComputadora === 21 && puntosJugador === 21){
                    alert('¡Empate! ¡Ánimo, otra vez será!')
               } else if (puntosJugador === 21){
                    alert('¡¡¡BLACKJACK!!! ¡Felicitaciones =)!')
               } else if (puntosComputadora === 22) {
                    alert('Raspando, pero... ¡Ganaste! =)')
               } else if (puntosComputadora === 21 && puntosJugador === 20){
                    alert('Perdiste por muy poquito... ¡Ánimo, la proxima vez será!')
               } else if (puntosJugador === 22){
                    alert('Lo siento mucho, te pasaste por muy poquito =(')
               } else if (puntosJugador > 26){
                    alert('¡Te pasaste! Menos ambición la próxima...')
               } else if (puntosJugador > 21) {
                    alert('Lo siento mucho, perdiste =(')
               } else if (puntosComputadora > 21) {
                    alert('¡Ganaste! =)')
               } else if (puntosComputadora >= puntosJugador) {
                    alert('Lo siento mucho, perdiste =(')
               } else {
                    alert('Decisión inconclusa. Consultar con soporte')
               }
     
          }, 200);
     }

})();










