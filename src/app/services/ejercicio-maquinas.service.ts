import { Injectable } from '@angular/core';
import {VarEndogenaMaquinas, VarEstadoMaquinas, VarExogenasMaquinas} from "../models/maquinas";

@Injectable({
  providedIn: 'root'
})


export class EjercicioMaquinasService{
  auxRTFallMaq: number=0;
  auxRTiempRep: number=0;

  constructor() {
  }
  HTra: number=0;
  NMaxD: number=0;
  iProMa: number=0;
  pMaqDesc: number=0;
  PVenProd: number=0;
  CProMaqNor: number=0;
  CProMaqEme: number=0;
  CRep: number=0;
  Cfijo: number=0;

  cNMaxD: number=0;
  rEstMaq: number=0;
  rTFallMaq: number=0;
  ProdMaqNorDia: number=0;
  ProdMaqEmerDia: number=0;
  TiempRep: number=0;
  rTiempRep: number=0;
  GVenDia: number=0;
  CproDia: number=0;
  BNetDia: number=0;
  BNetT: number=0;
  CTRepD: number=0;
  ProdMaqNorT: number=0;
  ProdMaqEmerT: number=0;
  CAd: number=0;

  BNetPromDia : number=0;
  PPromMaqNor : number=0;
  PPromMaqEmer : number=0;
  CostAdT : number=0;

  tiempAux:number=0;

  public varEndogenaMaquinas:VarEndogenaMaquinas={
    BNetPromDia: 0,
    CostAdT: 0,
    PPromMaqEmer: 0,
    PPromMaqNor: 0
  }

  public listVarEstadoMaquina:VarEstadoMaquinas[]=[];


  public ejecutarAlgoritmo(exogenas:VarExogenasMaquinas){
    this.inicializarVariables(exogenas);
  }

  private inicializarVariables(exogenas: VarExogenasMaquinas) {
    this.listVarEstadoMaquina = [];
    this.HTra=exogenas.HTra;
    this.NMaxD=exogenas.NMaxD;
    this.iProMa=exogenas.iProMa;
    this.pMaqDesc=exogenas.pMaqDesc;
    this.PVenProd=exogenas.PVenProd;
    this.CProMaqNor=exogenas.CProMaqNor;
    this.CProMaqEme=exogenas.CProMaqEme;
    this.CRep=exogenas.CRep;
    this.Cfijo=exogenas.Cfijo;

    this.cNMaxD=0;
    this.rEstMaq=0;
    this.rTFallMaq=0;
    this.ProdMaqNorDia=0;
    this.ProdMaqEmerDia=0;
    this.TiempRep=0;
    this.rTiempRep=0;
    this.GVenDia=0;
    this.CproDia=0;
    this.BNetDia=0;
    this.BNetT=0;
    this.CTRepD=0;
    this.ProdMaqNorT=0;
    this.ProdMaqEmerT=0;
    this.CAd=0;
    this.actualizarContadorDias();
  }
  private actualizarContadorDias(){
    this.cNMaxD = this.cNMaxD +1;
    this.tiempAux=0;
    this.auxRTFallMaq=0;
    this.auxRTiempRep=0;

    this.generarAleatorioEstadoMaquina();
  }
  private generarAleatorioEstadoMaquina(){
    let numberRandom =Math.random();
    this.rEstMaq= Number(numberRandom.toFixed(5));
    console.log(`DIA: ${this.cNMaxD}, ALEATORIO: ${this.rEstMaq}`)
    this.verificarEstadoMaquina();
  }
  private verificarEstadoMaquina(){
    if(this.rEstMaq < this.pMaqDesc){
      this.generarAleatorioTipoFalla();
    }else{
      this.verificarTiempoReparacionExistente();
    }
  }

  private verificarTiempoReparacionExistente(){
    if(this.TiempRep == 0){
      this.calcularProduccionMaquinaNormalCaso1();
    }else{

      this.verificarTiempoFalla();
    }
  }

  private calcularProduccionMaquinaNormalCaso1(){
    this.ProdMaqNorDia = this.iProMa;
    this.ProdMaqNorT = this.ProdMaqNorT + this.ProdMaqNorDia;
    this.calcularCostoProduccionDiaCaso1();
  }

  private calcularCostoProduccionDiaCaso1(){
    this.CproDia = this.ProdMaqNorDia * this.CProMaqNor;
    this.calcularGananciaVentasDiaCaso1();
  }

  private calcularGananciaVentasDiaCaso1(){
    this.GVenDia=this.ProdMaqNorDia * this.PVenProd;
    this.calcularBeneficioNetoDia();
  }


  private generarAleatorioTipoFalla(){
    let numberRandom =Math.random();
    this.rTFallMaq= Number(numberRandom.toFixed(5));

    this.auxRTFallMaq=this.rTFallMaq;
    this.verificarTipoFalla();
  }
  private verificarTipoFalla(){
    if(0<=this.rTFallMaq && this.rTFallMaq< (15/85)){
      this.auxRTiempRep=0;
      this.TiempRep=this.TiempRep+3;
    }else if( (15/85) <=this.rTFallMaq && this.rTFallMaq< (55/85) ){
      let numberRandom =Math.random();
      this.rTiempRep= Number(numberRandom.toFixed(5));
      this.auxRTiempRep=this.rTiempRep;
      let time=4+(8-4)*this.rTiempRep;
      this.TiempRep= this.TiempRep +Number(time.toFixed(0))

    }else if( (55/85) <=this.rTFallMaq && this.rTFallMaq< (75/85) ){
      let numberRandom =Math.random();
      this.rTiempRep= Number(numberRandom.toFixed(5));
      this.auxRTiempRep=this.rTiempRep;
      let time=-10 * Math.log(1-this.rTiempRep);
      this.TiempRep= this.TiempRep +Number(time.toFixed(0))
    }else{
      let numberRandom =Math.random();
      this.rTiempRep= Number(numberRandom.toFixed(5));
      this.auxRTiempRep=this.rTiempRep;
      let time=11+(16-11)*this.rTiempRep;
      this.TiempRep= this.TiempRep +Number(time.toFixed(0))
    }
    this.verificarTiempoFalla();
  }

  private verificarTiempoFalla() {
    console.log(`TIEMPO REPARACION: ${this.TiempRep}`)
    this.tiempAux=this.TiempRep;
    if(this.TiempRep>= this.HTra){
      this.calcularCostoReparacionDiaCaso2();
    }else{
      this.calcularCostoReparacionDiaCaso3();

    }
  }
  private calcularCostoReparacionDiaCaso3(){
    this.CTRepD=this.CRep*this.TiempRep;
    this.CAd= this.CAd+this.CTRepD;
    this.calcularProduccionMaquinaEmergenciaCaso3();
  }
  private calcularProduccionMaquinaEmergenciaCaso3(){
    this.ProdMaqEmerDia=(this.iProMa/this.HTra)*this.TiempRep;
    this.ProdMaqEmerT= this.ProdMaqEmerT+ this.ProdMaqEmerDia;
    this.calcularProduccionMaquinaNormalCaso3();
  }
  private calcularProduccionMaquinaNormalCaso3(){
    this.ProdMaqNorDia=(this.iProMa/this.HTra)*(this.HTra-this.TiempRep);
    console.log(`PRODUCCION MAQUINA NORMAL DIA:${this.ProdMaqNorDia}`)
    this.ProdMaqNorT= this.ProdMaqNorT+ this.ProdMaqNorDia
    this.calcularCostoProduccionDiaCaso3();
  }
  private calcularCostoProduccionDiaCaso3(){
    this.CproDia = (this.ProdMaqNorDia *this.CProMaqNor) + (this.ProdMaqEmerDia *this.CProMaqEme) + this.CTRepD;
    this.calcularGananciaVentasDiaCaso3();
  }
  private calcularGananciaVentasDiaCaso3(){
    this.GVenDia = (this.ProdMaqNorDia*this.PVenProd)+(this.ProdMaqEmerDia * this.PVenProd);
    this.reiniciarTiempoEspera()
  }
  private reiniciarTiempoEspera(){
    this.TiempRep=0;
    this.calcularBeneficioNetoDia();
  }

  private calcularCostoReparacionDiaCaso2(){
    this.CTRepD = this.CRep*this.HTra;
    this.CAd=this.CAd + this.CTRepD;
    this.calcularProduccionMaquinaEmergenciaCaso2();
  }
  private calcularProduccionMaquinaEmergenciaCaso2(){
    this.ProdMaqEmerDia=this.iProMa;
    this.ProdMaqEmerT=this.ProdMaqEmerT+this.ProdMaqEmerDia;
    this.calcularCostoProduccionDiaCaso2();
  }
  private calcularCostoProduccionDiaCaso2(){
    this.CproDia=(this.ProdMaqEmerDia*this.CProMaqEme)+this.CTRepD
    this.calcularGananciaVentasDiaCaso2();
  }
  private calcularGananciaVentasDiaCaso2(){
    this.GVenDia=this.ProdMaqEmerDia*this.PVenProd;
    this.actualizarTiempoReparacion();
  }
  private actualizarTiempoReparacion(){
    this.TiempRep = this.TiempRep - this.HTra;
    console.log(this.TiempRep);
    this.calcularBeneficioNetoDia();

  }
  private calcularBeneficioNetoDia(){
    this.BNetDia=this.GVenDia-this.CproDia - this.Cfijo;
    console.log(`DIA: ${this.cNMaxD}; BENEFICIO NETO DIA: ${this.BNetDia}; GANANCIA VENTA DIA: ${this.GVenDia}; COSTO PRODUCCION DIA: ${this.CproDia}; COSTO FIJO: ${this.Cfijo};`);
    console.log(`----------------------------------------------------------------------------`)
    this.acumuladorBeneficioNetoTotal();
  }
  private acumuladorBeneficioNetoTotal(){
    this.BNetT = this.BNetT + this.BNetDia;
    this.listVarEstadoMaquina.push({
      BNetDia: this.BNetDia,
      BNetT: this.BNetT,
      CAd: this.CAd,
      CTRepD: this.CTRepD,
      CproDia: this.CproDia,
      GVenDia: this.GVenDia,
      ProdMaqEmerDia: this.ProdMaqEmerDia,
      ProdMaqEmerT: this.ProdMaqEmerT,
      ProdMaqNorDia: this.ProdMaqNorDia,
      ProdMaqNorT: this.ProdMaqNorT,
      TiempRep: this.tiempAux,
      cNMaxD: this.cNMaxD,
      rEstMaq: this.rEstMaq,
      rTFallMaq: this.auxRTFallMaq,
      rTiempRep: this.auxRTiempRep
    })
    this.verificarContadorDias();
  }
  private verificarContadorDias(){
    if(this.cNMaxD==this.NMaxD){
      this.calcularBeneficioPromedioDia();
    }else{
      this.actualizarContadorDias()
    }
  }
  private calcularBeneficioPromedioDia(){
    console.log(`BENEFICIO NETO: ${this.BNetT}`);
    this.BNetPromDia = this.BNetT / this.NMaxD
    this.calcularProduccionMaquinaNormalPromedio();
  }
  private calcularProduccionMaquinaNormalPromedio(){
    console.log(`MAQUINA NORMAL: ${this.ProdMaqNorT}`);
    this.PPromMaqNor =this.ProdMaqNorT/this.NMaxD;
    this.calcularProduccioniMaquinaEmergenciaPromedio();
  }
  private calcularProduccioniMaquinaEmergenciaPromedio(){
    console.log(`MAQUINA EMERGENCIA: ${this.ProdMaqEmerT}`);
    this.PPromMaqEmer =this.ProdMaqEmerT /this.NMaxD;
    this.generarResultadosFinales();
  }
  private generarResultadosFinales(){
    this.varEndogenaMaquinas = {
      BNetPromDia: Number(this.BNetPromDia.toFixed(3)),
      CostAdT: this.CAd,
      PPromMaqEmer: Number(this.PPromMaqEmer.toFixed(3)),
      PPromMaqNor: Number(this.PPromMaqNor.toFixed(3))
    }
    console.log(this.varEndogenaMaquinas);
  }
}

