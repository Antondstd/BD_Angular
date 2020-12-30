import {Component, OnInit, ViewChild} from '@angular/core';
import {Response} from "../Response";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
   activeBlock: boolean;
   login:String = "";
   password:String = "";
   cantLogin = false;
   cantRegistrate = false;
   cantRegMessage:String = "Не удалось зарегистрироваться";
   timeOutreg;
   timeOutLog;

  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit() {
    this.activeBlock = false;
    let personId = Number(localStorage.getItem("id"));
    if (personId > 0)
      this.router.navigate(["/profile/"+personId]);;
  }
  changeActive(e:string) {
    if(e == 'logIn') {
      this.activeBlock = false;

    }
    else {
      this.activeBlock = true;
    }
  }

  async registration(){
    let login = this.login;
    let password = this.password;
    let body = { name: login, password: password};
    await this.http.post("/registration", body).toPromise().then((data:Response) => {
      if (data.result == true){
        this.tryLogin();
      }
      else{
        clearTimeout(this.timeOutreg);
        if(data.message != null) this.cantRegMessage = data.message;
        else this.cantRegMessage = "Не удалось зарегистрироваться";
        this.cantRegistrate = true;
        this.timeOutreg = setTimeout(() => {
          this.cantRegistrate = false;
        },3000);
      }
    });
  }
  async tryLogin(){
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let body = "username="+this.login+"&password="+this.password;
    // await this.http.post("/perform_login",body,{headers:myHeaders}).toPromise().then((data:Response) => {
    await this.http.get<any>("http://kvm.yuran.us/kursach/auth/login.php?login="+this.login+"&password="+this.password,{withCredentials: true}).toPromise().then((data) => {
        // let code = JSON.parse(data);
        if (data.return_code == undefined){
          localStorage.setItem("id",data.id);
          localStorage.setItem("status",data.status == "f" ? "false" : "true");
          localStorage.setItem("group",data.groupId);
          this.router.navigate(["/profile/"+data.id]);
        }
      // console.log(JSON.stringify(data));
      //   if(data.result == true){
      //   this.router.navigate(["/point"]);
      // }
      // else{
      //   clearTimeout(this.timeOutLog);
      //   this.cantLogin = true;
      //   this.timeOutLog = setTimeout(() => {
      //     this.cantLogin = false;
      //   },3000);
      // }
    });
    // await this.http.get<any>("http://kvm.yuran.us/kursach/wizard/get_info.php?id=1").toPromise().then((data) => {
    //   console.log(JSON.stringify(data));
    // });
  }


}
