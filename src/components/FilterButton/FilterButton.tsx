import { useContext } from "react"
import { FiltersContext } from "../../context/FiltersContext"

const FilterButton = ({ id, label }: { id: string, label: string }) => {
	const { toggleFilter, filters } = useContext(FiltersContext)
	return <button onClick={() => toggleFilter(id)} className={`${id} ${filters.indexOf(id) >= 0 && 'active'}`}>{label}</button>
}

export default FilterButton;
