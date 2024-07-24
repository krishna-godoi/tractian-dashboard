import { AssetType } from "./Asset.type";
import { LocationType } from "./Location.type";

export type TreeNodeType = AssetType & LocationType & {
	children?: string[],
	type?: string,
}

export type AssetMap = Record<string, TreeNodeType>;
