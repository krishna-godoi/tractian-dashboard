import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { applyNewFilters } from "../utils/filters";
import { AssetsContext } from "./AssetsContext";

export const FiltersContext = createContext<{
	filters: string[],
	search: string,
	toggleFilter: (filter: string) => void,
	searchFilter: (e: any) => void,
}>({
	filters: [],
	search: "",
	toggleFilter: () => { },
	searchFilter: () => { },
})

const FiltersProvider = ({ children }: PropsWithChildren) => {
	const { assetMap } = useContext(AssetsContext)
	const [filters, setFilters] = useState<string[]>([])
	const [search, setSearch] = useState("")

	useEffect(() => {
		if (!search) {
			setFilters((currFilters) => currFilters.filter((f) => f !== 'search'))
		} else {
			setFilters((currFilters) => ([...currFilters, 'search']));
		}
	}, [search])

	useEffect(() => {
		applyNewFilters(assetMap, filters, search);
	}, [filters, assetMap])

	const toggleFilter = (filter: string) => {
		const isApplied = filters.indexOf(filter) >= 0;

		if (isApplied) {
			setFilters((currFilters) => currFilters.filter((f) => f !== filter))
		} else {
			setFilters((currFilters) => ([...currFilters, filter]));
		}
	}

	const searchFilter = (e: any) => {
		setSearch(e.target.value)
	}

	const value = useMemo(() => ({
		filters,
		search,
		searchFilter,
		toggleFilter
	}), [filters, search])

	return (
		<FiltersContext.Provider value={value}>
			{children}
		</FiltersContext.Provider>
	)
}

export default FiltersProvider;
