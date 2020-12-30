import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Kabinet} from "../kabinet";
import {Storage} from "../storage";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  storages:Array<Storage> = [];
  private routeSubscription: Subscription;
  roomId:number;
  room:Kabinet;


  constructor(private http : HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params=>this.roomId=params['id']);
    this.getStorages();
    this.getKabinet();
  }



  async getStorages(){
    await this.http.get<Array<Storage>>("http://kvm.yuran.us/kursach/room/get_stors.php?id="+this.roomId,{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          this.storages = data;
          // this.getPotions();
        }
      );
  }

  async getKabinet(){
    await this.http.get<Kabinet>("http://kvm.yuran.us/kursach/room/get_info.php?id="+this.roomId,{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          this.room = data;
          // this.getPotions();
        }
      );
  }


}
