//! ******* all imports ******* //
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import countryDesc from './templates/countryDesc.hbs';
import countriesList from './templates/countriesList.hbs';
import { fetchCountries } from './js/fetchCountries.js';
import './css/styles.css';


//! ******* all global variables ******* //
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listOfCountries = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


//** start of coding */
inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
function onInputChange(e) {
    e.preventDefault();
    const searchName = inputEl.value.trim();

    if (searchName === '') {
        listOfCountries.innerHTML = '';
        return;
    }    
    fetchCountries(searchName).then(result => {
        checkResult(result)}).catch((err) => {
        console.log(err);
            Notify.failure('Oops, there is no country with that name');
    })

 };

function checkResult(result) {
    if (result.length > 10) {
        listOfCountries.innerHTML = '';
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    } else if (result.length === 1) {
        result[0].languages = [...Object.values(result[0].languages)];
        result[0].capital = result[0].capital[0].join('');


        console.log(result[0]);

        countryInfo.innerHTML = countryDesc({name, capital, population, languages}=result[0]);
        listOfCountries.innerHTML = '';
    } else {
        listOfCountries.innerHTML = countriesList(result);
        countryInfo.innerHTML = '';
    }
 };

