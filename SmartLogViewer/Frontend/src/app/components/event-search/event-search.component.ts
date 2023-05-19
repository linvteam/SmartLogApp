import { Component } from '@angular/core';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { EventSearch } from "../../LogManipulator/event-search";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { LogService } from '../../services/log/log.service';
import {IDropdownSettings} from "ng-multiselect-dropdown/multiselect.model";

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
     * Lista delle Unit disponibili
     */
    public availableUnits: number[] = []

    /**
     * Lista delle SubUnit disponibili
     */
    public availableSubUnits: number[] = [];

    /**
     * Lista delle Unit selezionate
     */
    public selectedUnits: number[] = [];

    /**
     * Lista delle SubUnit selezionate
     */
    public selectedSubUnits: number[] = [];

    /**
     * Impostazioni per la selezione nei menù a tendina
     */
    public dropdownSettings: IDropdownSettings = {
        singleSelection: false,
        selectAllText: 'Seleziona tutto',
        unSelectAllText: 'Deseleziona tutto',
    }

    /**
     * Gestore della form
     */
    public uploadForm: FormGroup = this.formBuilder.group({
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
            if (this.availableUnits.indexOf(e.Unit) == -1) {
                this.availableUnits.push(e.Unit);
            }
            if (this.availableSubUnits.indexOf(e.SubUnit) == -1) {
                this.availableSubUnits.push(e.SubUnit);
            }
        }

        this.availableUnits.sort((a, b) => (a - b));
        this.availableSubUnits.sort((a, b) => (a - b));
    }

    /**
     * Metodo che gestisce il submit del form, se la query string � vuota si manda il manipulator di default
     */
    public onSubmit(): void {
        if (this.uploadForm.value.q as string == "" && this.selectedUnits.length == 0 && this.selectedSubUnits.length == 0) {
            this.logManipulationService.setManipulation(this.logManipulationService.getDefaultManipulator())
        } else {
            this.logManipulationService.setManipulation(new EventSearch(this.uploadForm.value.q as string, this.selectedUnits, this.selectedSubUnits));
        }
    }

}
