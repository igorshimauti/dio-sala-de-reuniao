import { Component, OnInit } from '@angular/core';
import { Sala } from '../sala.model';
import { SalaService } from '../sala.service';

@Component({
  selector: 'app-read-sala',
  templateUrl: './read-sala.component.html',
  styleUrls: ['./read-sala.component.css']
})
export class ReadSalaComponent implements OnInit {

  salas: Sala[] = [];
  displayedColumns = ['nome', 'data', 'horaInicio', 'horaFim', 'action'];

  constructor(private salaService: SalaService) { }

  ngOnInit(): void {
    this.salaService.read().subscribe(salas => {
      this.salas = salas;
    });
  }
}