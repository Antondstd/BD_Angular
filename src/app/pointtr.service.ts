import { Injectable } from '@angular/core';
import {Result} from "./result/result";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PointtrService {

  constructor(private http : HttpClient) { }
  results: Array<Result> = [];

  sendCanvasPoint(mouseXshow,mouseYshow,savedR) {
    let params = new HttpParams();
    params = params.append("x", mouseXshow.toString());
    params = params.append("y", mouseYshow.toString());
    params = params.append("r", savedR.toString());
    return this.http.get("/addpoint", {params: params}).toPromise();
  }

  sendPoints(x,y,r){
    let params = new HttpParams();
    params = params.set("x", x.join(', '));
    params = params.set("y", y.toString());
    params = params.set("r", r.join(', '));
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post("/addpoint", params, {headers: myHeaders}).toPromise();
  }

  sendToTable(savedR){
  let params = new HttpParams();
  params = params.append("r", savedR.toString());
  return this.http.get("/points", {params: params}).toPromise();
  }
}
