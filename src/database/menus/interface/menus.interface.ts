export interface Meal {
    type: number;
    recipe: string; 
  }
  
  export interface MenusI {
    id: string;
    user: string;
    meals: {
      sunday?: Meal[];
      monday?: Meal[];
      tuesday?: Meal[];
      wednesday?: Meal[];
      thursday?: Meal[];
      friday?: Meal[];
      saturday?: Meal[];
    };
  }
  