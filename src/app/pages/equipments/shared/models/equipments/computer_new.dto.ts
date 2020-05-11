import { EquipmentNewDTO } from './equipment_new.dto';

export class ComputerNewDTO extends EquipmentNewDTO {
	ipAddress: string;
	hostName: string;
	motherBoardName: string;
	hasCdBurner: boolean;
	cabinetModel: string;
	operatingSystem: number;
	operatingSystemArchitecture: number;
	onTheDomain: boolean;
	processorId: number;
	sectorId: number;
	ramMemoriesId: number[];
	storageDevicesId: number[];
	computerUsersId: number[];
}