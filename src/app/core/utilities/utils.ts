import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators, ValidatorFn } from "@angular/forms";
import { FieldManager } from "../../baseConfig.service";
import { environment } from "projects/home/src/environments/environment";


export function setRequired(manager: FieldManager, field: number, validators: ValidatorFn[] = []): ValidatorFn[] {
  if (!manager.visible(field)) {
    return validators;
  }
  if (manager.required(field)) {
    validators.push(Validators.required);
  }
  return validators;
}

export function setFieldValidationsFieldManager(manager: FieldManager, field: number, validations: any = []): ValidatorFn | null {
  return setFieldValidations(manager.visible(field), manager.required(field), validations);
}

export function setFieldValidations(visible: boolean, required: boolean, validations: any = []) : ValidatorFn | null {
  if (visible) {
    const validList: any[] = [];
    if (required) {
      validList.push(inputValidator);
    }
    if (validations.length > 0) {
      validations.forEach((valid: any) => {
        validList.push(valid.validator);
      });
    }
    if (validList.length > 0) {
      return Validators.compose(validList);
    }
  }

  return null;
}

export const inputValidator = (control: AbstractControl): any => {
  if (control instanceof UntypedFormControl) {
    if (typeof(control.value) === 'string' && !control.value.trim()) {
      return { 'required': true };
    } else {
      return Validators.required(control);
    }
  }
  return null;
}

export const checkEmailAddressPattern = (control: AbstractControl): any => {
  if (control instanceof UntypedFormControl) {
    if (typeof(control.value) === 'string' && control.value) {
      if (control.value.length <= 5 || !environment.emailAddressPattern.test(control.value)) {
        return { 'email': true };
      }
    }
  }
  return null;
}

export const checkForValidDataEntry = (control: AbstractControl): number => {
    if (control instanceof UntypedFormControl) {
        if (control.value && typeof(control.value) === 'string' && control.value !== '') {
            return 1;
        }     
    }
  
    if (control instanceof UntypedFormArray) {
      return control.controls.reduce((acc, curr) => acc + checkForValidDataEntry(curr), 0)
    }
  
    if (control instanceof UntypedFormGroup) {
      return Object.keys(control.controls)
        .map(key => control.controls[key])
        .reduce((acc, curr) => acc + checkForValidDataEntry(curr), 0);
    }
    return 0;
}

export const isEmptyUID = (uid:string) => {
    if (uid && uid === "00000000-0000-0000-0000-000000000000") {
        return true;
    }
    return false;
};

export function mustMatchValues(controlName: string, confirmControlName: string) {
    return (formGroup: UntypedFormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[confirmControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return;
        }
        if (typeof(control.value) === 'string' && typeof(matchingControl.value) === 'string') {
          if (control.value.toLowerCase() !== matchingControl.value.toLowerCase()) {
            matchingControl.setErrors({ mustMatch: true });
            matchingControl.markAsTouched(); 
          } else {
            matchingControl.setErrors(null);
          }
        } else if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function handleSubmitError(error: any, form: UntypedFormGroup) {
    if (error.status === 422) {
      const data = error.error;
      data.errors.forEach((field: any) => {
        const control = findAndSetFieldControl(field, form);        
      });
    }
  }

export function findAndSetFieldControl(fieldObj: any, form: UntypedFormGroup) {
    let field = fieldObj.propertyName;
    field = field.charAt(0).toLowerCase() + field.slice(1);
    let fieldError = fieldObj.errorMessage;
    let control: AbstractControl = form;
    if (field === 'base') {
      control = form;
    } else if (form.contains(field)) {
      control = form.get(field) as UntypedFormControl;
    } else if (field.indexOf('.') > 0) {
      let group: any;
      field.split('.').forEach((f: any, index: number) => {
        if (index === 0) {
          if (f === 'loanAddress' || f === 'address') {
            f = hanldeAddressFields(f);
          }
          f = f.replace('[', '.').replace(']', '');
          group = form.get(f) as UntypedFormArray;
        } else {
          f = f.charAt(0).toLowerCase() + f.slice(1)
          control = group.get(f) as UntypedFormControl;
        }
      })
    } else {
      control = form;
    }
    control.setErrors({serverError: fieldError});
  }

  function hanldeAddressFields(address: string) {
    return address.replace(address, 'addresses.0');
  }

export function escape(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export function checkAtleastOne() {
  return (formArray: UntypedFormArray) => {
    let count = 0;
    formArray.value.forEach((x: any) => {
      count += x.length;
    })
    return count >= 1 ? null : { error: "Please select at least one product" }
  }
}

export function appendData(actualText: string, fieldName: string, data: string): string {
  const pattern = '#' + fieldName + '#';
  if (actualText && actualText.includes(pattern)) {
    actualText = actualText.replace(pattern, data ? data : '');
  }
  return actualText;
}

export function splitAndAppendData(actualText: string, fieldName: string, data: string) {
  let splittedText: any = [];
  let mergedText = '';
  const pattern = '#' + fieldName + '#';
  if (actualText && actualText.includes('#') && actualText.includes(pattern)) {
    splittedText = actualText.split('#');
    splittedText.forEach((text: string, i: any) => {
      if (text === fieldName) {
        mergedText += ' ' + (fieldName === 'confirmationNumber' ? '<strong class="text-success">' :  '<strong>') + (data ? data : '') + '</strong>';
      } else {
        mergedText += (text[0] && text[0] == '.' ? '' : ' ') + text;
      }
    });
  }
  return mergedText ? mergedText : actualText;
}


