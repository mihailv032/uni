//THIS FILE IS ONLY FOR index.html 

import {github_username} from './constants.js'


main()
async function main(){
  try{
    createHeader();//generetes the github section header with the user profile
    createBody() //gets and renders all the repos
  }catch(err){
    console.log(err)
  }
}


async function createHeader(){
  try{
    const accountReq = await fetch(`https://api.github.com/users/${github_username}`)
    const data = await accountReq.json()
    const img = document.createElement("img");
    const anchor = document.createElement("a")
    const anchor2= document.createElement("a")
    anchor.href=data.url
    anchor2.href=data.url

    img.src = data.avatar_url;
    img.style.width = "100px"
    anchor.append(img)
    document.getElementById("githubHead").append(anchor)

    const h6 = document.createElement("h2")
    anchor2.append(h6)
    h6.classList.add("my-3")
    h6.append(document.createTextNode(github_username))
    document.getElementById("githubHead").append(anchor2)

  }catch(err){
    console.log(err)
    return false;
  }
  
}

async function createBody(){
  try{
    const reposReq = await fetch(`https://api.github.com/users/${github_username}/repos`)
    const repos = await reposReq.json()
    console.log(repos)
    repos.forEach( repo => createGithubCard("githubCards",repo))

  }catch(err){
    console.log(err)
    return false;
  }
}

//this is the reason we have so many js frameworks
function createGithubCard(containerId,repoData){
  const container = document.getElementById(containerId)
  console.log(repoData)
  const div = document.createElement("div")
  const div2 = document.createElement("div")
  const h5 = document.createElement("h5")
  const h6 = document.createElement("h6")
  const p = document.createElement("p")
  const input = document.createElement("input")
  const btn = document.createElement("button")
  const btn2 = document.createElement("button")
  const titleAnchor = document.createElement("a")
  
  div.classList.add("card", "bg-secondary-subtle")
  div.style.width = "20rem"

  div2.classList.add("card-body")
  div.append(div2)

  h5.classList.add("card-title", "fw-bolder")
  titleAnchor.href = repoData.html_url
  titleAnchor.append(document.createTextNode(repoData.name))
  h5.append(titleAnchor)
  div2.append(h5)

  h6.classList.add("card-subtitle", "text-body-secondary")
  let created = new Date(repoData.created_at);
  created = created.getDate() + '/' + (created.getMonth() + 1) + '/' +  created.getFullYear();
  h6.append(document.createTextNode(`Created at: ${created}`))
  div2.append(h6)

  p.classList.add("card-text")
  p.append(document.createTextNode(repoData.description ? repoData.description : "no description added for this repo"))
  div2.append(p)

  input.value = repoData.ssh_url
  input.readOnly = true;
  input.style.width = "100%"
  div2.append(input)

  btn.classList.add("btn", "btn-danger", "m-2")
  btn.append(document.createTextNode("copy"))

  //this is prob bad 4 optimization)))
  btn.addEventListener("click", e => { navigator.clipboard.writeText(input.value) })
  div2.append(btn)

  btn2.classList.add("btn", "btn-danger", "m-2")
  btn2.style.textAlign ="center"
  btn2.style.width = "80px"
  btn2.append(document.createTextNode("SSH"))

  btn2.addEventListener("click", e => {
    if(input.value === repoData.ssh_url){
      input.value = repoData.clone_url;
      btn2.textContent = "HTTPS"
    }else {
      input.value = repoData.ssh_url;
      btn2.textContent = "SSH"

    }
  })
  div2.append(btn2)


  container.append(div)
  

}

