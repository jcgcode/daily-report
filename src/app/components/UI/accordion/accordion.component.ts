import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'AccordionComponent',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {

    @Input() name: string;
    @Input() image: string;
    @Input() object: any;
    @Output() change: EventEmitter<any> = new EventEmitter();

    isMenuOpen: boolean;

    constructor() {
        this.isMenuOpen = false;
    }

    toggleAccordion(): void {
        this.isMenuOpen = !this.isMenuOpen;
        this.change.emit(this.object);
    }

}
