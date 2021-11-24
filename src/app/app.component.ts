import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() aoDetalharPefil = new EventEmitter<any>();

  pesquisaInfo!: any;
  deputadoUrl!: any;
  pagina: number = 1;
  deputadosAtivo: boolean = true;
  perfilAtivo: boolean = false;

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
  }

  voltarPagina($event: any){
    if(this.pagina > 1){
      this.pagina--;
    }
  }

  recontarPaginaAtual(){
    this.pagina = 1;
  }

  detalhar($event: any){
    this.deputadoUrl = $event;
    this.deputadosAtivo = false;
    this.perfilAtivo = true;
    this.aoDetalharPefil.emit();
  }

  isAtivo(estado: any){
    let classe = "";
    if(!estado){
      classe = "invisible";
    } else {
      classe = "";
    }
    return classe;
  }

  isDeputadosAtivo(){
    return this.isAtivo(this.deputadosAtivo);
  }

  isPerfilAtivo(){
    return this.isAtivo(this.perfilAtivo);
  }

  fecharPefil(){
    this.perfilAtivo = false;
    this.deputadosAtivo = true;
  }
}
