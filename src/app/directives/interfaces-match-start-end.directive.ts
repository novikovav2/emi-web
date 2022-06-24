import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const InterfacesMatchedStartEndValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('interfaceStart')
    const end = control.get('interfaceEnd')

    return start && end && start.value === end.value ? { interfacesMatched: true }: null
}; 