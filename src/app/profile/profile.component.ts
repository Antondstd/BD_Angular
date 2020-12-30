import { Component, OnInit } from '@angular/core';
import {Spell} from "../spell.model";
import {Book} from "../book.model";
import {Potion} from "../potion.model";
import {Tournament} from "../tournament.model";
import {Person} from "../person.model";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeBlock: number = 1;
  personStatus:String;
  person:Person = new Person();
  spells:Array<Spell> = [];
  books:Array<Book> = [];
  tournaments:Array<Tournament> = [];
  private routeSubscription: Subscription;

  constructor(private http : HttpClient,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params=>this.person.id=params['id']);
    this.getPerson();
    this.getBooks();
    this.getSpell();
    this.getTournaments();
    this.personStatus = localStorage.getItem("status");
  }

  async getPerson(){
    await this.http.get<Person>("http://kvm.yuran.us/kursach/wizard/get_info.php?id="+this.person.id,{withCredentials: true})
      .toPromise().then((data) =>{
        // console.log(JSON.stringify(data));
        this.person = data;
      }
    );
  }

  async getBooks(){
    await this.http.get<Array<Book>>("http://kvm.yuran.us/kursach/wizard/get_books.php?id="+this.person.id,{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          this.books = data;
        }
      );
  }

  async getSpell(){
    await this.http.get<Array<Spell>>("http://kvm.yuran.us/kursach/wizard/get_skills.php?id="+this.person.id,{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          this.spells = data;
        }
      );
  }

  async getTournaments(){
    await this.http.get<Array<Tournament>>("http://kvm.yuran.us/kursach/wizard/get_tours.php?id="+this.person.id,{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          this.tournaments = data;
        }
      );
  }

  public getStatus(winnerId):String{
    switch (winnerId){
      case null: return "Открыт набор";
      default: return "Закончен";
    }
  }

  public getWinner(id:number,tournament:Tournament):String {
    switch (id) {
      case tournament.winnerId:
        return "Победитель";
      case tournament.organizerId:
        return "Организатор";
      default:
        return "Участник";
    }
  }

  changeActive(block:number) {
    this.activeBlock = block;
  }

}
