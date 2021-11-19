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
    this.pagina = 1;
  }

  mudarPagina($event: any){
    this.pagina++;
    this.aoMudarPagina.emit(this.pagina);
  }
}
