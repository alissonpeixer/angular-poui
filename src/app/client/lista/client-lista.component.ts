import { Component } from '@angular/core';
import {
  PoNotification,
  PoNotificationService,
  PoPageFilter,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-lista',
  templateUrl: './client-lista.component.html',
  styleUrls: ['./client-lista.component.css'],
})
export class ClientListaComponent {
  constructor(private poNotification: PoNotificationService) {}

  mostrarDetalhes(): boolean {
    return true;
  }
}
