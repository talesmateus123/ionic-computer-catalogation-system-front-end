export interface StorageDeviceDTO {
    id: string;
	createdDate: Date;
	lastModifiedDate: Date;
	equipmentType: number;
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	itComposed: boolean;
	sizeInMB: number;
	architecture: number;
	type: number;
	
}