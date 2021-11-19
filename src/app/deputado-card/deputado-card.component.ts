import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-deputado-card',
  templateUrl: './deputado-card.component.html',
  styleUrls: ['./deputado-card.component.css']
})
export class DeputadoCardComponent implements OnChanges {
  @Input() pesquisaInfo!: any;

  readonly apiURL : string;

  list!: any;
  deputados: any = [];
  limite: number = 10;
  @Input() pagina: number = 1;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://dadosabertos.camara.leg.br/api/v2'
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.limparPesquisa();
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
        for(let i=0; i < this.limite; i++){
          let dado = this.list.dados[i];

          this.deputados.push({...dado});
        }
        console.log(Response);
      })
      console.log(this.pagina);
  }

  limparPesquisa(){
    this.deputados = [];
  }

}
