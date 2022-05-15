import {Validators} from "@angular/forms";

export interface VarExogenasMaquinas {
  HTra: number,
  NMaxD: number,
  iProMa: number,
  pMaqDesc: number,
  PVenProd: number,
  CProMaqNor: number,
  CProMaqEme: number,
  CRep: number,
  Cfijo: number,
}
export interface VarEstadoMaquinas{
  cNMaxD: number,
  rEstMaq: number,
  rTFallMaq: number,
  ProdMaqNorDia: number,
  ProdMaqEmerDia: number,
  TiempRep: number,
  rTiempRep: number,
  GVenDia: number,
  CproDia: number,
  BNetDia: number,
  BNetT: number,
  CTRepD: number,
  ProdMaqNorT: number,
  ProdMaqEmerT: number,
  CAd: number,
}
export interface VarEndogenaMaquinas{
  BNetPromDia : number,
  PPromMaqNor : number,
  PPromMaqEmer : number,
  CostAdT : number
}
