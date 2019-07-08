import { Injectable, Injector, SystemJsNgModuleLoader, NgModuleFactory, ApplicationRef, ComponentFactoryResolver, Inject, OnInit, ElementRef } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modules = {
    'BirdModule' : './bird/bird.module#BirdModule'
  }

  constructor(
    private injector: Injector,
    private loader: SystemJsNgModuleLoader,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
  ) {
   }

  // show modal
  public open(_module, _component, _title?) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          this.loader.load(this.modules[_module])
            .then(
              (moduleFactory: NgModuleFactory<any>) => {
                const moduleRef = moduleFactory.create(this.injector);
                const entryComponent = (<any>moduleFactory.moduleType).components[_component];
                const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);
                const componentRef = factory.create(this.injector);
                componentRef.hostView.detectChanges();
                this.appRef.attachView(componentRef.hostView);
                const ngContent = [[componentRef.location.nativeElement]];
                const modalFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(ModalComponent);
                const modalComponentRef = modalFactory.create(this.injector, ngContent);
                modalComponentRef.instance.childInstance = componentRef.instance;
                modalComponentRef.instance.title = _title;
                modalComponentRef.hostView.detectChanges();
                this.appRef.attachView(modalComponentRef.hostView);
                const { nativeElement } = modalComponentRef.location;
                
                this.document.body.appendChild(nativeElement);
                resolve(modalComponentRef.instance);
            }
          ).catch(
           (reason) => {
             console.log('Handle rejected promise ('+reason+') here.');
             reject('error');
            }
          );
          
      }, 0);
    });
  }

  closeModal() {

  }

}