import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EjercicioMaquinasService} from "../services/ejercicio-maquinas.service";
import {VarEndogenaMaquinas, VarEstadoMaquinas, VarExogenasMaquinas} from "../models/maquinas";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-ejericio-maquinas',
  templateUrl: './ejericio-maquinas.component.html',
  styleUrls: ['./ejericio-maquinas.component.css']
})
export class EjericioMaquinasComponent implements OnInit {
  valid: boolean=false;
  hintColor:string = '#ff0000';
  generateData: FormGroup;
  varExogenasMaquinas:VarExogenasMaquinas={
    CProMaqEme: 0,
    CProMaqNor: 0,
    CRep: 0,
    Cfijo: 0,
    HTra: 0,
    NMaxD: 0,
    PVenProd: 0,
    iProMa: 0,
    pMaqDesc: 0
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<VarEstadoMaquinas>;
  displayedColumns = ['cNMaxD', 'rEstMaq', 'rTFallMaq','TiempRep','rTiempRep',
    'GVenDia','CproDia','BNetDia','BNetT','CTRepD','ProdMaqNorT','ProdMaqEmerT','CAd'];

  public varEndogenaMaquinas:VarEndogenaMaquinas={
    BNetPromDia: 0,
    CostAdT: 0,
    PPromMaqEmer: 0,
    PPromMaqNor: 0
  }

  public listVarEstadoMaquina:VarEstadoMaquinas[]=[];

  constructor(
    private fb:FormBuilder,
    private ejercicioMaquinasService:EjercicioMaquinasService
  ) {
    this.generateData = this.fb.group({
      HTra: ['', Validators.required],
      NMaxD: ['', Validators.required],
      iProMa: ['', Validators.required],
      pMaqDesc: ['', Validators.required],
      PVenProd: ['', Validators.required],
      CProMaqNor: ['', Validators.required],
      CProMaqEme: ['', Validators.required],
      CRep: ['', Validators.required],
      Cfijo: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    /***this.varExogenasMaquinas={
      CProMaqEme: 90,
      CProMaqNor: 70,
      CRep: 11,
      Cfijo: 1000,
      HTra: 10,
      NMaxD: 30,
      PVenProd: 100,
      iProMa: 1000,
      pMaqDesc: 0.3
    }
    this.ejercicioMaquinasService.ejecutarAlgoritmo(this.varExogenasMaquinas);*/
  }

  generarNumeros() {
    this.varExogenasMaquinas={
      CProMaqEme: this.generateData.value.CProMaqEme,
      CProMaqNor: this.generateData.value.CProMaqNor,
      CRep: this.generateData.value.CRep,
      Cfijo: this.generateData.value.Cfijo,
      HTra: this.generateData.value.HTra,
      NMaxD: this.generateData.value.NMaxD,
      PVenProd: this.generateData.value.PVenProd,
      iProMa: this.generateData.value.iProMa,
      pMaqDesc: this.generateData.value.pMaqDesc
    }
    this.ejercicioMaquinasService.ejecutarAlgoritmo(this.varExogenasMaquinas);
    this.varEndogenaMaquinas= this.ejercicioMaquinasService.varEndogenaMaquinas;
    this.listVarEstadoMaquina =this.ejercicioMaquinasService.listVarEstadoMaquina;
    this.visualizarResultados();
  }
  visualizarResultados(){
    this.dataSource= new MatTableDataSource<VarEstadoMaquinas>(this.listVarEstadoMaquina);
    this.dataSource.paginator = this.paginator;
  }
}
