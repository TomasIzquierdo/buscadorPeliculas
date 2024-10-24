import { useState } from "react"

export const BuscadorPeliculas = () =>
{
    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const apiKey = '837651653b9a0760a6a6c715a7d5110b'
    const [buscador,setBuscador] = useState('')
    const [peliculas,setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBuscador(e.target.value)
    }

    const handleSubmit = (e)=>
    {
        e.preventDefault()
        fetchPeliculas()
    }

    const fetchPeliculas= async () => {     
        try {
            const response = await fetch(`${urlBase}?query=${buscador}&api_key=${apiKey}`)
            const data = await response.json()

            console.log(data)
            setPeliculas(data.results)

        } catch (error) {
            
            console.log(error)
            
        }
    } 

    return (


        <>
        <div className="container"><h1 className="tittle">Buscador de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={buscador} onChange={handleInputChange} placeholder="Escribí una película" />
                <button type="Submit" className="search-button">Buscar</button>
            </form>
        </div>
        <div className="movie-list">
        {peliculas.map((pelicula)=>
        (
            <div key={pelicula.id} className="movie-card">
            <h1 className={pelicula.title}></h1>
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
            <p>{pelicula.overview}</p>  
            </div>
        )
        ) }
        </div>
        </>
    )
}