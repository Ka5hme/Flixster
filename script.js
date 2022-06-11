apikey = "8df2629dd9106fe727b719f07338f446"
let page = 1;
let currentSearchTerm = '';
var posterSize = "w500"
let searchType = "movie/now_playing"

let searchId = document.querySelector("#search");
let inputId = document.querySelector("#input")
let currentlyPlayingId = document.querySelector("#currently-playing");
let moreButtonId = document.querySelector("#moreButton");
let moviesId = document.querySelector("#movies");

//searchId.addEventListener('submit', handleFormSumbit)
moreButtonId.addEventListener('click', loadMore)
currentlyPlayingId.addEventListener('click', currentMovies)
searchId.addEventListener('submit', searchMovie)
searchId.addEventListener('submit', () => {
    if (moreButtonId.style.display === 'none') {
        moreButtonId.style.display = 'block'
      } else {
        moreButtonId.style.display = 'none'
      }
} )

onload = currentMovies()

async function currentMovies(){
    //console.log("enter")
    const res1 = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key="+apikey+"&language=en-US&page="+page);
                              
    //console.log("In_currentMovies")
    const response1 = await res1.json();  

    responseDisplay = response1.results;
    
    displayResults(responseDisplay)

}

async function searchMovie(searchterm){
    searchterm.preventDefault();
    moviesId.innerHTML=``

    chosenTerm = inputId.value
    console.log(chosenTerm)
    searchType="search/movie"
    const res = await fetch("https://api.themoviedb.org/3/"+searchType+"?api_key="+apikey+"&query="+chosenTerm+"&page="+page);
    //console.log("In_searchMovie")
    response = await res.json();    
    chosen = response.results;
    displayResults(chosen)
}

// async function searchMovie(searchterm){
//     const res = await fetch("https://api.themoviedb.org/3/search/movie?api_key="+apikey+"&query="+searchterm);
//     //console.log("In_searchMovie")
//     const response = await res.json();    
//     currentSearchTerm = searchterm
//     //console.log(currentSearchTerm)
//     return response.results;

// }

// async function moreResults(){
//     const res = await fetch("https://api.themoviedb.org/3/"+searchType+"?api_key="+apikey+"&query="+currentSearchTerm+"&page="+page);
                             

//     const response = await res.json();    

//     displayResults(response.results)
// }

function displayResults(chosen){
    //console.log("Display results",response)
    for(let i = 0; i<chosen.length; i++){
       // console.log(response[i].poster_path)
    moviesId.innerHTML += `
    <fiv class="info"> 
        <img src="http://image.tmdb.org/t/p/${posterSize}${chosen[i].poster_path}" alt="${chosen[i].title}"width="300" height="400">
        </div>
        <div class ="text">
            <h3 id="movie-title">${chosen[i].title}</h3>
            <h4 = id="vote"> ${chosen[i].vote_average} </h4>
        </div>
    `;
    }
};

// function displayResults(response){
//         //console.log("Display results",response)
//         for(let i = 0; i<response.length; i++){
//            // console.log(response[i].poster_path)
//         moviesId.innerHTML += `
//         <div class="info"> 
//             <img src="http://image.tmdb.org/t/p/${posterSize}${response[i].poster_path}" alt="${response[i].title}"width="300" height="400">
//             </div>
//             <div class ="text">
//                 <h3 id="movie-title">${response[i].title}</h3>
//                 <h4 = id="vote"> ${response[i].vote_average} </h4>
//             </div>
//         `;
//         }
// };
  
// async function handleFormSumbit(event){
//     event.preventDefault();
//     moviesId.innerHTML = ``;

//     currentSearchTerm = inputId.value;
    
//     const finish = await searchMovie(currentSearchTerm);
//     displayResults(finish)
// }

// function loadMore(event){
//     event.preventDefault();
    
//     page += 1;
//     //console.log(123)
//     //searchType="search/movie"
//     moreResults();
// }

function loadMore(){
    
    
    page += 1;
    //console.log(123)
    //searchType="search/movie"
    currentMovies();
}