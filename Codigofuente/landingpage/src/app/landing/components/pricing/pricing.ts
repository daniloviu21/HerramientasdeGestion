import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing implements AfterViewInit, OnDestroy {
  billingCycle: 'monthly' | 'annual' = 'annual';
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  toggleBilling() {
    this.billingCycle = this.billingCycle === 'monthly' ? 'annual' : 'monthly';
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer?.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      const targets = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
      targets.forEach((target: Element) => this.observer?.observe(target));
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
