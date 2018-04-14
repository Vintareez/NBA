import {Component, Inject} from '@angular/core';
import { PlayerData } from '../Players/players.data';
import { HttpService } from '../http.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'modal-comp',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    providers: [HttpService]
})

export class ModalComponent {

  position: string = "above";
  
  constructor(private httpService: HttpService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    }
    
  closeModal(): void {
    this.dialogRef.close();
  }
    
  SelectFavorite(data: PlayerData){
    data.favorite_status = !data.favorite_status;
    for (let key in localStorage){
      if(key.endsWith(data.name)){
        this.httpService.delItem(key);
        break;
      }
      else{
        this.httpService.addItem("player:" + data.name, JSON.stringify(data));
      }
    }  
  }
}