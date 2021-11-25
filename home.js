const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=95f8742efabd7ac4a603dea27f261aec";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=95f8742efabd7ac4a603dea27f261aec&query="
const IMGAPI = "https://image.tmdb.org/t/p/w300";

const list = document.getElementById("list");
const input = document.getElementById("input");
const form = document.getElementById("form");
const searchBtn = document.getElementById("search-btn");

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    list.innerHTML = ""    
    console.log(respData);

    
    if (respData.total_results === 0) {
      const h2 = document.createElement("h2");
      h2.innerHTML = `
      <pre>Sorry 😢,</pre>
      No Movies with 
      <pre>"${input.value}"</pre>
      were found.`;
      list.appendChild(h2)
    };
    respData.results.forEach(movie => {
      if (movie.poster_path) {
        const movieCard = document.createElement("li"); 
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
        <img
          src="${IMGAPI + movie.poster_path}"
          alt="movie pic" />
         <div class="movie-info">
           <h3>
             ${movie.original_title}
           </h3>
           <span>
             ${movie.vote_average} <i class="fas fa-star"> </i>
           </span>
           <div class="overview">
             <h4>Overview :</h4>
             <br/>
             <p>${movie.overview}</p>
           </div>
         </div>`;
         list.appendChild(movieCard); 
      } 
    });
    
    input.value = "";
};


form.addEventListener("submit",(e) => {
    e.preventDefault();
    let search = input.value;
    if (search) {   
    getMovies(SEARCHAPI + search);
    };
});

searchBtn.addEventListener("click",() => {
    let search = input.value;
    if (search) {   
    getMovies(SEARCHAPI + search);
    };
});