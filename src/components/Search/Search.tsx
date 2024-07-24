import { useContext } from "react"
import { FiltersContext } from "../../context/FiltersContext"
import './Search.style.css'

const Search = () => {
	const { searchFilter } = useContext(FiltersContext);
	return <input type='text' onChange={searchFilter} placeholder='Buscar Ativo ou Local' />
}

export default Search;
