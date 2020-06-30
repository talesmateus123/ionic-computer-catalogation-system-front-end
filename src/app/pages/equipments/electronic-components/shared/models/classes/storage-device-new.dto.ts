export interface StorageDeviceNewDTO {
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	sizeInGB: number;
	architecture: string;
	type: string;
	computerId: number;
}