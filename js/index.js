function renderResults(rawObject){
   //console.log (rawObject)
    // let userObject = rawObject.items[0]
    let userObject = rawObject
    let userContainer= document.querySelector('#user-list')

    let card = document.createElement('div')
    card.id = userObject.login
    let li = document.createElement('li')
    card.className= 'card'
    li.appendChild(card)

    let userName = document.createElement('h1')
    userName.innerText = userObject.login
    card.appendChild(userName)

    let avatar = document.createElement('img')
    avatar.src = userObject.avatar_url
    card.appendChild(avatar)

    const githubLink = document.createElement('a')
    githubLink.href= userObject.html_url
    card.addEventListener ('click', () => getRepository(userName.innerText) )
    card.appendChild(githubLink)

    userContainer.appendChild(card)
}

function getRepository(userName){
    console.log (userName)
        fetch (`https://api.github.com/users/${userName}/repos`,{
            Accept: 'application/vnd.github.v3+json'
        })
            .then(res => res.json())
            .then(data => data.forEach(renderRepositories))
}

function fetchQuery (e){
    
    const userName = e.target.search.value
    fetch (`https://api.github.com/search/users?q=${userName}`,{
        Accept: 'application/vnd.github.v3+json'
    })
        .then(res => res.json())
        .then(data => data.items.forEach(renderResults))

}
function submitForm (e){
    e.preventDefault()
    const search= e.target.search.value
}

document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector('#github-form')
    form.addEventListener("submit", submitForm)
    form.addEventListener("submit", fetchQuery)
} )

function renderRepositories(repo){

    const card = document.getElementById(repo.owner.login)
    //console.log(card)
    const liCard = document.createElement('li')
    liCard.innerText = repo.name
    card.append(liCard)
    console.log(repo.name)
}

