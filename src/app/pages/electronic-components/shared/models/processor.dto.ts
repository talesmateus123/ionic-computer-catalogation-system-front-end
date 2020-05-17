export interface ProcessorDTO {
    id: string;
	createdDate: Date;
	lastModifiedDate: Date;
	equipmentType: number;
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	itComposed: boolean;
	processorName: string;
	architecture: number;
}