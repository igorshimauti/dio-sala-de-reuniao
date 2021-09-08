import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sala } from '../sala.model';
import { SalaService } from '../sala.service';

@Component({
  selector: 'app-delete-sala',
  templateUrl: './delete-sala.component.html',
  styleUrls: ['./delete-sala.component.css']
})
export class DeleteSalaComponent implements OnInit {

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
    const id = this.route.snapshot.paramMap.get("id");
    this.salaService.readById(id ? id : '').subscribe(sala => {
      this.sala = sala;
    });
  }

  delete(): void {
    this.salaService.delete(this.sala).subscribe(() => {
      this.salaService.showMessage("Sala excluída com sucesso.");
      this.router.navigate(['/salas']);
    });
  }

  cancel(): void {
    this.router.navigate(['/salas']);
  }
}