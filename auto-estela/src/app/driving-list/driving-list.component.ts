import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Drive } from '../driving.model';
import { observable, Observable } from 'rxjs';
import { Rent } from '../rent.model';

@Component({
  selector: 'app-driving-list',
  templateUrl: './driving-list.component.html',
  styleUrls: ['./driving-list.component.css']
})
export class DrivingListComponent implements OnInit {
  @Input() rentList: Rent[];
  obs_drive:Observable<Drive[]>;
  driveList: Drive[];
  selectedCar:Drive;
  constructor(public http:HttpClient) { }

  ngOnInit(): void {
    this.obs_drive=this.http.get<Drive[]>('https://my-json-server.typicode.com/malizia-g/fine_anno_exp/mezzi');
    this.obs_drive.subscribe(this.get_driving)
  }
  get_driving=(auto:Drive[])=>
  {
    this.driveList=auto;
  }
  onNoleggia(auto:Drive)
  {
    console.log(auto);
    this.selectedCar=auto;
    this.rentList.push(new Rent(auto,1));
  }
}
