export interface ComputerNewDTO {
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	patrimonyId: string;
	ipAddress: string;
	hostName: string;
	motherBoardName: string;
	hasCdBurner: boolean;
	cabinetModel: string;
	operatingSystem: number;
	operatingSystemArchitecture: number;
	onTheDomain: string;
	processorId: number;
	sectorId: number;
	ramMemoriesId: number[];
	storageDevicesId: number[];
	computerUsersId: number[];
}