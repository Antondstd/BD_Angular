import {Book} from "./book.model";
import {Potion} from "./potion.model";

export class Spell {
  id:number;
  name:String;
  // book: Book;
  // potions: Potion[] = [];
  book: String;
  potions: Array<String> = [];
  difficulty:number;
}
