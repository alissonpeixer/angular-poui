import { AuthGuard } from './../auth/auth.guard';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoMenuItem,
  PoRadioGroupOption,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { MenuProps } from './interface/main-menus';
import { MainMenuService } from './main-menu.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  actions: Array<PoToolbarAction> = [];

  profile: PoToolbarProfile = {
    avatar: 'https://via.placeholder.com/48x48?text=',
    subtitle: '',
    title: '',
  };

  profileActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-exit',
      label: 'Exit',
      type: 'danger',
      separator: true,
      action: this.actionLogou.bind(this),
    },
  ];

  menus: Array<MenuProps> = [
    {
      id: 'MENUCLIENTE',
      mainPermission: ['000000'],
      label: 'Cliente',
      icon: 'po-icon-align-left',
      shortLabel: 'Register',
      subItems: [
        {
          label: 'Resgistrar ',
          link: '/cliente/crud',
          subPermission: ['000000'],
        },
        { label: 'Listar ', link: '/cliente', subPermission: ['000000'] },
      ],
    },
    {
      id: 'MENUUSUARIO',
      mainPermission: ['000000'],
      label: 'Usuários',
      icon: 'po-icon-align-left',
      shortLabel: 'Register',
      subItems: [
        {
          label: 'Lista ',
          link: '/usuarios',
          subPermission: ['000000'],
        },
      ],
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private mainMenuService: MainMenuService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated();

    const data = JSON.parse(localStorage.getItem('user_data') || '');

    this.profile.avatar += data.userName.substring(0, 1).toUpperCase();
    this.profile.title = data.displayName;
    this.profile.subtitle = `@${data.userName}`;

    this.menus = this.mainMenuService.permission(data, this.menus);
  }

  actionLogou() {
    this.authService.logout();
    this.router.navigateByUrl('/signin');
  }
}
