import { Injectable } from '@angular/core';
import { MenuProps } from './interface/main-menus';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  constructor() {}

  permission(roles: any, menus: Array<MenuProps>): Array<MenuProps> {
    // console.log(roles);
    // console.log(menus);
    return menus.filter((menu) => {
      return roles.groups.find((i: any) => {
        menu.subItems = menu.subItems.filter((subMenu) => {
          return subMenu.subPermission.includes(i.value);
        });

        return menu.mainPermission.includes(i.value);
      })
        ? menu
        : undefined;
    });
  }
}
