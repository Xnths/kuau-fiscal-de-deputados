import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Deputado } from '../models/deputado.model';

@Component({
  selector: 'app-deputado-card',
  templateUrl: './deputado-card.component.html',
  styleUrls: ['./deputado-card.component.css']
})
export class DeputadoCardComponent implements OnInit {
  readonly apiURL : string;
  list!: any;
  deputados: any = [];
  limite: number = 10;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://dadosabertos.camara.leg.br/api/v2'
   }

  ngOnInit(): void {
    this.http.get(`${this.apiURL}/deputados`, {
      params:{
        siglaSexo: 'M',
        itens: this.limite,
      }
    })
      .subscribe(Response => {
        this.list = {...Response};
        for(let i=0; i < this.limite; i++){
          let dado = this.list.dados[i];

          console.log(dado);

          this.deputados.push({...dado});
        }
      })

  }

}
