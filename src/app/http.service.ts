import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PlayerData } from './Players/players.data';
import { TeamData } from './Teams/teams.data';
import 'rxjs/add/operator/map';
  
@Injectable()
export class HttpService{
    
    players: PlayerData[] = [];
    teams: TeamData[] = [];
    download: boolean = true;
  
    constructor(private http: HttpClient){ }
    
    getTeams(){
        if(this.download){ 
            this.download = false;
            this.http.get('./teams.json').map((data: any[]) => data.map(dataPart => { 
                return dataPart;
            })).subscribe((data:TeamData[]) => {
                this.teams = data;
            });;
        }
        return this.teams; 
    };
    getPlayers(query:string){
        if(this.download){ 
            this.download = false;
            this.http.get('https://nba-players.herokuapp.com/players-stats' + query).map(
                (data: any[]) => data.map(dataPart => { 
                    let temp = dataPart.name.split(" ");
                    dataPart.img_str = "https://nba-players.herokuapp.com/players/" + temp[1] + "/" + temp[0]; 
                    if(localStorage.getItem("player:" + dataPart.name)){
                        dataPart.favorite_status = true;
                    }
                    return dataPart;
                })
            ).subscribe((data:PlayerData[]) => {
                this.players = data;
            });
        }
        return this.players;   
    }

    addItem(key:any, item: any){
        localStorage.setItem(key, item);
    }

    delItem(key:string){
        localStorage.removeItem(key);
    }

    getItem(key:any){
        return localStorage.getItem(key);
    }
}