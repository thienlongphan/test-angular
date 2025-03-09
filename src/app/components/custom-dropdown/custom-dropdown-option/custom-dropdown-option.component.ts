import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDropdownComponent } from '../custom-dropdown.component';
import { CustomDropdownService } from '../custom-dropdown.service';

@Component({
  selector: 'custom-dropdown-option',
  templateUrl: './custom-dropdown-option.component.html',
  standalone: true,
  imports: [NgbDropdownModule],
  host: {
    role: 'listbox',
    '[attr.aria-label]': 'value',
  },
})
export class CustomDropdownOptionComponent implements OnInit {
  @Input() value!: any;
  private select!: CustomDropdownComponent;
  constructor(private dropdownService: CustomDropdownService) {
    this.select = this.dropdownService.getSelect();
  }

  ngOnInit() {}

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent): void {
    event.preventDefault();
    this.select.selectOption(this);
  }
}
