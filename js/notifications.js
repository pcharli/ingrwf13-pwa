export const notifyMe = () => {
    const notifTitle = "Titre de la notif"
    const notifBody = "Créé par Pierre"
    const notifImg = './icons/favicon-96x96.png'
    const options = {
        body: notifBody,
        icon: notifImg,
        vibrate: [200, 100, 200, 100, 200]
    }
    if (!("Notification" in window)) {
        alert('Pas de notification dans ce navigateur')
    } else if (Notification.permission === 'granted') {
        const notification = new Notification(notifTitle, options)
        notification.addEventListener('click', e => {
            window.focus()
            //window.open('https://cepegra.be', '_blank')
        })
    } else {
        notifRequest()
    }
}

export const notifRequest = () => {
    if (Notification.permission !== 'granted') {
            Notification.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
                        alert('Merci')
                    }
                })
    }
}