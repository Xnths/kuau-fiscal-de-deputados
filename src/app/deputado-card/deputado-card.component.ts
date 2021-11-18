import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deputado-card',
  templateUrl: './deputado-card.component.html',
  styleUrls: ['./deputado-card.component.css']
})
export class DeputadoCardComponent implements OnInit {
  deputados = [
    {
      nome: 'Jonathas Castilho',
      estado: 'São Paulo',
      partido: 'PT',
    },
    {
      nome: 'Lucas Gabriel Sobrinho de Melo',
      estado: 'Minas Gerais',
      partido: 'PSDB',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  atualizar(): void {
    this.deputados.push({nome: 'Maria Julia', estado: 'Alagoas', partido: 'PT'})
  }

  apagar(): void {
    this.deputados = [];
  }

}
