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

  list!: any;

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.deputadoUrl){
      this.http.get(this.deputadoUrl)
        .subscribe(Response => {
          this.list = {...Response};
          let deputado = this.list.dados;

          this.deputado = ({
            foto: deputado.ultimoStatus.urlFoto,
            nome: deputado.nomeCivil,
            dataNascimento: deputado.dataNascimento,
            sexo: this.definirSexo(deputado.sexo),
            estado: deputado.ultimoStatus.siglaUf,
            email: deputado.ultimoStatus.email,
            link: deputado.urlWebsite,
            partido: deputado.ultimoStatus.siglaPartido,
          });
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
