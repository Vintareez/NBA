import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { PlayerData } from '../Players/players.data';
import { HttpService } from '../http.service';
import { ModalComponent } from '../Modal/modal.component';
import { ActivatedRoute} from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent} from '@angular/material';

@Component({
  selector: 'teamplayers-comp',
  templateUrl: '../Players/players.component.html',
  styleUrls: ['../Players/players.component.css'],
  providers: [HttpService]
})

export class TeamPlayersComponent implements OnInit {

  players: PlayerData[];
  query: string;
  teamname: string;
  pageSize = 6;
  pageSizeOptions: Array<number> = [6, 18, 30, 60];
  pageEvent: PageEvent;
  

  constructor (private httpService: HttpService, public dialog: MatDialog,
    private activateRoute: ActivatedRoute, private render: Renderer2){
      this.teamname =  activateRoute.snapshot.params['abbr'];
    }

  paginationFrom(pageEvent:PageEvent) {
    return ((pageEvent.pageIndex === 0) ? pageEvent.pageIndex : (pageEvent.pageIndex) * pageEvent.pageSize );
  }

  paginationTo(pageEvent:PageEvent) {
    return this.paginationFrom(pageEvent) + this.pageSize;
  }
     
  loadSpin(Element: any) {
    this.render.addClass(Element, "deactive-spinner");
  }

  openModal(player: PlayerData): void {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '560px',
      data: player 
    });
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

  ngOnInit(){
    this.query = "-teams/" + this.teamname;
    this.pageEvent = new PageEvent;
    this.pageEvent.pageIndex = 0;
  }  
}

 
 
