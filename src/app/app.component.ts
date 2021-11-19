import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() aoMudarPagina = new EventEmitter<any>();

  pesquisaInfo!: any;
  pagina: number = 1;

  title = 'kuau-fiscal-de-deputados';

  pesquisar($event: any){
    const pesquisa = {...$event}
    this.pesquisaInfo = pesquisa;
    this.recontarPaginaAtual();
  }

  fecharPesquisa(){
    this.pesquisaInfo = {};
    this.recontarPaginaAtual();
  }

  mudarPagina($event: any){
    this.pagina++;
    this.aoMudarPagina.emit(this.pagina);
  }

  recontarPaginaAtual(){
    this.pagina = 1;
  }
}
