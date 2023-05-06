import { Image, Li, P, TitleMovie, Ul } from "../styles/searchmovie"

// eslint-disable-next-line react/prop-types
function ListOfMovies({ movies }) {
  return (
    <Ul>
      {
        // eslint-disable-next-line react/prop-types
        movies.map(movie => (
          <Li className='movie' key={movie.id}>
            <TitleMovie>{movie.title}</TitleMovie>
            <P>{movie.year}</P>
            <Image src={movie.image} alt={movie.title} />
          </Li>
        ))
      }
    </Ul>
  )
}

function NoMoviesResults() {
  return (
    <P>No se encontraron películas para esta búsqueda</P>
  )
}

// eslint-disable-next-line react/prop-types
export function Movies({ movies }) {
  // eslint-disable-next-line react/prop-types
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}