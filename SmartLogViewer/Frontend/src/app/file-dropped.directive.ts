import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileDropped]'
})
export class FileDroppedDirective {
    @HostBinding('class.fileover') fileOver: boolean = false;
    @Output() fileDropped = new EventEmitter<any>();

    @HostListener("dragover", ['$event']) public onDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = true;
    } 

    @HostListener("dragleave", ['$event']) public onDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = false;
    } 

    @HostListener('drop', ['$event']) public onDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = false;
        let files = e.dataTransfer.files;
        if (files.length > 0)
            this.fileDropped.emit(files);
    }

}
