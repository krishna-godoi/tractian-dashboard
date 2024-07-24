import { AssetMap, TreeNodeType } from "../types/TreeNode.type";

export const buildMap = (elem: TreeNodeType, map: AssetMap) => {
	const { id, parentId, locationId } = elem;
	const parent = parentId || locationId;

	if (map[id]) {
		elem.children = map[id].children;
	}
	map[id] = elem

	if (parent && map[parent]) {
		map[parent].children = [
			...(map[parent].children || []),
			id
		]
	} else if (parent) {
		map[parent] = {
			id: "",
			name: "",
			parentId: null,
			children: [id]
		}
	}
}
