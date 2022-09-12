

/* ======================
Tamagotchi
=========================*/

// 1. Make a Modal
// - Make a modal that provide information about the game
// - The modal should appear when the page loads and have a button on it that begins the game
// - When the user clicks start game the modal should disappear and the Tamagotchi should appear

// 2. Make a Carousel
// - Allow the user to choose a background from a carousel of images
// - When the user selects that image, apply it to the background of the page

// 3. Make a Tamagotchi Class
// - The Tamagotchi should have the following properties: name, hunger, sleepiness, boredom, age
// - The Tamagotchi should have the following methods: eat, sleep, play
// - Your pet should morph to a teenager at 5 years old and an adult at 10 years old
// - Your pet should die if hunger, boredom or sleepiness hits 10
// - Your Tamagotchi should append itself to the dom

/* ======================
CACHED DOM NOTES
=========================*/
const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const carousel = document.querySelector('.carousel');
const getStarted = document.querySelector('.get-started');
const TamagotchiHome = document.querySelector('#Tamagotchi-home');
const carouselImg = document.querySelector('.carousel img');
const next = document.querySelector('.carousel .next');
const previous = document.querySelector('.carousel .previous');
const select = document.querySelector('.carousel .select');
const feed = document.querySelector('.feed');


/* ======================
CREATE Tamagotchi
=========================*/
class Tamagotchi {
     constructor(name, hunger = 10, sleepiness, boredom, age = 0) {
          this.name = name;
          this.hunger = hunger;
          this.sleepiness = sleepiness;
          this.boredom = boredom;
          this.age = age;
          this.image = {
               baby: "https://static.wikia.nocookie.net/tamagotchi/images/7/7d/Mameotchi.png/revision/latest/scale-to-width-down/340?cb=20151016041512",
               teen: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/95681a1d-01a3-4875-8ceb-c0885d496e65/db87zwb-365b1c8d-f802-4b2b-bbb8-dbce115c67a3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOTU2ODFhMWQtMDFhMy00ODc1LThjZWItYzA4ODVkNDk2ZTY1XC9kYjg3endiLTM2NWIxYzhkLWY4MDItNGIyYi1iYmI4LWRiY2UxMTVjNjdhMy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.TVQgeqPKJtXLNOSHpy-ZS-e4MtrGG-7nWvdPUEkCTrg",
               adult: "https://i.pinimg.com/originals/30/5e/35/305e35d941a7eed4463d068426c16666.png"
          }
     }

     checkStats() {
          if (this.age === 1) this.updateImage("baby");
          if (this.age === 3) this.updateImage("teen");
          if (this.age === 5) this.updateImage("adult");
     }

     feed() {
          this.hunger--;
          this.checkStats();
          this.updateStatsOnDom();
     }

     birth() {
          const div = document.createElement('div');
          div.innerHTML = `
            <div class='general-container'>
                <div class='shadow'></div>
                <div class='egg'>
                    <div class='spots'></div>
                </div>
            </div>
        `
          return div;
     }

     updateImage(age) {
          const container = document.querySelector('.general-container');
          container.innerHTML = `<img src="${this.image[age]}"/>`;
     }

     updateStatsOnDom() {
          const container = document.querySelector('.life-stats');
          container.innerHTML = `
            <div class="hunger btn">
                Hunger: <span>${this.hunger}</span>
            </div>
            <div class="age btn">
                Age: <span>${this.age}</span>
            </div>
        `
          this.checkStats();
     }

     startCounters() {
          setInterval(() => {
               this.age++;
               this.updateStatsOnDom();
          }, 5000);
     }

     appendToDom(container) {
          const domNode = this.birth();
          this.updateStatsOnDom();
          this.startCounters();
          container.appendChild(domNode);
     }
}

const firstPet = new Tamagotchi('tom');


/* ======================
GLOBAL VARS
=========================*/

const backgroundImage = [

     "images/pink.jpg",
     "images/blue.jpg",
     "images/green.jpg",
]

let currentSlide = 0;

/* =============================
FUNCTIONS
============================= */
const toggleModal = () => modal.classList.toggle('open');

const changeSlide = (direction) => {
     if (direction === "next") {
          if (currentSlide < backgroundImage.length - 1) {
               currentSlide++
          } else {
               currentSlide = 0;
          }
     }
     else if (direction === "previous") {
          if (currentSlide > 0) {
               currentSlide--
          } else {
               currentSlide = backgroundImage.length - 1;
          }
     }
     carouselImg.setAttribute("src", backgroundImage[currentSlide]);
}

const openCarousel = () => {
     carousel.classList.add('open');
     carouselImg.setAttribute("src", backgroundImage[currentSlide]);
     toggleModal();
}

const selectBackground = () => {
     carousel.classList.remove('open');
     body.style.backgroundImage = `url(${backgroundImage[currentSlide]})`;
     birth();
}

// Tamagotchi LIFE
const birth = () => {
     firstPet.appendToDom(TamagotchiHome);
}

const feedPet = () => firstPet.feed();

const startGame = () => {
     toggleModal();
}

/* =============================
EVENT LISTENERS
============================= */
// modalButton.addEventListener('click', toggleModal);
getStarted.addEventListener('click', openCarousel);
next.addEventListener('click', () => changeSlide("next"));
previous.addEventListener('click', () => changeSlide("previous"));
select.addEventListener('click', selectBackground);
feed.addEventListener('click', feedPet);

window.onload = () => {
     startGame();
}