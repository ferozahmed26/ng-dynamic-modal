import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private modal: ModalService) { }

  openModal() {

    this.modal.open('BirdModule', 'BirdComponent', "Modal Title").then((x:any)=> {
      // console.log(x);
      x.closed = ()=> {
        console.log("this is from home onClose");
        
      }
      x.success = (result)=> {
        console.log(`From home onSuccess data: ${result}`);
        
      }
    });
  }

  click() {}


}
