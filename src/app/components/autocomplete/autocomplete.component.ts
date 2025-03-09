import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements OnInit, OnChanges, OnDestroy {
  myControl = new FormControl();

  @Input() options: string[] = [];
  @Input() isLoading = false;
  @Input() enableScrollLoading = false; // Toggle for scroll-based loading
  @Output() search = new EventEmitter<string>();
  @Output() loadMore = new EventEmitter<void>();
  @Output() inputChange = new EventEmitter<string>();

  @ViewChild(MatAutocompleteTrigger) autoTrigger!: MatAutocompleteTrigger;

  private buffScrollHeight = 0;
  private subscription?: Subscription;
  lastQuery = '';
  thresholdPercent = 0.95;

  filterOption: string[] = [];

  constructor() {}

  ngOnInit() {
    this.myControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.inputChange.emit(value);
      if (!this.enableScrollLoading) {
        this.filterOption = this.options;
        this.filterOptions();
      }
    });
  }

  ngOnChanges() {
    console.log(this.enableScrollLoading);
    if (!this.enableScrollLoading) {
      this.filterOptions();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private filterOptions() {
    if (this.myControl.value) {
      this.filterOption = this.options.filter((option) =>
        option.toLowerCase().includes(this.myControl.value.toLowerCase())
      );
    }
  }

  onSearch() {
    this.lastQuery = this.myControl.value;
    this.search.emit(this.lastQuery);
  }

  open() {
    if (!this.enableScrollLoading) return;
    const panel = document.querySelector('.mat-mdc-autocomplete-panel');
    if (panel) {
      this.subscription = fromEvent(panel, 'scroll').subscribe((e) => {
        const { scrollTop, scrollHeight, clientHeight } =
          e.target as HTMLElement;
        const threshold = this.thresholdPercent * scrollHeight;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;

        if (isAtBottom && this.buffScrollHeight !== scrollHeight) {
          this.buffScrollHeight = scrollHeight;
          this.loadMore.emit();
        }
      });
    }
  }

  select(event: MatAutocompleteSelectedEvent) {
    this.myControl.setValue(event.option.value);
  }

  // ControlValueAccessor Methods
  writeValue(value: any): void {
    this.myControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.myControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.myControl.disable() : this.myControl.enable();
  }
}
