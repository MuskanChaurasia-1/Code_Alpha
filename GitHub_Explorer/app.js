const API_URL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#inp");


const getUser = async(username) => {
    const response = await fetch(API_URL + username);
    console.log(response);
    const data = await response.json();
    // console.log(data);

    const card = `
    <div class="card">
        <img src="${data.avatar_url}" class="avatar" alt="user">
        <div class="user_details">
            <h2>${data.name}</h2>
            <h5>${data.bio}</h5>

            <div class="info">
                <ul class="det">
                    <li class="inf">${data.followers} Followers</li>
                    <li class="inf">${data.following} Following</li>
                    <li class="inf">${data.public_repos} Repos</li>
                </ul>
            </div>

            <div id="repos">
                
            </div>
        </div>
    </div>
    `
    main.innerHTML = card;
    getRepos(username);
}

getUser("gfjgj");

const getRepos = async(username) => {
    const response = await fetch(API_URL + username + "/repos");
    const data = await response.json();
    
    data.forEach(
        (item)=>{
            // console.log(item)
            const el=document.createElement("a")
            // console.log(el)
            el.classList.add("repo")
            el.href=item.html_url
            el.innerText=item.name
            el.target="_blank"
            repos.appendChild(el)
        }
    )
}

const formSubmit = () => {

    if(searchBox.value != ""){
        getUser(searchBox.value)
        searchBox.value=""
    } 
    return false;
}

searchBox.addEventListener(
    "focusout",
    function(){
        formSubmit();
    }
)