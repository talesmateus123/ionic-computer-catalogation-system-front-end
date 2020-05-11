import { EquipmentDTO } from './equipment.dto';

export class PrinterDTO extends EquipmentDTO {
	ipAddress: string;
	hostName: string;
}