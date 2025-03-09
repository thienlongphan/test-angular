import { Injectable } from '@angular/core';
import { CustomDropdownComponent } from './custom-dropdown.component';

@Injectable({ providedIn: 'root' })
export class CustomDropdownService {
  constructor() {}

  private select!: CustomDropdownComponent;

  public register(select: CustomDropdownComponent): void {
    this.select = select;
  }

  public getSelect(): CustomDropdownComponent {
    return this.select;
  }
}
