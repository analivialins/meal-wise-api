export class MenusI {
    id: string;
    user: string;
    meals: {
        sunday: { type: number; recipe: string };
        monday: { type: number; recipe: string };
        tuesday: { type: number; recipe: string };
        wednesday: { type: number; recipe: string };
        thursday: { type: number; recipe: string };
        friday: { type: number; recipe: string };
        saturday: { type: number; recipe: string };
    };
}
