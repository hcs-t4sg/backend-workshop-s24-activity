// Type definitions for all Firestore collections

export interface Profile {
  user_id: string;
  display_name: string;
  biography: string;
}

export interface Pet {
  name: string;
  age: number;
  isAlive: boolean;
}
export interface PetWithId extends Pet {
  id: string;
}
