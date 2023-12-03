import { PoTableColumn } from '@po-ui/ng-components';
import { UserService } from '../service/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css'],
})
export class UsuariosListaComponent implements OnInit {
  items: Array<any> = [];

  public readonly columns: Array<PoTableColumn> = [
    { property: 'id', label: 'Cod Usuario' },
    { property: 'userName', label: 'Username' },
    { property: 'displayName', label: 'Nome' },
    { property: 'externalId', label: 'E-mail' },
    { property: 'active', label: 'Ativo', type: 'boolean' },
    { property: 'title', label: 'Cargo' },
  ];

  constructor(private listaService: UserService) {}

  ngOnInit(): void {
    this.listaService.getLista().subscribe((ret) => {
      console.log(ret.items);

      this.items = ret.items;
    });
  }

  mostrarDetalhes(): boolean {
    return true;
  }
}
