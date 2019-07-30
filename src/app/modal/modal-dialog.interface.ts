export interface IModalDialogSettings {
    overlayClass: string;
    overlayAnimationTriggerClass: string;
    modalClass: string;
    modalAnimationTriggerClass: string;
    contentClass: string;
    headerClass: string;
    headerTitleClass: string;
    closeButtonClass: string;
    closeButtonTitle: string;
    bodyClass: string;
    footerClass: string;
    alertClass: string;
    alertDuration: number;
    buttonClass: string;
    notifyWithAlert: boolean;
}

export interface IModalDialogOptions {
    title: string;
    data?: any;
    settings?:IModalDialogSettings; 
}