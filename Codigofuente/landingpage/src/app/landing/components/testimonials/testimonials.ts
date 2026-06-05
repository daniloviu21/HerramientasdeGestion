import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements AfterViewInit, OnDestroy {
  currentIndex = 0;
  testimonials = [
    {
      name: 'Cameron Williamson',
      role: 'Padre de familia',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
      text: 'Gracias a la plataforma pude identificar señales tempranas en el desarrollo de mi hijo. La información es clara y nos dio la confianza para acudir a un especialista a tiempo. Es una herramienta que realmente ayuda a los padres.'
    },
    {
      name: 'Brooklyn Simmons',
      role: 'Médico especialista',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200',
      text: 'La aplicación se ha convertido en un apoyo valioso en mi práctica clínica. Los reportes generados por la IA son claros, bien estructurados y facilitan el seguimiento de cada paciente sin reemplazar el criterio médico.'
    },
    {
      name: 'Marvin McKinney',
      role: 'Clínica / Centro de atención',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200',
      text: 'Implementar esta herramienta nos permitió mejorar la detección temprana y el seguimiento de los menores. La plataforma es segura, intuitiva y se adapta muy bien a las necesidades de un entorno clínico.'
    }
  ];

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  setSlide(index: number) {
    this.currentIndex = index;
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
