import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollObserverService implements OnDestroy {
  private observer!: IntersectionObserver;
  private elements = new Map<Element, (isVisible: boolean) => void>();

  constructor() {
    this.initObserver();
  }
  private initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = this.elements.get(entry.target);
          if (callback) {
            callback(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 }
    );
  }

  observe(element: Element, callback: (isVisible: boolean) => void) {
    this.elements.set(element, callback);
    this.observer.observe(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
    this.observer.unobserve(element);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
