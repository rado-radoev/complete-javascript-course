'use strict';

const countriesBaseUrl = 'https://restcountries.com/v2';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}

const renderCountry = function(data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
}

///////////////////////////////////////

// const getCountryData = function(country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `${countriesBaseUrl}/name/${country}`)
//   request.send();

//   request.addEventListener('load', function() {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//       <img class="country__img" src="${data.flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//     </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// }



// const getCountryAndNeighbour = function(country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `${countriesBaseUrl}/name/${country}`)
//   request.send();

//   request.addEventListener('load', function() {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);

//      // Get neighbour contry
//     const neighbour = data.borders?.[0];

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `${countriesBaseUrl}/alpha/${neighbour}`)
//     request2.send();
//     request2.addEventListener('load', function() {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     })
//   });
// }

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// getCountryData('portugal')
// getCountryData('usa')
// getCountryData('bulgaria')
// getCountryData('japan')
// getCountryData('china')


// const request = new XMLHttpRequest();
// request.open('GET', `${countriesBaseUrl}/name/${country}`)
// request.send();

// const request = fetch(`${countriesBaseUrl}/name/portugal`);
// console.log(request)

// const getCountryData = function(country) {
//   const request = 
//     fetch(`${countriesBaseUrl}/name/${country}`)
//       .then(function(response) {
//         console.log(response);
//         return response.json();
//       })
//       .then(function(data) {
//         console.log(data);
//         renderCountry(data[0])
//       })
// }

const getJSON = function(url, error = 'Something went wrong') {
  return fetch(url)
      .then(response => { 
        
        if (!response.ok) {
          throw new Error(`${error} (${response.status})`)
        }
        
        return response.json()
      })
}

// const getCountryData = function(country) {
//   const request = 
//     fetch(`${countriesBaseUrl}/name/${country}`)
//       .then(response => { 
        
//         if (!response.ok) {
//           throw new Error(`Country not found (${response.status})`)
//         }
        
//         return response.json()
//       })
//       .then(data => {
//         renderCountry(data[0]);
//         const neighbour = data[0].borders?.[0];

//         if (!neighbour) return;

//         return fetch(`${countriesBaseUrl}/alpha/${neighbour}`)
//       })
//       .then(response => response.json())
//       .then(data => renderCountry(data, 'neighbour'))
//       .catch(err => {
//         console.error(`${err} 💥 💥 💥`)
//         renderError(`Something went wrong ${err.message}. Try again`)
//       })
//       .finally(() => {
//         countriesContainer.style.opacity = 1;
//       })
// }

const getCountryData = function(country) {
  const request = 
    getJSON(`${countriesBaseUrl}/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found');

      return getJSON(`${countriesBaseUrl}/alpha/${neighbour}`, 'Country not found')
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥 💥 💥`)
      renderError(`Something went wrong ${err.message}. Try again`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
}

btn.addEventListener('click', function() {
  getCountryData('portugal')
})

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');
