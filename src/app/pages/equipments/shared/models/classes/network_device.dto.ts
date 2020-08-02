import { EquipmentDTO } from './equipment.dto';

export class NetworkDeviceDTO extends EquipmentDTO {
	ipAddress: string;
	hostName: string;
	online: boolean;
}
