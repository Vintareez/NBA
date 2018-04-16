import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { TeamData } from './teams.data';
import { HttpService} from '../http.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'teams-comp',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})

export class TeamsComponent implements OnInit {

  teams: TeamData[] = [];
  pageSize = 6;
  pageSizeOptions: Array<number> = [6, 12];
  pageEvent: PageEvent;
  mySubscription: Subscription;
  value: number = 0;
  Progress: boolean = false;
  
  constructor (private httpService: HttpService, private router: Router,
    private render: Renderer2){
    }

  showPlayers(team: TeamData){
    this.router.navigate(
      ['players', team.abbr]
    );
  }
  
  SubProgress(){
    this.mySubscription = Observable.interval(6).subscribe((progvalue:number) => {
      if(progvalue<=100) {
        this.value = progvalue
        this.Progress = this.httpService.getProgress();
      } 
     else { this.mySubscription.unsubscribe()}
     });
  }

  Null(){
    this.value = 0;
    this.SubProgress();
  }

  loadSpin(Element: any) {
    this.render.addClass(Element, "deactive-spinner");
  }

  ngOnInit(){
    this.SubProgress();
    this.pageEvent = new PageEvent;
    this.pageEvent.pageIndex = 0;
  }  
}
 
