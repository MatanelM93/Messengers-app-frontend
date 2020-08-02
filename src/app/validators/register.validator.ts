import { AbstractControl, ValidationErrors } from "@angular/forms";


export class MatchedPasswordValidator{

    static passwordMustMatch( control: AbstractControl): ValidationErrors | null {
        let parent = control.parent;
        if ( parent ){
            let password = parent.get('password').value;
            if ( control.value != password ) {
                return { passwordsNotMatch: true }
            }
        }
        
        return null;
    }

}
