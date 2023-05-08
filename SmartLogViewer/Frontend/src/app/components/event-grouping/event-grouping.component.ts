import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventGrouping } from '../../LogManipulator/event-grouping';
import { Identity } from '../../LogManipulator/identity';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';

@Component({
  selector: 'app-event-grouping',
  templateUrl: './event-grouping.component.html',
  styleUrls: ['./event-grouping.component.css']
})
export class EventGroupingComponent {

    formGroup = this.formBuilder.group({
        valore: '0',
        unita: '1'
    });


    constructor(private formBuilder: FormBuilder, private logManipulationService: LogManipulationService) {

    }

    submitForm() {
        if (Number(this.formGroup.value) == 0)
            this.logManipulationService.setManipulation(new Identity());
        else
            this.logManipulationService.setManipulation(
                new EventGrouping(Number(this.formGroup.value.valore) * Number(this.formGroup.value.unita))
            );
    }
}
