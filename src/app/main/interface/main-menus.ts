import { PoMenuItem } from '@po-ui/ng-components';

interface SubMenu extends PoMenuItem {
  subPermission: Array<string>;
}

export interface MenuProps extends PoMenuItem {
  mainPermission: Array<string>;
  subItems: Array<SubMenu>;
}
