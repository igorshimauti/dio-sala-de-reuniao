import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sala } from '../sala.model';
import { SalaService } from '../sala.service';

@Component({
  selector: 'app-create-sala',
  templateUrl: './create-sala.component.html',
  styleUrls: ['./create-sala.component.css']
})
export class CreateSalaComponent implements OnInit {

  sala: Sala = {
    id: undefined,
    nome: "",
    data: undefined,
    horaInicio: "",
    horaFim: ""
  };

  constructor(private salaService: SalaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.salaService.create(this.sala).subscribe(() => {
      this.salaService.showMessage('Sala cadastrada com sucesso.');
      this.router.navigate(['/salas']);
    })
  }

  cancel(): void {
    this.router.navigate(['/salas']);
  }
}