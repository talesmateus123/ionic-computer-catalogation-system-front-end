import { EquipmentDTO } from './equipment.dto';

export class PrinterNewDTO extends EquipmentDTO {
	ipAddress: string;
	hostName: string;
	sectorId: number;
}