import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
   <div class="modal fade show" tabindex="-1" role="dialog" style="padding-right: 17px; display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">{{title}} </h4>
                      <button type="button" class="close"  (click)="onModalClose()"  aria-hidden="true">&times;</button>
                  </div>
              <div class="modal-body">
                <ng-content></ng-content> 
              </div>
          <div class="grabber"></div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  `
})

export class ModalComponent implements OnInit {
  title = "Modal Default Title";
  childInstance:any;
  public closed: () => void;
  public success: (any) => void;
  constructor() {
   }

   onModalClose() {
     this.closed();
   }

  ngOnInit() {
    this.childInstance.actionController$.subscribe((result)=> {
      this.success(result);
    })
  }

}