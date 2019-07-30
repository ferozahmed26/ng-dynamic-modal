import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
   <div *ngIf="show===true" class="modal fade" [ngClass]="{show: show===true}" tabindex="-1" role="dialog" style="padding-right: 17px; display: block;">
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
  `
})

export class ModalComponent implements OnInit {
  title: string = "Modal Default Title";
  show: boolean = true;
  childInstance: any;
  public closed: () => void;
  public success: (any) => void;
  public onClose: () => void;
  public onAction: (any) => void;
  constructor() {
  }

  onModalClose() {
    this.show = false;
    this.onClose();
  }

  ngOnInit() {
    this.childInstance.actionController$.subscribe((data) => {
      this.onAction(data);
    })
  }

}