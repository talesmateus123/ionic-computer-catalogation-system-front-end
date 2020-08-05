import { EquipmentNewDTO } from './equipment_new.dto';

export class NetworkDeviceNewDTO extends EquipmentNewDTO {
	ipAddress?: string;
	macAddress?: string;
	hostName?: string;
	sectorId?: number;
}