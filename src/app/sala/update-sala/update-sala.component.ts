import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sala } from '../sala.model';
import { SalaService } from '../sala.service';

@Component({
  selector: 'app-update-sala',
  templateUrl: './update-sala.component.html',
  styleUrls: ['./update-sala.component.css']
})
export class UpdateSalaComponent implements OnInit {

  sala: Sala = {
    id: undefined,
    nome: "",
    data: undefined,
    horaInicio: "",
    horaFim: ""
  };

  constructor(private salaService: SalaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.salaService.readById(id ? id : '').subscribe(sala => {
      this.sala = sala;
    });
  }

  update(): void {
    this.salaService.update(this.sala).subscribe(() => {
      this.salaService.showMessage('Sala atualizada com sucesso.');
      this.router.navigate(['/salas']);
    });
  }

  cancel(): void {
    this.router.navigate(['/salas']);
  }
}