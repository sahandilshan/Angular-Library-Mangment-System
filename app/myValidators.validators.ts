import { AbstractControl, ValidationErrors } from "@angular/forms";

export class myValidations{

    static cannotContainSpaces(control:AbstractControl):ValidationErrors | null
    {
    if(control.value!=null)
      if((control.value as string).indexOf(' ')>=0)
        return {    cannotContainSpaces :true}

    return null;
    
    }
}