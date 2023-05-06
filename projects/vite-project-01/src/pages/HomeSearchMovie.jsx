import '../styles/home.css'
import { useMovies } from '../hooks/useMovies.js'
import { Movies } from '../components/Movies.jsx'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { Button, CheckBox, Container, Form, Header, Input, Main, SubContainer, Title } from '../styles/searchmovie'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function HomeSearchMovie() {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <Container>
      <SubContainer>
        <Header>
          <Title>Buscador de películas</Title>
          <Form onSubmit={handleSubmit}>
            <Input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'
            />
            <CheckBox type='checkbox' onChange={handleSort} checked={sort} />
            <Button type='submit'>Buscar</Button>
          </Form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Header>
        <Main>
          {
            loading ? <p>Cargando...</p> : <Movies movies={movies} />
          }
        </Main>
      </SubContainer>
    </Container>
  )
}

export default HomeSearchMovie