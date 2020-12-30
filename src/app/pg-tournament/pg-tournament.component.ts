import { Component, OnInit } from '@angular/core';
import {Tournament} from "../tournament.model";
import {Person} from "../person.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-pg-tournament',
  templateUrl: './pg-tournament.component.html',
  styleUrls: ['./pg-tournament.component.css']
})
export class PgTournamentComponent implements OnInit {
  tournament: Tournament = new Tournament();
  groupOfPeople:Array<Person> = [];
  personStatus:String;
  personId:number;
  private routeSubscription: Subscription;

  constructor(private http : HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params=>this.tournament.id=params['id']);
    this.personId = Number(localStorage.getItem("id"));
    this.personStatus = localStorage.getItem("status");
    this.getTournament();
    this.getPeople();
  }

  onImgError(event){
    event.target.src = 'assets/profile_icon.png'
  }

  checkInGroup(){
    return this.groupOfPeople.find(element => element.id == this.personId) != null;
  }

  public getStatus(winnerId):String{
    switch (winnerId){
      case null: return "Открыт набор";
      default: return "Закончен";
    }
  }

  async getTournament(){
    await this.http.get<Tournament>("http://kvm.yuran.us/kursach/tour/get_info.php?id="+this.tournament.id,{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          // console.log(data.name);
          this.tournament = data;
        }
      );
  }

  async getPeople(){
    await this.http.get<Array<Person>>("http://kvm.yuran.us/kursach/tour/get_wizards.php?id="+this.tournament.id,{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          // console.log(data.name);
          this.groupOfPeople = data;
        }
      );
  }

  async enterTourn(){
    await this.http.get<Array<Person>>("http://kvm.yuran.us/kursach/tour/enter.php?id="+this.tournament.id,{withCredentials: true})
      .toPromise().then((data) =>{
          console.log(JSON.stringify(data));
          // console.log(data.name);
          // this.groupOfPeople = data;
        }
      );
    this.getPeople();
    this.getTournament();
  }

  async exitTourn(){
    await this.http.get<Array<Person>>("http://kvm.yuran.us/kursach/tour/exit.php?id="+this.tournament.id,{withCredentials: true})
      .toPromise().then((data) =>{
          console.log(JSON.stringify(data));
          // console.log(data.name);
          // this.groupOfPeople = data;
        }
      );
    this.getPeople();
    this.getTournament();
  }

  async setWinner(personId:number){
    await this.http.get<Array<Person>>("http://kvm.yuran.us/kursach/tour/set_winner.php?id="+this.tournament.id
      +"&winner="+personId,{withCredentials: true})
      .toPromise().then((data) =>{
          console.log(JSON.stringify(data));
          // console.log(data.name);
          // this.groupOfPeople = data;
        }
      );
    this.getTournament();
    this.getPeople();
  }

  async excludePerson(personId:number){
    await this.http.get<Array<Person>>("http://kvm.yuran.us/kursach/tour/exclude.php?id="+this.tournament.id
      +"&excluded="+personId,{withCredentials: true})
      .toPromise().then((data) =>{
          console.log(JSON.stringify(data));
          // console.log(data.name);
          // this.groupOfPeople = data;
        }
      );
    this.getPeople();
    this.getTournament();
  }

}
