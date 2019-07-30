import { Injectable, Injector, SystemJsNgModuleLoader, NgModuleFactory, ApplicationRef, ComponentFactoryResolver, Inject, OnInit, ElementRef, ComponentRef } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { Modal } from './modal/modal.model';
import { IModalDialogOptions } from './modal/modal-dialog.interface';

@Injectable()
export class ModalService {

  private modules = {
    'BirdModule': './bird/bird.module#BirdModule',
    'ListModule': './list/list.module#ListModule'
  }

  constructor(
    private injector: Injector,
    private loader: SystemJsNgModuleLoader,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  // open modal dialog
  public openDialog(_module, _component, _optional: IModalDialogOptions) {
    return new Promise((resolve, reject) => {
      this.loader.load(this.modules[_module])
        .then(
          (moduleFactory: NgModuleFactory<any>) => {

            const moduleRef = moduleFactory.create(this.injector);
            const entryComponent = (<any>moduleFactory.moduleType).components[_component];
            const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);
            const componentRef = factory.create(this.injector);
            if (_optional['data']) {
              componentRef.instance['data'] = _optional['data'];
            }
            componentRef.hostView.detectChanges();
            this.appRef.attachView(componentRef.hostView);

            const ngContent = [[componentRef.location.nativeElement]];
            const modalFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(ModalComponent);
            const modalComponentRef = modalFactory.create(this.injector, ngContent);
            modalComponentRef.instance.childInstance = componentRef.instance;
            modalComponentRef.instance.title = _optional['title'];
            modalComponentRef.hostView.detectChanges();
            this.appRef.attachView(modalComponentRef.hostView);

            const { nativeElement } = modalComponentRef.location;
            let modal = new Modal();
            this.document.body.appendChild(nativeElement);
            this.dialogInit(modalComponentRef, modal);
            resolve(modal);
          }
        ).catch(
          (reason) => {
            console.log('Handle rejected promise (' + reason + ') here.');
            reject('error');
          }
        );
    });
  }

  private dialogInit(reference: ComponentRef<ModalComponent>, modal: Modal) {
    // 
    reference.instance.onClose = () => {
      modal.closed();
      this.appRef.detachView(reference.hostView);
    }
    // 
    reference.instance.onAction = (data: any) => {
      modal.success(data);
      this.appRef.detachView(reference.hostView);
    }

  }

}