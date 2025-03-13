import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EllipsisDirective } from './directives/ellipsis.directive';
import { MatTableModule } from '@angular/material/table';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteService } from './components/autocomplete/autocomplete.service';
import { map } from 'rxjs';
import { CustomEventDirective } from './directives/custom-event.directive';
import { CustomInputComponent } from './components/custom-input/custom-input.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  test5: string;
  test6: string;
  test7: string;
  test8: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    test1: 'test1',
    test2: 'test2',
    test3: 'test3',
    test4: 'test4',
    test5: 'test5',
    test6: 'test6',
    test7: 'test7',
    test8: 'test8',
  },
  // {
  //   position: 2,
  //   name: 'Helium',
  //   weight: 4.0026,
  //   symbol: 'He',
  //   test1: 'test1',
  //   test2: 'test2',
  //   test3: 'test3',
  //   test4: 'test4',
  //   test5: 'test5',
  //   test6: 'test6',
  //   test7: 'test7',
  //   test8: 'test8',
  // },
  // {
  //   position: 3,
  //   name: 'Lithium',
  //   weight: 6.941,
  //   symbol: 'Li',
  //   test1: 'test1',
  //   test2: 'test2',
  //   test3: 'test3',
  //   test4: 'test4',
  //   test5: 'test5',
  //   test6: 'test6',
  //   test7: 'test7',
  //   test8: 'test8',
  // },
  // {
  //   position: 4,
  //   name: 'Beryllium',
  //   weight: 9.0122,
  //   symbol: 'Be',
  //   test1: 'test1',
  //   test2: 'test2',
  //   test3: 'test3',
  //   test4: 'test4',
  //   test5: 'test5',
  //   test6: 'test6',
  //   test7: 'test7',
  //   test8: 'test8',
  // },
  // {
  //   position: 5,
  //   name: 'Boron',
  //   weight: 10.811,
  //   symbol: 'B',
  //   test1: 'test1',
  //   test2: 'test2',
  //   test3: 'test3',
  //   test4: 'test4',
  //   test5: 'test5',
  //   test6: 'test6',
  //   test7: 'test7',
  //   test8: 'test8',
  // },
  // {
  //   position: 6,
  //   name: 'Carbon',
  //   weight: 12.0107,
  //   symbol: 'C',
  //   test1: 'test1',
  //   test2: 'test2',
  //   test3: 'test3',
  //   test4: 'test4',
  //   test5: 'test5',
  //   test6: 'test6',
  //   test7: 'test7',
  //   test8: 'test8',
  // },
  // {
  //   position: 7,
  //   name: 'Nitrogen',
  //   weight: 14.0067,
  //   symbol: 'N',
  //   test1: 'test1',
  //   test2: 'test2',
  //   test3: 'test3',
  //   test4: 'test4',
  //   test5: 'test5',
  //   test6: 'test6',
  //   test7: 'test7',
  //   test8: 'test8',
  // },
  // {
  //   position: 8,
  //   name: 'Oxygen',
  //   weight: 15.9994,
  //   symbol: 'O',
  //   test1: 'test1',
  //   test2: 'test2',
  //   test3: 'test3',
  //   test4: 'test4',
  //   test5: 'test5',
  //   test6: 'test6',
  //   test7: 'test7',
  //   test8: 'test8',
  // },
  // {
  //   position: 9,
  //   name: 'Fluorine',
  //   weight: 18.9984,
  //   symbol: 'F',
  //   test1: 'test1',
  //   test2: 'test2',
  //   test3: 'test3',
  //   test4: 'test4',
  //   test5: 'test5',
  //   test6: 'test6',
  //   test7: 'test7',
  //   test8: 'test8',
  // },
  // {
  //   position: 10,
  //   name: 'Neon',
  //   weight: 20.1797,
  //   symbol: 'Ne',
  //   test1: 'test1',
  //   test2: 'test2',
  //   test3: 'test3',
  //   test4: 'test4',
  //   test5: 'test5',
  //   test6: 'test6',
  //   test7: 'test7',
  //   test8: 'test8',
  // },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    CustomEventDirective,
    CustomInputComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-font';
  testForm!: FormGroup;
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
    'test7',
    'test8',
  ];
  dataSource = ELEMENT_DATA;

  options: any[] = [];
  optionsTwo: string[] = ['one', 'two', 'three'];
  page = 1;
  pageSize = 20;
  isLoading = false;
  lastQuery = '';
  enterPressed = true;
  testInput = '';

  constructor(private service: AutocompleteService, private fb: FormBuilder) {}

  ngOnInit() {
    this.testForm = this.fb.group({
      testInput: '',
    });
  }

  onEnter() {
    console.log('enter');
  }

  onChange(e: any) {
    console.log('change', e);
  }

  value: string = ''; // The current value of the input
  private oldValue: string = ''; // Stores the previous value

  storeOldValue() {
    console.log('focus');
    this.oldValue = this.testForm.get('testInput')?.value; // Store the initial value when focused
  }

  onBlurChange() {
    if (this.testForm.get('testInput')?.value !== this.oldValue) {
      // Perform any action like emitting an event or updating state
    }
  }
}
