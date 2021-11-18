export class Deputado{
  id!: number;
  foto!: string;
  nome!: string;
  partido!: string;
  estado!: string;

  show() {
    console.log(this.nome);
  }
}
