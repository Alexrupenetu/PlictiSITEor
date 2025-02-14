const cards = document.getElementsByClassName('card');
let allImages = document.getElementsByClassName('card-image');
let movesDisplay = document.querySelector('.move-counter');
let toggledCardsArray = [];
let move = 0;
let winCount = 0;
const restart = document.getElementById('reset');


const imagesLinkArray = [

    {
        id:1,
        image:'../Assets/Elephant.png',
        newAlt:'elephant'
    },
    {
        id:2,
        image: '../Assets/Panda.jpg',
        newAlt: 'panda'
    },
    {
        id:3,
        image: '../Assets/Monkey.jpg',
        newAlt: 'monkey'
    },
    {
        id:4,
        image: '../Assets/Sheep.jpg',
        newAlt: 'sheep'
    },
    {
        id:5,
        image: '../Assets/Capybara.jpg',
        newAlt: 'capybara'
    },
    {
        id:6,
        image: '../Assets/Elephant.png',
        newAlt: 'elephant'
    },
    {
        id:7,
        image: '../Assets/Monkey.jpg',
        newAlt: 'monkey'
    },
    {
        id:8,
        image: '../Assets/Squirrel.jpg',
        newAlt: 'squirrel'
    },
    {
        id:9,
        image: '../Assets/Sheep.jpg',
        newAlt: 'sheep'
    },
    {
        id:10,
        image: '../Assets/Panda.jpg',
        newAlt: 'panda'
    },
    {
        id:11,
        image: '../Assets/Squirrel.jpg',
        newAlt: 'squirrel'
    },
    {
        id:12,
        image: '../Assets/Capybara.jpg',
        newAlt: 'capybara'
    }
]


const restartGame = () => {  //fiind o functie constanta, nu poate fi redefinita
    let toggledCard = 
        document.getElementsByClassName('card toggled');  //selecteaza toate elementele care au atat clasa CARD cat si TOGGLED si returneaza o colectie de elemente HTML
    imagesLinkArray.sort(() => Math.random() - 0.5); //sorteaza random array-ul, Math.random() genereaza valori intre ) si 1 si cand scadem 0.5 obtinem aleator pozitiv/negativ
    Object.values(toggledCard).forEach(function (el) { //cu functia values transf colectia de obiecte intr-un array care poate fi iterat si cu forEach aplicam pe fiecare element functia de eliminare toggled 
        setTimeout(() => {
            el.classList.remove("toggled");
        }, 0);
    })
    toggledCardsArray.length = 0;
    move = 0;
    winCount=0;
    movesDisplay.innerText = `Moves: ${move}`;
    let allImagesSrc = document.getElementsByClassName('card-image');
    Object.values(allImagesSrc).forEach((el, index)=>{ //actualizam valorile pt array-ul de carti 
        el.src = imagesLinkArray[index].image;
        el.alt = imagesLinkArray[index].newAlt;
        el.id = imagesLinkArray[index].id
    }) 
}
restart.addEventListener('click', restartGame);

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        this.classList.add("toggled");
        toggledCardsArray.push(this);
        let thisImgSrc = this.querySelector('.card-image').src;
        let previousImgSrc = 
        toggledCardsArray[toggledCardsArray.length - 2].querySelector('.card-image').src;
        if(thisImgSrc !== previousImgSrc) {
            toggledCardsArray.forEach(function (el) {
                setTimeout(() => {
                    el.classList.remove("toggled");
                }, 500);
            })
            toggledCardsArray.length = 0;
            move++;
        }
        else{
            toggledCardsArray.length = 0;
            move++;
            winCount++;
        }
        movesDisplay.innerText = `Moves: ${move}`;
        if(winCount===6){
            setTimeout(()=>{
                alert(`Congratulations!!! You won the game in ${move} moves.`)
            }, 300)
        }
    })
}
