let formElement = document.querySelector('.form')
let nameInput =formElement.querySelector('#name');
let jobInput = formElement.querySelector('#about-self');

let pInName=document.querySelector('.profile-info__name');
let pInASelf=document.querySelector('.profile-info__about-self');

function formSubmitHandler (evt) {
    evt.preventDefault();

    pInName.textContent = nameInput.value;
    pInASelf.textContent = jobInput.value;
}


formElement.addEventListener('submit', formSubmitHandler);
