import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.css']
})
export class BirdComponent implements OnInit {
  title= "Bird";
  @Output() actionController$ = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  onClickSubmit() {
    this.actionController$.emit(this.title);
  }

}