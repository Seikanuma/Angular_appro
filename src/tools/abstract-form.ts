import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export abstract class AbstractFormComponent {

    abstract form: FormGroup;

    getControl(control: string | AbstractControl) {
        if (typeof control === "string") {
            const c = this.form.get(control)
            if (!c) throw new Error("Can't find control : " + control)
            control = c
        }
        return control;
    }

    hasInteraction(control: string | AbstractControl) {
        control = this.getControl(control);
        return (control.dirty || control.touched)
    }

    isInvalid(control: string | AbstractControl) {
        control = this.getControl(control);
        return this.hasInteraction(control) && control.invalid
    }

    hasError(control: string | AbstractControl, errorCode: string) {
        control = this.getControl(control);
        return this.hasInteraction(control) && control.hasError(errorCode)
    }

    onSubmit() {
        this.form.markAllAsTouched();
        console.log("Form Validity:", this.form.valid);
        console.log("Form Errors:", this.form.errors); // Cela affiche les erreurs globales s'il y en a
        console.log("Controls Status:");
        Object.keys(this.form.controls).forEach((key) => {
            const control = this.form.get(key);
            console.log(`${key}:`, control?.status, control?.errors);
        });
        if (this.form.valid) this.onSubmit$();
    }


    abstract onSubmit$(): void

    mustMatch = (matchingcontrol: AbstractControl): ValidatorFn =>
        (control) =>
            control.value === matchingcontrol.value ? null : {
                mustmatch: {
                    expected: matchingcontrol.value,
                    actual: control.value
                }
            }

}
