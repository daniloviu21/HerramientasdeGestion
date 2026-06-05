import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Navbar } from '../../components/navbar/navbar';
import { Inicio } from '../../components/inicio/inicio';
import { Sobrenosotros } from "../../components/sobrenosotros/sobrenosotros";
import { Footers } from '../../components/footers/footers';
import { Ventajas } from "../../../pages/ventajas/ventajas";
import { Pricing } from '../../components/pricing/pricing';
import { Testimonials } from '../../components/testimonials/testimonials';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Navbar, Inicio, Sobrenosotros, Footers, Ventajas, Pricing, Testimonials],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
