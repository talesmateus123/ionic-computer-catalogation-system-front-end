export abstract class EquipmentDTO {
    id: number;
	createdDate: Date;
	lastModifiedDate: Date;
	equipmentType: number;
	manufacturer: string;
	model: string;
	description: string;
	itWorks: boolean;
	itComposed: boolean;
	patrimonyId: string;
}