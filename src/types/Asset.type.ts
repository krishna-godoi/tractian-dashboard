export type AssetType = {
	id: string,
	name: string,
	parentId?: string | null,
	sensorId?: string | null,
	sensorType?: string | null,
	status?: string | null,
	gatewayId?: string | null,
	locationId?: string | null,
	children?: string[],
	type?: string,
}
