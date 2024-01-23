import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IRespuestaGeneral } from '../../../modelos/respuesta-general.modelo';
import { ClientesService } from 'src/app/personal/servicios/clientes.service';
import { Cliente } from 'src/app/personal/modelos/cliente.modelo';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  idCliente: number = 0;

  clientes!: Cliente[];
  loading: boolean = true;

  public isDialogOpen = false;

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.consultarClientes();
  }

  clear(table: Table) {
    table.clear();
  }

  consultarClientes() {
    this.clientesService
      .consultarClientes()
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        if (respuesta.data.length > 0) {
          this.clientes = respuesta.data;
        }
        this.loading = false;
      });
  }

  openDialog(idCliente: number) {
    this.idCliente = idCliente;
    this.isDialogOpen = true;
  }

  onDialogAccepted() {
    this.isDialogOpen = false;
    this.consultarClientes();
  }

  onDialogCanceled() {
    this.isDialogOpen = false;
  }
}
