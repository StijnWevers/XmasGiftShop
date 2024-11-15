// 3 kids get christmas presents,  a tv, a shirt and socks, the presents are shown with + and - buttons which indicate how many presents they get. the results will be saved in the localstorage.

const url = 'http://localhost:3000/posts'; //geen server

const kids = ['kid1', 'kid2', 'kid3'];
let currentkid = getElementById('currentkid');
let save = document.getElementById('save');
let index = 0;
let resultaat = document.getElementById('resultaat');


const presents = [
    { name: 'tv', quantity: 0},
    { name:'shirt', quantity: 0},
    { name:'sock', quantity: 0}
]

function updateOutput(){
    resultaat.innerHTML = '';
}

const add = document.getElementById('button');
add.onclick = () => {
    if (index == 0) {
        presents[0].quantity +=1;
    }
    else if (index == 1) {
        presents[1].quantity += 1;
    }
    else if (index == 2) {
        presents[2].quantity += 1;
    }
    updateOutput();
}

const subtract = document.getElementById('button');
subtract.onclick = () => { 
    if (index == 0) {
        presents[0].quantity -= 1;
    }
    else if (index == 1) {
        presents[1].quantity -= 1;
    }
    else if (index == 2) {
        presents[2].quantity -= 1;
    }
    updateOutput();
}

//de save knop moet aangepast worden 

function saveData() {
    if (currentkid < kids.length) {
        resultaat.innerHTML = `<p>${presents[1].quantity} tv's, ${presents[2].quantity} t-shirts, and ${presents[3].quantity} zokken for ${kids[currentkid]}</p> `
        currentkid++;
        //werkt niet
    }
    
}





