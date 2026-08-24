import { installApp } from './js/install.js'
import { Register } from './js/register-sw.js'

installApp()

Register()
//mode actuel ?
const isPWA =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches;

if (isPWA) {
    //alert('pwa')
}

fetch('https://ingrwf13-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
    .then(resp => resp.json())
    .then(resp => {
        alert(resp['-P-OwlX8uaoWvyuI7TGg'].tabel)
    })
    .catch(err => console.log(err))