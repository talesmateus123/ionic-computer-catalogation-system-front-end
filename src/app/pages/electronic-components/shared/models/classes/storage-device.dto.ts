export interface StorageDeviceDTO {
    id: string;
	createdDate: Date;
	lastModifiedDate: Date;
	equipmentType: number;
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	sizeInGB: number;
	architecture: number;
	type: number;
	
}