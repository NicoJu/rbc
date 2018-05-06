import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Robot} from "./robot";

@Injectable()
export class RobotService {

  public API = '/api/v1';
  public ROBOT_API = this.API + '/robot';

  constructor(private http:HttpClient) { }

  getAllRobot(): Observable<Robot[]> {
    return this.http.get<Robot[]>(this.ROBOT_API);
  }

  deleteRobot(id:string): Observable<Robot> {
    return this.http.delete<Robot>(this.ROBOT_API + '/' + id);
  }

  getRobotById(id:String): Observable<Robot> {
    return this.http.get<Robot>(this.ROBOT_API + '/' +id);
  }

  addRobot(robot:Robot): Observable<Robot> {
    return this.http.post<Robot>(this.ROBOT_API, robot);
  }

  updateRobot(robot:Robot): Observable<Robot> {
    return this.http.put<Robot>(this.ROBOT_API, robot);
  }

}
