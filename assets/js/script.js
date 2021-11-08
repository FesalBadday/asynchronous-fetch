"use strict"

// luxon date Time
const DateTime = luxon.DateTime

// randomCards variable
const randomCards = document.querySelector(".cardsBtn")
// errorMsg variable
const errorMsg = document.querySelector('.error')

// fetch data and return it into json
const fetchCards = async () => {
  try {
    let response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle')
    let data = null

    // check if response is ok
    if (!response.ok) {
      // if not throw an error
      throw new Error('Not 200 OK');
    } else {
      data = await response.json() // return json file with id
    }

    // load the cards
    response = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`)

    // check if response is ok
    if (!response.ok) {
      // if not throw an error
      throw new Error('Not 200 OK');
    } else {
      data = await response.json() // return json file with array of 52 cards
    }

    const cardsSection = document.querySelector(".cards")

    // output variable
    let output = ''

    // for loop to build the cards
    for (let i = 0; i <= 3; i++) {
      output += `
        <figure>
          <a href='${data.cards[i].images.svg}' target='_blank'>
            <img src='${data.cards[i].image}' alt='${data.cards[i].code} - ${data.cards[i].suit}'>
          </a>
          <figcaption>        
          ${data.cards[i].value}
          -
          ${data.cards[i].suit}
          </figcaption>
        </figure>`
    }

    // print output and date
    cardsSection.innerHTML = `
      <fieldset>
        <legend>
        Current Time 
        ${DateTime.now().toFormat('MMM dd, yyyy - t')}
        </legend>
        ${output}
      </fieldset>`

    // rename button
    randomCards.textContent = 'Shuffle Cards'

  } catch (err) { // catch errors
    // rename button
    randomCards.textContent = 'Try Again'
    console.log('Caught an error!', err)
    // print error message
    errorMsg.innerHTML =
      `An error occurred while loading cards. Please try again later.
      <img src="assets/images/pixeltrue-error.svg" alt="pixeltrue-error">`
  }
}

// call fetchCards function
randomCards.addEventListener("click", fetchCards)