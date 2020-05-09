export interface SectorNewDTO {
	name: string;
	itInternal: boolean;
	addressName: string;
	addressStreet: string;
	addressNumber: string;
	addressNeighborhood: string;
	addressComplement: string;
	addressCity: string;
	addressTelephone: string;
	equipmentsId: number[];
	computerUsersId: number[];
}