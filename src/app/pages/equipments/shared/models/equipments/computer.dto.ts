import { EquipmentDTO } from './equipment.dto';

export class ComputerDTO extends EquipmentDTO {
	ipAddress: string;
	hostName: string;
	motherBoardName: string;
	hasCdBurner: boolean;
	cabinetModel: string;
	operatingSystem: number;
	operatingSystemArchitecture: number;
	onTheDomain: boolean;
	monitor: any;
	processor: any;
	ramMemories: any[];
	storageDevices: any[];
	computerUsers: any[];
	totalRamMemory: number;
	totalStorageMemory: number;	
}