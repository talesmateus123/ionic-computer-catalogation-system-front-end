export interface ComputerDTO {
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
	motherBoardName: string;
	hasCdBurner: boolean;
	cabinetModel: string;
	operatingSystem: number;
	operatingSystemArchitecture: number;
	onTheDomain: string;
	totalRamMemory: number;
	totalStorageMemory: number;
}