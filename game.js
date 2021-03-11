

//https://api.worldbank.org/v2/country/
let playAgainButton = document.querySelector('#play-again-button')
let userAnswerElement = document.querySelector("#user-answer")  // Needed to be placed outside of the function() for the playAgain, aka "clear" button to work
let resultTextElement = document.querySelector('#result')       // Needed to be placed outside of the function() for the playAgain, aka "clear" button to work

function countryGame() {
    let randomCountryElement = document.querySelector('#random-country')

    let submitButton = document.querySelector("#submit-answer")
    

    

    let randomNumber = Math.floor(Math.random() * countriesAndCodes.length)
    console.log(randomNumber)

    let maxFailedAttempts = 3                                    // Attempt count for failed connection
    city(maxFailedAttempts)                       //  Initial call function one time to start

    countriesAndCodes[randomNumber]                    // Selects country in random--square brackets= index of array
    console.log(countriesAndCodes[randomNumber])  

    let randomCountryObject = countriesAndCodes[randomNumber] 

    // TODO finish the script to challenge the user about their knowledge of capital cities.
    // An array of country codes is provided in the countries.js file.
    randomCountryElement.innerHTML = randomCountryObject.name            // Replaces "Country Placeholder" with random number dictionary selected chosen from the array in countries.js

    let countryAbb = randomCountryObject['alpha-2']
    let url = `https://api.worldbank.org/v2/country/${countryAbb}?format=json`
    // Your browser treats all JavaScript files as one big file, o
    // organized in the order of the script tags so the countriesAndCodes array is available to this script.

    console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 

    document.addEventListener('keyup', function() {
        if (event.keyCode == 13) {
            submitButton.click()               // Allows user to use the 'Enter' key to Add to list
        }
    })
    // TODO add a click event handler to the submitButton.  When the user clicks the button,
    //  * read the text from the userAnswerElement 
    //  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
    function city(attempts) {
        if (attempts <= 0) {
            alert('Failed to contact World Bank server after several attempts')
            return
        }
        
    }

    fetch(url).then( (res) => {
        return res.json()
    }).then( (countryData) => {
        //console.log(countryData)

        
        let city = countryData[1][0].capitalCity
        console.log(city)
        //resultTextElement.innerHTML = city
        submitButton.addEventListener('click', function() {
            //alert('The button was clicked for submission')
            
            if (userAnswerElement.value === city) {
                resultTextElement.innerHTML = "Correct"
            } else {
                resultTextElement.innerHTML = `Incorrect. The Correct City is ${city}`
            }
        
            //if (answer)

        })
        
    }).catch( (err) => {
        console.log('ERROR!', err)
        alert(err)
    })
}
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"




// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice.


playAgainButton.addEventListener('click', function() {
    //alert('The button was clicked to play again')
    userAnswerElement.value = ''
    resultTextElement.innerHTML = ''
    countryGame()
})
countryGame()

