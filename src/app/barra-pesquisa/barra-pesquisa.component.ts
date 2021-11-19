import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-barra-pesquisa',
  templateUrl: './barra-pesquisa.component.html',
  styleUrls: ['./barra-pesquisa.component.css']
})
export class BarraPesquisaComponent implements OnInit {
  @Output() aoPesquisar = new EventEmitter<any>();
  @Output() aoFecharPesquisa = new EventEmitter<any>();

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
    this.nome = "";
    this.estado = "";
    this.partido = "";
    this.sexo = "";
    this.aoFecharPesquisa.emit(null);
  }

  isAtivo(){
    let classe: string = "";

    if(!this.ativo){
      classe = "invisible";
    }

    return classe
  }

  pesquisar(){
    const pesquisaInfo = {
      nome: this.nome,
      siglaUf: this.estado,
      siglaPartido: this.partido,
      siglaSexo: this.sexo,
    }

    this.aoPesquisar.emit(pesquisaInfo);
  }

}
