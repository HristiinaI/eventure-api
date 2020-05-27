import { ICard } from "src/schemas/card.shema";

export class BoardCreateDto {
    name: string;
    eventId: string;
    cards: ICard[];
}
  