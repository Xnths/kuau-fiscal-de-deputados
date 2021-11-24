import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-deputado-card',
  templateUrl: './deputado-card.component.html',
  styleUrls: ['./deputado-card.component.css']
})
export class DeputadoCardComponent implements OnChanges {
  @Input() pesquisaInfo!: any;
  @Input() pagina: number = 1;
  @Output() aoDetalhar = new EventEmitter<any>();

  readonly apiURL : string;

  list!: any;

  deputados: any = [];
  urlPerfil!:string;
  limite: number = 6;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://dadosabertos.camara.leg.br/api/v2'
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.getDeputados();
  }

  @Output() atualizaDeputados(){
    this.getDeputados();
  }

  getDeputados(){
    this.http.get(`${this.apiURL}/deputados`, {
      params:{
        ...this.pesquisaInfo,
        itens: this.limite,
        pagina: this.pagina,
      }
    })
      .subscribe(Response => {
        this.list = {...Response};
        this.deputados = [];
        for(let i=0; i < this.list.dados.length; i++){
          let dado = this.list.dados[i];

          this.deputados.push({...dado});
        }
      })
  }

  detalharDeputado(deputado:any){
    const url = deputado.uri;
    this.aoDetalhar.emit(url);
  }

}
