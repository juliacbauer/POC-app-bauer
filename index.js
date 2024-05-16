document.getElementById('movieSearch').onsubmit = async function (e) {
    e.preventDefault()
    const searchQuery = document.getElementById('query').value.trim()
    //testing rebuild
    const res = await fetch(`https://www.omdbapi.com/?apikey=6c6b5196&s=${searchQuery}`)
    const data = await res.json()
    console.log(data)
    if (data.Response === "True") {
        searchResults(data.Search)
        document.getElementById('query').value = ""
    } else {
        noMovies()
        document.getElementById('query').value = ""
    }
}

async function searchResults(movies) {
    const movieMore = document.getElementById('movieInfo')
    movieMore.innerHTML = ""
    movies.forEach(async (movie) => {
        const movieMoreResults = await fetch(`https://www.omdbapi.com/?apikey=6c6b5196&i=${movie.imdbID}`)
        const movieMoreInfo = await movieMoreResults.json()
        console.log(movieMoreInfo)
        movieMore.innerHTML +=
            `   <br>
                <h2>${movie.Title}</h2>
                <img src="${movie.Poster}">
                <p>${movie.Year}</p>
                <p>IMDB Score: ${movieMoreInfo.Ratings[0].Value ? movieMoreInfo.Ratings[0].Value : 'No IMDB score available.'}</p>
                <p style="text-transform: capitalize">${movie.Type}</p>
                <p>Genre: ${movieMoreInfo.Genre}</p>
                <p>Featuring ${movieMoreInfo.Actors}</p>
                <p>Plot Summary: ${movieMoreInfo.Plot}</p>
                <p>Awards: ${movieMoreInfo.Awards}</p>
                <br>    `
    })
}

function noMovies() {
    const movieResult = document.getElementById('movieInfo')
    movieResult.innerHTML = `<p>No movies or shows found.</p>`
}