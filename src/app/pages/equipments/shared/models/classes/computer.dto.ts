import { EquipmentDTO } from './equipment.dto';

export class ComputerDTO extends EquipmentDTO {
	ipAddress: string;
	hostName: string;
	online: boolean;
	motherBoardName: string;
	hasCdBurner: boolean;
	cabinetModel: string;
	operatingSystem: string;
	operatingSystemArchitecture: string;
	computerType: string;
	onTheDomain: boolean;
	personalComputer: boolean;
	monitor: any;
	processor: any;
	ramMemories: any[];
	storageDevices: any[];
	computerUsers: any[];
	totalRamMemory: number;
	totalStorageMemory: number;	
}