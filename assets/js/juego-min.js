(()=>{"use strict";let e=[],t=["C","D","H","S"],r=["A","J","Q","K"],a=()=>{for(let a=2;a<=10;a++)for(let s of t)e.push(a+s);for(let n of r)for(let i of t)e.push(n+i);return _.shuffle(e)};a();let s=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},n=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},i=0,o=0,l=document.querySelector("#btnNuevo"),c=document.querySelector("#btnPedir"),d=document.querySelector("#btnDetener"),u=document.querySelector("#jugador-cartas"),p=document.querySelector("#computadora-cartas"),$=document.querySelectorAll("small");c.addEventListener("click",()=>{let e=s();i+=n(e),$[0].innerText=i;let t=document.createElement("img");t.src=`assets/cartas/${e}.png`,t.classList.add("carta"),u.append(t),i>21?(c.disabled=!0,d.disabled=!0,m(i)):21===i&&(c.disabled=!0,d.disabled=!0,m(i))}),d.addEventListener("click",()=>{c.disabled=!0,d.disabled=!0,m(i)}),l.addEventListener("click",()=>{e=[],e=a(),i=0,o=0,$[0].innerText=0,$[1].innerText=0,u.innerHTML="",p.innerHTML="",c.disabled=!1,d.disabled=!1});let m=e=>{do{let t=s();o+=n(t),$[1].innerText=o;let r=document.createElement("img");if(r.src=`assets/cartas/${t}.png`,r.classList.add("carta"),p.append(r),e>21)break}while(o<e&&e<22);setTimeout(()=>{21===o&&21===i?alert("\xa1Empate! \xa1\xc1nimo, otra vez ser\xe1!"):21===i?alert("\xa1\xa1\xa1BLACKJACK!!! \xa1Felicitaciones =)!"):22===o?alert("Raspando, pero... \xa1Ganaste! =)"):21===o&&20===i?alert("Perdiste por muy poquito... \xa1\xc1nimo, la proxima vez ser\xe1!"):22===i?alert("Lo siento mucho, te pasaste por muy poquito =("):i>26?alert("\xa1Te pasaste! Menos ambici\xf3n la pr\xf3xima..."):i>21?alert("Lo siento mucho, perdiste =("):o>21?alert("\xa1Ganaste! =)"):o>=i?alert("Lo siento mucho, perdiste =("):alert("Decisi\xf3n inconclusa. Consultar con soporte")},150)}})();