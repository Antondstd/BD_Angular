import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Person} from "../person.model";
import {Lesson} from "../lesson.model";
import {HttpClient} from "@angular/common/http";
import {Tournament} from "../tournament.model";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groupId:number;
  groupName:String;
  groupLeader:number;
  lessons:Array<Lesson> = [];

  groupOfPeople:Array<Person> = [];

  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  constructor(private http : HttpClient,private route: ActivatedRoute){

    this.routeSubscription = route.params.subscribe(params=>this.groupId=params['id']);
    // this.querySubscription = route.queryParams.subscribe(
    //   (queryParam: any) => {
    //     this.product = queryParam['product'];
    //     this.price = queryParam['price'];
    //   }
    // );
  }

  onImgError(event){
    event.target.src = 'assets/profile_icon.png'
  }

  ngOnInit() {
    this.getPeople();
    this.getLessons();
    this.getInfo();
  }

  async getPeople(){
    await this.http.get<Array<Person>>("http://kvm.yuran.us/kursach/group/get_students.php?id="+this.groupId,{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          // console.log(data.name);
          this.groupOfPeople = data;
        }
      );
  }

  async getLessons() {
    await this.http.get<Array<Lesson>>("http://kvm.yuran.us/kursach/group/get_lessons.php?id=" + this.groupId, {withCredentials: true})
      .toPromise().then((data) => {
          // console.log(JSON.stringify(data));
          // console.log(data.name);
          this.lessons = data;
        }
      );
  }

  async getInfo() {
    await this.http.get<any>("http://kvm.yuran.us/kursach/group/get_info.php?id=" + this.groupId, {withCredentials: true})
      .toPromise().then((data) => {
          // console.log(JSON.stringify(data));
          this.groupName = data.name;
          this.groupLeader = data.admin;
        }
      );
  }


}
