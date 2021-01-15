let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}); 

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => json.forEach(toy => createToy(toy)));
}

function createToy(toy){
  let toyDiv = document.getElementById('toy-collection');
  let toyCard = document.createElement('div');
  toyCard.setAttribute('class', 'card');
  toyDiv.appendChild(toyCard);
  
  let toyName = document.createElement('h2');
  toyName.innerText = toy.name;
  toyCard.appendChild(toyName);
  
  let img = document.createElement('img');
  img.src = toy.image;
  img.setAttribute('class', 'toy-avatar');
  toyCard.appendChild(img);

  let p = document.createElement('p');
  p.textContent = `${toy.likes} Likes`
  toyCard.appendChild(p);
  
  let btn = document.createElement('button');
  btn.setAttribute('class', 'like-btn');
  btn.addEventListener('click', handleLikeToy);
  btn.innerText = 'Like';
  toyCard.appendChild(btn);
}

function handleNewToy() {
  let form = document.getElementsByClassName('add-toy-form')[0]
  form.addEventListener('submit', handleSubmit);
}

function handleSubmit(e){
  let newToy = {
    name: e.target["name"].value,
    image: e.target["image"].value,
    likes: 0
  }
  postToy(newToy);
}

function postToy(toy){
  fetch ('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => createToy(toy))
  .catch(error => console.log(error))
}

function handleLikeToy(e){
  let selectedToy = e.target.parentNode.childNodes[0];
  selectedToy.likes++;
  
}







fetchToys();
handleNewToy();