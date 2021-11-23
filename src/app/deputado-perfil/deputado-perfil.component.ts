import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-deputado-perfil',
  templateUrl: './deputado-perfil.component.html',
  styleUrls: ['./deputado-perfil.component.css']
})
export class DeputadoPerfilComponent implements OnChanges {
  @Input() deputadoUrl!: any;
  @Output() aoFecharPerfil = new EventEmitter();

  ativo!: boolean;
  deputado!: any;
  deputadoUltimoEvento!: any;
  deputadoProximoEvento!: any;
  deputadoUltimaDespesa!: any;
  deputadoMaiorDespesa!: any;
  deputadoDespesas!: any;

  listDeputado!: any;
  listEventos!: any;
  listUltimaDespesa!: any;
  listMaiorDespesa!: any;
  listDespesas!: any;

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.deputadoUrl){
      //Requisição /deputado/{id}
      this.http.get(this.deputadoUrl)
        .subscribe(Response => {
          this.listDeputado = {...Response};
          let deputado = this.listDeputado.dados;

          this.deputado = ({
            foto: deputado.ultimoStatus.urlFoto,
            nome: deputado.nomeCivil,
            dataNascimento: this.getData(deputado.dataNascimento),
            sexo: this.definirSexo(deputado.sexo),
            estado: deputado.ultimoStatus.siglaUf,
            email: deputado.ultimoStatus.email,
            link: deputado.urlWebsite,
            partido: deputado.ultimoStatus.siglaPartido,
          });
        })
      //Requisição /deputados/{id}/eventos
      this.http.get(`${this.deputadoUrl}/eventos`, {
        params:{
          //data da última eleição
          dataInicio: "2018-01-01",
          itens: 2,
          ordem: "desc",
          ordenarPor: "dataHoraInicio"
        }
      })
        .subscribe(Response => {
          this.listEventos = {...Response}
          let eventos = this.listEventos.dados;

          let ultimoEvento = this.getUltimoEvento(eventos);

          this.deputadoUltimoEvento = {
            tipo: ultimoEvento.descricaoTipo,
            inicio: this.getData(ultimoEvento.dataHoraInicio),
            termino: this.getData(ultimoEvento.dataHoraTermino),
            situacao: ultimoEvento.situacao
          }

          this.deputadoProximoEvento = {
            ...this.getProximoEvento(eventos)
          }
        })
      //Requisição para última despesa /deputados/{id}/despesas
      this.http.get(`${this.deputadoUrl}/despesas`, {
        params: {
          itens: 1,
          ordenarPor: "dataDocumento"
        }
      })
        .subscribe(Response => {
          this.listUltimaDespesa = {...Response}
          let despesa = this.listUltimaDespesa.dados[0];

          this.deputadoUltimaDespesa = {
            tipo: despesa.tipoDespesa,
            valor: this.formatarValor(despesa.valorDocumento),
            data: this.getData(despesa.dataDocumento)
          }
        })
      //Requisição para maior despesa /deputados/{id}/despesas
      this.http.get(`${this.deputadoUrl}/despesas`, {
        params: {
          itens: 1,
          ordenarPor: "valorDocumento",
          ordem: "desc"
        }
      })
        .subscribe(Response => {
          this.listMaiorDespesa = {...Response};
          let despesa = this.listMaiorDespesa.dados[0];

          this.deputadoMaiorDespesa = {
            tipo: despesa.tipoDespesa,
            valor: this.formatarValor(despesa.valorDocumento),
            data: this.getData(despesa.dataDocumento),
          }
        })
    }
  }

  formatarValor(valor: any){
    let valorFormatado = "R$ " + valor.toFixed(2);
    return valorFormatado;
  }

  getData(data: any){
    let dataFormatada = "...";

    if(data){
      let pedacoData = data.substring(0, 10).split('-');
      dataFormatada = `${pedacoData[2]}/${pedacoData[1]}/${pedacoData[0]}`;
    }

    return dataFormatada;
  }

  getUltimoEvento(eventos: any){
    let data = new Date(eventos[0].dataHoraInicio);
    let hoje = new Date();

    if(data.getTime() > hoje.getTime()){
      return eventos[1];
    } else{
      return eventos[0];
    }
  }

  getProximoEvento(eventos: any){
    let data = new Date(eventos[0].dataHoraInicio)
    let hoje = new Date();

    let proximo;

    if(data.getTime() > hoje.getTime()){
      proximo = eventos[0];
    } else {
      proximo = undefined;
    }

    if(proximo){
      return {
        tipo: proximo.descricaoTipo,
        inicio: this.getData(proximo.dataHoraInicio),
        termino: this.getData(proximo.dataHoraTermino)
      }
    } else {
      return {
        tipo: "...",
        inicio: "...",
        situacao: "...",
      }
    }
  }

  definirSexo(sexo: string){
    let definicao = "";
    if(sexo == "M"){
      definicao = "Masculino"
    } else {
      definicao = "Feminino"
    }
    return definicao
  }

  isAtivo(){
    let classe = ""
    if(this.deputado == undefined){
      classe = "invisible";
    } else{
      classe=""
    }
    return classe;
  }

  fecharPefil(){
    this.ativo = false;

    this.aoFecharPerfil.emit();
  }

  detalharPefil(){
    this.ativo = true;
  }

}
