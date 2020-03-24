export class EventCreateDto {
  name: string;
  type: string;
  location: string;
  about: string;
  date: Date;
  members: string[];
  creator: string;
}
