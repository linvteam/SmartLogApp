import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventGrouping } from '../../LogManipulator/event-grouping';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';

/**
 * Controller che gestisce il widget di raggruppamento degli  eventi
 */
@Component({
    selector: 'app-event-grouping',
    templateUrl: './event-grouping.component.html',
    styleUrls: ['./event-grouping.component.css']
})
export class EventGroupingComponent {

    /**
     * Gestore del form 
     */
    formGroup = this.formBuilder.group({
        valore: '0',
        unita: '1'
    });

    /**
     * Crea una nuova istanza del controller del widget di raggruppamento eventi
     * @param formBuilder Servizio di gestione dei form
     * @param logManipulationService Servizio di gestione dei nuovi logManipulator
     */
    constructor(private formBuilder: FormBuilder, private logManipulationService: LogManipulationService) {

    }

    /**
     * Metodo che gestisce il submit del form, comunica la log manipulation service il nuovo log manipulator. Se il numero di gruppi specificato è 0 verrà impostato il manipulator di default
     */
    submitForm() {
        if (Number(this.formGroup.value.valore) <= 0) {
            this.logManipulationService.setManipulation(this.logManipulationService.getDefaultManipulator());
            this.formGroup.value.valore = '0';
        } else {
            this.logManipulationService.setManipulation(
                new EventGrouping(Number(this.formGroup.value.valore) * Number(this.formGroup.value.unita))
            );
        }
    }
}
