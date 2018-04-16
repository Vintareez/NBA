import { Component, OnInit, Input, ElementRef, Renderer2, EventEmitter, Output, Inject } from '@angular/core';
import { PlayerData } from './players.data';
import { HttpService } from '../http.service';
import { ModalComponent } from '../Modal/modal.component';
import { ActivatedRoute} from '@angular/router';
import { MyInterceptor } from '../interceptor';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, PageEvent} from '@angular/material';
import { ValueTransformer } from '@angular/compiler/src/util';
import { OverlayConnectionPosition } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'players-comp',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit {

  players: PlayerData[] = [];
  query: string = "";
  pageSize = 6;
  pageSizeOptions: Array<number> = [6, 18, 30, 60];
  pageEvent: PageEvent;
  value: number = 0;
  mode = "Determinate";
  mySubscription : Subscription;
  Progress : boolean = false;
  


  constructor (private httpService: HttpService, public dialog: MatDialog,
    private activateRoute: ActivatedRoute, private render: Renderer2){
    }
    
  loadSpin(Element: any) {
    this.render.addClass(Element, "deactive-spinner");
  }
  
  SubProgress(){
    this.mySubscription = Observable.interval(15).subscribe((progvalue:number) => {
      if(progvalue<=100) {
         this.value = progvalue;
         this.Progress = this.httpService.getProgress(); 
      } 
     else { this.mySubscription.unsubscribe()}
     });
  }

  Null(){
    this.value = 0;
    this.SubProgress();
  }

  SelectFavorite(player: PlayerData){
    player.favorite_status = !player.favorite_status;
    for (let key in localStorage){
      if(key.endsWith(player.name)){
        this.httpService.delItem(key);
        break;
      }
      else{
        this.httpService.addItem("player:" + player.name, JSON.stringify(player));
      }
    }  
  }
  
  openModal(player: PlayerData): void {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '560px',
      data: player 
    });
  }

  ngOnInit(){
    this.SubProgress();
    this.query = "";
    this.pageEvent = new PageEvent;
    this.pageEvent.pageIndex = 0;
  } 
 }