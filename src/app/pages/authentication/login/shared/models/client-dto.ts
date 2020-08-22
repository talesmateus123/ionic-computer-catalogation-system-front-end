export class ClientDTO {
    id: string;
    email: string;
    name: string;
    hasAdminProfile?: boolean = false;
    hasClientProfile?: boolean = false;
}
