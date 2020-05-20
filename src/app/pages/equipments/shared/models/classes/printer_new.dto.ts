import { EquipmentNewDTO } from './equipment_new.dto';

export class PrinterNewDTO extends EquipmentNewDTO {
	ipAddress: string;
	hostName: string;
	sectorId: number;
}