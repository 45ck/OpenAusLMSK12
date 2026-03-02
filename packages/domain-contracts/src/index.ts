export type PersonId = `person_${string}`;

export interface BasePersonRecord {
  id: PersonId;
  firstName: string;
  lastName: string;
}
