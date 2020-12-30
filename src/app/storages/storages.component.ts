import { Component, OnInit } from '@angular/core';
import {Kabinet} from "../kabinet";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.css']
})
export class StoragesComponent implements OnInit {
  rooms:Array<Kabinet> = [];

  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.getRooms();
  }

  async getRooms(){
    await this.http.get<Array<Kabinet>>("http://kvm.yuran.us/kursach/room/get_list.php",{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          this.rooms = data;
        }
      );
  }
}
