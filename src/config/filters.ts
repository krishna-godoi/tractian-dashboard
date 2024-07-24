import { TreeNodeType } from "../types/TreeNode.type";

export const AVAIL_FILTERS: Record<string, (e: TreeNodeType, val?: string) => boolean> = {
	energy: (e) => e.sensorType === 'energy',
	critical: (e) => e.status === 'alert',
	search: (e, val) => !!val ? e.name.toLowerCase().indexOf(val.toLowerCase()) >= 0 : true,
}
