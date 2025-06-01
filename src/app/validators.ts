import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

const duplicate = (array: any[]) => {
  return array.filter((item, index, self) => {
    return (
      index !==
      self.findIndex(
        (s) => s['email'] === item['email'] && s['name'] === item['name']
      )
    );
  });
};

export const uniqueEmail = (
  formArray: AbstractControl
): ValidationErrors | null => {
  if (!(formArray instanceof FormArray)) return null;

  const accountList = formArray.controls
    .map((control) => ({
      id: control.get('id')?.value,
      email: control.get('email')?.value,
      name: control.get('name')?.value,
    }))
    .filter((item) => item.email || item.name);

  const emailDuplicates = duplicate(accountList);

  formArray.controls.forEach((control) => {
    const id = control.get('id')?.value;
    const dupFound = emailDuplicates.find((item) => item.id === id);
    if (dupFound) {
      control.setErrors({ exist: true });
    } else {
      control.setErrors(null);
    }
  });
  return null;
};
