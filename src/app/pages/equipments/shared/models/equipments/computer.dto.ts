import { EquipmentDTO } from './equipment.dto';

export class ComputerDTO extends EquipmentDTO {
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