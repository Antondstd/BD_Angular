import { Component, OnInit } from '@angular/core';
import {Book} from "../book.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-head-menu',
  templateUrl: './head-menu.component.html',
  styleUrls: ['./head-menu.component.css']
})
export class HeadMenuComponent implements OnInit {
  idProfile;
  idGroup;

  constructor(private http : HttpClient,private router: Router) { }

  ngOnInit() {
    this.checkLogin();
    this.idProfile = Number(localStorage.getItem("id"));
    this.idGroup = localStorage.getItem("group")
  }

  async checkLogin(){
    await this.http.get<any>("http://kvm.yuran.us/kursach/auth/logged.php",{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          if (data.logged == false){
            localStorage.setItem("id","0")
            this.router.navigate(["/"]);
          }
        }
      );
  }


  async logOut(){
    await this.http.get<any>("http://kvm.yuran.us/kursach/auth/logout.php",{withCredentials: true})
      .toPromise().then((data) =>{
          // console.log(JSON.stringify(data));
          if (data.return_code == 0){
            localStorage.setItem("id","0")
            this.router.navigate(["/"]);
          }
        }
      );
  }

}
