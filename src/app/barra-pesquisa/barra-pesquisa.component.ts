import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-barra-pesquisa',
  templateUrl: './barra-pesquisa.component.html',
  styleUrls: ['./barra-pesquisa.component.css']
})
export class BarraPesquisaComponent implements OnInit {
  nome: string = '';
  estado: string = '';
  partido: string = '';
  sexo: string = '';

  ativo: boolean = false;

  constructor() {
   }

  ngOnInit(): void {
    console.log();
  }

  mostrarBarra(){
    this.ativo = true;
  }

  esconderBarra(){
    this.ativo = false;
  }

  isAtivo(){
    let classe: string = "";

    if(!this.ativo){
      classe = "invisible";
    }

    return classe
  }

  pesquisar(){
    console.log({
      nome: this.nome,
      estado: this.estado,
      partido: this.partido,
      sexo: this.sexo,
    })
  }

}
