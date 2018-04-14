import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { PlayerData } from '../Players/players.data';
import { HttpService } from '../http.service';
import { ModalComponent } from '../Modal/modal.component';
import { ActivatedRoute} from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent} from '@angular/material';

@Component({
  selector: 'favorite-comp',
  templateUrl: './favorite.component.html',
  styleUrls: ['../Players/players.component.css'],
  providers: [HttpService]
})

export class FavoriteComponent implements OnInit {

  players: PlayerData[] = [];
  key: string;
  pageSize = 6;
  pageSizeOptions: Array<number> = [6, 18, 30, 60];
  pageEvent: PageEvent;
  

  constructor (private httpService: HttpService, public dialog: MatDialog,
    private activateRoute: ActivatedRoute, private render: Renderer2){
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

  ngOnInit(){
    for (this.key in localStorage){
      if(this.key.startsWith('player:')){
        this.players.push(JSON.parse(this.httpService.getItem(this.key))); 
      }
    }
    this.pageEvent = new PageEvent;
    this.pageEvent.pageIndex = 0;
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
}