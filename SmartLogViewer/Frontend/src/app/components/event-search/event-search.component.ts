import { Component } from '@angular/core';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { EventSearch } from "../../LogManipulator/event-search";
import { FormBuilder, FormControl } from "@angular/forms";
import { LogService } from '../../services/log/log.service';

/**
 * Questa classe definisce il controller del widget event-search
 */
@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent {

    public AvailableUnits: number[] = []
    public AvailableSubUnits: number[] = [];

    public SelectedUnits: number[] = [];
    public SelectedSubUnits: number[] = [];

    public dropdownSettings = {
        singleSelection: false,
        selectAllText: 'Seleziona tutto',
        unSelectAllText: 'Deseleziona tutto',
    }

    /**
     * Gestore della form
     */
    uploadForm = this.formBuilder.group({
        q: '',
        units: new FormControl(),
        subunits: new FormControl()
    });

    /**
     * Costruisce una nuova istanza del controller del event-search
     * @param formBuilder Servizio che gestisce i form
     * @param logManipulationService Servizio che segnala alla tabella e grafico la presenza di un nuovo logManipulator
     */
    constructor(private formBuilder: FormBuilder, private logManipulationService: LogManipulationService, private logService: LogService) {
        for (let e of logService.getLog().Events) {
            if (this.AvailableUnits.indexOf(e.Unit) == -1) {
                this.AvailableUnits.push(e.Unit);
            }
            if (this.AvailableSubUnits.indexOf(e.SubUnit) == -1) {
                this.AvailableSubUnits.push(e.SubUnit);
            }
        }

        this.AvailableUnits.sort((a, b) => (a - b));
        this.AvailableSubUnits.sort((a, b) => (a - b));
    }

    /**
     * Metodo che gestisce il submit del form, se la query string � vuota si manda il manipulator di default
     */
    onSubmit(): void {
        if (this.uploadForm.value.q as string == "" && this.SelectedUnits.length == 0 && this.SelectedSubUnits.length == 0) {
            this.logManipulationService.setManipulation(this.logManipulationService.getDefaultManipulator())
        } else {
            this.logManipulationService.setManipulation(new EventSearch(this.uploadForm.value.q as string, this.SelectedUnits, this.SelectedSubUnits));
        }
    }

}
