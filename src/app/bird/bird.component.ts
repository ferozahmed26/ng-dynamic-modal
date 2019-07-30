import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalService } from './../modal.service';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.css'],
  providers: [ModalService]
})
export class BirdComponent implements OnInit {
  title= "Bird";
  @Output() actionController$ = new EventEmitter<any>();
  constructor(private modalService:ModalService) { }

  ngOnInit() {
  }

  onClickSubmit() {
    this.actionController$.emit(this.title);
  }

  onClickOpenNext() {
    this.modalService.openDialog('ListModule', 'employee', {title:"Employee List"}).then((modal:any)=>{
      modal.closed =()=>{
        console.log("Employee close");
      }
      modal.success =(result)=>{
        console.log("Success result", result);
      }
    })
  }

}