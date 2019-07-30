import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ModalService]
})
export class HomeComponent {

  constructor(private modalService: ModalService) { }

  openModal() {

    this.modalService.openDialog('BirdModule', 'bird', {title:"Modal Title 1"}).then((modal:any)=> {
      modal.closed = ()=> {
        console.log("this is from home onClose");
      }
      modal.success = (result)=> {
        console.log(`From home onSuccess data: ${result}`);
      }
    });

    // this.modalService.openDialog('ListModule', 'employee', {title:"Employee List"}).then((modal:any)=> {
    //   modal.closed = ()=> {
    //     console.log("this is from home onClose");
    //   }
    //   modal.success = (result)=> {
    //     console.log(`From home onSuccess data: ${result}`);
    //   }
    // });
  }


}
