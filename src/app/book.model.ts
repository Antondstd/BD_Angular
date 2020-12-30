import {Person} from "./person.model";

export class Book {
  name:String;
  pageCount:number;
  condition:number;
  authors:Array<String> = [];
  lesson:String;
}
