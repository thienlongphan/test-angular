import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutocompleteService } from './components/autocomplete/autocomplete.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { uniqueEmail } from './validators';
import { v4 as uuidv4 } from 'uuid';
import { TestTooltipComponent } from './components/test-tooltip/test-tooltip.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    TestTooltipComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-font';
  testForm!: FormGroup;

  options: any[] = [];
  optionsTwo: string[] = ['one', 'two', 'three'];
  page = 1;
  pageSize = 20;
  isLoading = false;
  lastQuery = '';
  enterPressed = true;
  testInput = '';

  get items() {
    return this.testForm.get('items') as FormArray;
  }

  constructor(
    private service: AutocompleteService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.testForm = this.fb.group({
      testInput: '',
      items: this.fb.array([], [uniqueEmail]),
    });
  }

  onAdd() {
    const emailForm = this.fb.group({
      id: uuidv4(),
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
    this.items.push(emailForm);
  }
}
