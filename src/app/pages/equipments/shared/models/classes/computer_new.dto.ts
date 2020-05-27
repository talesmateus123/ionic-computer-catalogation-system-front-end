import { EquipmentNewDTO } from './equipment_new.dto';

export class ComputerNewDTO extends EquipmentNewDTO {
	ipAddress: string;
	hostName: string;
	motherBoardName: string;
	hasCdBurner: boolean;
	cabinetModel: string;
	operatingSystem: string;
	operatingSystemArchitecture: string;
	onTheDomain: boolean;
	processorId: number;
	monitorId: number;
	sectorId: number;
	ramMemoriesId: number[];
	storageDevicesId: number[];
	computerUsersId: number[];
}