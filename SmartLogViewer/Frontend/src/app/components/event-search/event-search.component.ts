import { Component } from '@angular/core';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { EventSearch } from "../../LogManipulator/event-search";
import { FormBuilder } from "@angular/forms";

/**
 * Questa classe definisce il controller del widget event-search
 */
@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent {

    /**
     * Gestore della form
     */
    uploadForm = this.formBuilder.group({
        q: ''
    });

    /**
     * Costruisce una nuova istanza del controller del event-search
     * @param formBuilder Servizio che gestisce i form
     * @param logManipulationService Servizio che segnala alla tabella e grafico la presenza di un nuovo logManipulator
     */
    constructor(private formBuilder: FormBuilder, private logManipulationService: LogManipulationService) { }

    /**
     * Metodo che gestisce il submit del form, se la query string è vuota si manda il manipulator di default
     */
    onSubmit(): void {
        if (this.uploadForm.value.q as string == "") {
            this.logManipulationService.setManipulation(this.logManipulationService.getDefaultManipulator())
        } else {
            this.logManipulationService.setManipulation(new EventSearch(this.uploadForm.value.q as string));
        }
    }

}
