import { Component, OnInit } from '@angular/core';
import {Tournament} from "../tournament.model";
import {Person} from "../person.model";
import {Spell} from "../spell.model";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../lesson.model";
// import {MatSelectModule} from '@angular/material/select';
// import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-pg-tournaments',
  templateUrl: './pg-tournaments.component.html',
  styleUrls: ['./pg-tournaments.component.css']
})
export class PgTournamentsComponent implements OnInit {
  tournaments:Array<Tournament> = [];
  personId:Number;
  personStatus:String;

  addTournamentForm = new FormGroup({
    name: new FormControl(''),
    lesson: new FormControl(''),
  });


  lessons:Array<Lesson> = [];


  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.personId = Number(localStorage.getItem("id"));
    this.personStatus = localStorage.getItem("status");
    this.getTournaments();
    this.getLessons();
  }

  async onSubmit(){
    await this.http.get<any>("http://kvm.yuran.us/kursach/tour/add.php?name="
      +this.addTournamentForm.get("name").value
    +"&lesson="+this.addTournamentForm.get("lesson").value,{withCredentials: true})
      .toPromise().then((data) =>{
          console.log(JSON.stringify(data));
        }
      );
     this.getTournaments();
    // console.log(this.addTournamentForm.get("name").value);
  }

  public getStatus(winnerId):String{
    switch (winnerId){
      case null: return "Открыт набор";
      default: return "Закончен";
    }
  }

  async getTournaments(){
    await this.http.get<Array<Tournament>>("http://kvm.yuran.us/kursach/tour/get_list.php",{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          this.tournaments = data;
        }
      );
  }

  async getLessons(){
    await this.http.get<Array<Lesson>>("http://kvm.yuran.us/kursach/wizard/get_lessons.php?id="+this.personId,{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          this.lessons = data;
        }
      );
  }

}
