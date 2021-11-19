import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-deputado-perfil',
  templateUrl: './deputado-perfil.component.html',
  styleUrls: ['./deputado-perfil.component.css']
})
export class DeputadoPerfilComponent implements OnChanges {
  deputado!: any;
  @Input() deputadoUrl!: any;

  list!: any;

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.deputadoUrl){
      this.http.get(this.deputadoUrl)
        .subscribe(Response => {
          this.list = {...Response};
          let deputado = this.list.dados;

          this.deputado = ({
            nome: deputado.nomeCivil,
            dataNascimento: deputado.dataNascimento,
            sexo: this.definirSexo(deputado.sexo),
            estado: deputado.ultimoStatus.siglaUf,
            email: deputado.ultimoStatus.email,
            link: deputado.urlWebsite,
            partido: deputado.ultimoStatus.siglaPartido,
          });

          console.log(this.deputado, Response)
        })
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

}