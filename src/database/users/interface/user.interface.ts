import { InformationI } from "./informations.interface";

export class UserI {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    informations: InformationI;
}
  