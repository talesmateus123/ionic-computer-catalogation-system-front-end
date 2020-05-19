export interface StorageDeviceNewDTO {
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	sizeInMB: number;
	architecture: string;
	type: string;
	computerId: number;
}