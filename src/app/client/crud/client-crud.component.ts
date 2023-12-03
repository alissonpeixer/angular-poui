import { Component } from '@angular/core';
import { ForceOptionComponentEnum } from '@po-ui/ng-components';
import {
  PoPageDynamicEditActions,
  PoPageDynamicEditField,
  PoPageDynamicEditLiterals,
} from '@po-ui/ng-templates';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-client-crud',
  templateUrl: './client-crud.component.html',
  styleUrl: './client-crud.component.css',
})
export class ClientCrudComponent {
  public readonly literals: PoPageDynamicEditLiterals = {
    pageActionCancel: 'Descartar',
    pageActionSave: 'Gravar',
  };

  public readonly actions: PoPageDynamicEditActions = {
    save: '/cliente',
  };

  private readonly url: string = environment.apiUrl;

  fields: Array<PoPageDynamicEditField> = [
    {
      property: 'CA1NOME',
      label: 'Nome',
      key: true,
      required: true,
      showRequired: true,
      gridMdColumns: 12,
      gridLgColumns: 6,
      gridXlColumns: 6,
      minLength: 4,
      maxLength: 50,
    },
    {
      property: 'CA1NREDUZ',
      label: 'Nome Fantasia',
      required: true,
      showRequired: true,
      gridMdColumns: 12,
      gridLgColumns: 12,
      gridXlColumns: 6,
    },
    {
      property: 'CA1LOJA',
      label: 'Loja',
      fieldLabel: 'CM0NOME',
      fieldValue: 'CM0CODFIL',
      required: true,
      showRequired: true,
      gridMdColumns: 12,
      gridLgColumns: 12,
      gridXlColumns: 6,
      optionsService: `${this.url}/company`,
    },
    {
      property: 'CA1TIPO',
      label: 'Tipo Pessoa',
      required: true,
      showRequired: true,
      gridMdColumns: 12,
      gridLgColumns: 6,
      gridXlColumns: 6,
      forceOptionsComponentType: ForceOptionComponentEnum.select,
      options: [
        { label: 'Fisica', value: 'F' },
        { label: 'Júridica', value: 'J' },
      ],
    },
    {
      property: 'CSA1PAIS',
      label: 'Pais',
      fieldLabel: 'CCODGI',
      fieldValue: 'CSISEXP',
      required: true,
      showRequired: true,
      optionsService: `${this.url}/pais`,
      format: ['CCODGI', 'CSISEXP'],
    },
    {
      property: 'CA1EST',
      label: 'Estado',
      required: true,
      showRequired: true,
      gridMdColumns: 12,
      gridLgColumns: 6,
      fieldLabel: 'X5DESCRI',
      fieldValue: 'C2EST',
      optionsService: `${this.url}/estado`,
      validate: this.onChangeEstado.bind(this),
      clean: true,
    },
    {
      property: 'CA1END',
      label: 'Endereço',
      required: true,
      showRequired: true,
      gridMdColumns: 12,
      gridLgColumns: 6,
    },
    {
      property: 'CA1MUN',
      label: 'Múnicipio',
      fieldLabel: 'CC2MUN',
      fieldValue: 'CC2CODMUN',
      required: true,
      showRequired: true,
      gridMdColumns: 12,
      gridLgColumns: 6,
      disabled: true,
      optionsService: `${this.url}/municipio`,
    },
  ];

  constructor() {}

  onChangeEstado(model: any) {
    console.log(model);
    this.fields = this.fields.map((i) => {
      if (i.property === 'CA1MUN') {
        return {
          ...i,
          params: { estado: model.value },
          disabled: !model.value,
        };
      }

      return { ...i };
    });
  }
}
