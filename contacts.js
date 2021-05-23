const createDOMSummary = (count) => {
    const title = document.createElement('h2')
    title.textContent = `Nalezeno ${count} kontaktů.`
    return title
}

const createDOMcontact = (contact) => {
    const contactElement = document.createElement('div')
    const contactEl = document.createElement('a')

    contactEl.textContent = `${contact.title}`
    contactEl.setAttribute('href', `./show.html#${contact.id}`)

    contactElement.appendChild(contactEl)

    return contactElement
} 

const fetchFilm = (filmId) => {
    console.log(`Žádám o film s id ${filmId}`)
    fetch(`https://ghibliapi.herokuapp.com/films/${filmId}`)
    .then( (response) => {
        if (response.status ===200 ) {
            response.json()
            .then( (data) => {
                if (data.error) {
                    errMessageEl.textContent = 'Chyba v datech, film nenačten.'
                } else {
                    renderFilm(data)
                }
            })
            .catch( error => errMessageEl.textContent = 'Chyba převodu dat.')
        } else {
            errMessageEl.textContent = 'Film nenalezen.'
        }
    })
    .catch( (error) => {
        errMessageEl.textContent = 'Server nenalezen.'
    })
} 

const fetchFilms = () => {
    fetch('/films')
    .then( (response) => {
        response.json()
        .then( (data) => {
            console.log(data)
            if (data !== undefined) {
                if (data.errorMessage !== undefined) {
                    renderErrorMessage(data.errorMessage)
                } else {
                    renderFilms(data)
                }                
            } else {
                renderErrorMessage('Filmy nenalezeny')
            }
        })
        .catch( (error) => renderErrorMessage('Chyba v datech'))
    })
    //.catch(renderErrorMessage('Server neodpověděl'))
}

const fetchFilmsFromGhibli = () => {
    console.log('Žádám o data z GhibliAPI')
    fetch('https://ghibliapi.herokuapp.com/films')
   .then( (response) => {
        if (response.status === 200) {
            response.json()
            .then( (data) => {
                if (data.error) {
                    console.log('Chyba v datech, filmy nenačteny.')
                } else {
                    renderFilms(data)
                 }
            })
        } else {
            console.log('Neznámý požadavek, chyba ve zpracování.')
        }        
    })
    .catch( error => console.log('Server nenalezen.'))
}

const renderErrorMessage = (message) => {
    const contactsDiv = document.querySelector('#contacts')
    contactsDiv.innerHTML = ''
    const messageEl = document.createElement('p')
    messageEl.setAttribute('className', 'errorMessage')
    messageEl.textContent = message
    contactsDiv.appendChild(messageEl)
} 

const renderContacts = (contacts) => { 
    console.log(contacts)
    
    const contactsDiv = document.querySelector('#contacts')
    contactsDiv.innerHTML = ''

    const heading = createDOMSummary(contacts.length)
    contactsDiv.appendChild(heading)

    contacts.forEach(function (contact) {
        const paragraph = createDOMfilm(contact)
        contactsDiv.appendChild(paragraph)
    })
} 

const renderFilm = (film) => {
    /*const titleElement = document.querySelector('#title')
    const directorElement = document.querySelector('#director')
    const descriptionElement = document.querySelector('#description')
    
    titleElement.textContent = `Název filmu: ${film.title}`
    directorElement.textContent = `Režisér: ${film.director}`
    descriptionElement.textContent = `Děj: ${film.description}`
    */
   //Nutno dodělat dle reálného typu objektu
}