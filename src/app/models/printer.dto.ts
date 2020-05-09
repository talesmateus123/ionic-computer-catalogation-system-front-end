export interface PrinterDTO {
    id: string;
	createdDate: Date;
	lastModifiedDate: Date;
	equipmentType: number;
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	itComposed: boolean;
	patrimonyId: string;
	ipAddress: string;
	hostName: string;
}