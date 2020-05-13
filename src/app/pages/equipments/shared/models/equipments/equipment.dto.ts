import { SectorDTO } from 'src/app/models/sector.dto';

export abstract class EquipmentDTO {
    id: number;
	createdDate: Date;
	lastModifiedDate: Date;
	equipmentType: string;
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	itComposed: boolean;
	patrimonyId: string;
	sector: any;
}
