import { AVAIL_FILTERS } from "../config/filters";
import { AssetMap, TreeNodeType } from "../types/TreeNode.type";

export function applyNewFilters(map: AssetMap, filters: string[], val?: string) {
	const filtered = getFilterMatches(map, filters, val)

	const currTargets = document.querySelectorAll('.target');
	const domNodes = filtered.map((id) => document?.getElementById(id));
	const filterRoot = document.getElementById('filter-root');

	currTargets.forEach(e => e.classList.remove('target'))
	domNodes.forEach((node) => {
		node?.classList.add("target")
	})

	if (filters.length) {
		filterRoot?.classList.add('filtered')
	} else {
		filterRoot?.classList.remove('filtered')
	}
}

function getFilterMatches(map: AssetMap, filters: string[], val?: string): string[] {
	let filtered: string[] = [];
	Object.values(map).forEach((e) => {
		if (doesMatchFilter(e, filters, val)) {
			filtered.push(e.id)
		}
	});

	return filtered
}

function doesMatchFilter(elem: TreeNodeType, filters: string[], val?: string) {
	return filters.every((f) => AVAIL_FILTERS[f](elem, val));
}
