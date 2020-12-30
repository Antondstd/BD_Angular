import {Person} from "./person.model";
import {Book} from "./book.model";

export class Lesson {
  id:number;
  name:String;
  teachers:Array<String> = [];
  books:Array<String> = [];
}
