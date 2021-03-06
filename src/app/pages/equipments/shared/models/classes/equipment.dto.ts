export abstract class EquipmentDTO {
    id: string;
	createdDate: Date;
	lastModifiedDate: Date;
	equipmentType: string;
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	itComposed: boolean;
	patrimonyId: string;
	sectorName: string;
}
