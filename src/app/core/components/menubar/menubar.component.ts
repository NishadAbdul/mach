import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenuBarComponent implements OnInit {
  menuList: any = [ 
    {
      title: 'Dashboard',
      icon: 'dashboard',
      subMenu: [],
      url: 'home/applications/welcome'
    },
    {
      title: 'Applications',
      icon: 'school',
      subMenu: [],
      url: 'home/applications/all-applications'
    },
    {
      title: 'Documents',
      icon: 'description',
      url: '',
      subMenu: []
    },
    {
      title: 'Payments',
      icon: 'payments',
      url: '',
      subMenu: []
    },
    {
      title: 'Reference',
      icon: 'checklist',
      url: '',
      subMenu: []
    },
    {
      title: 'Notifications',
      icon: 'notifications',
      url: '',
      subMenu: []
    }
  ]

  /* subMenu: [{
        title: 'Assembly',
        icon: 'account_balance',
        url: '/home/masterdata/assembly-list'
      },
      {
        title: 'Session Type',
        icon: 'meeting_room',
        url: '/home/masterdata/session-types'
      },
      {
        title: 'Session Management',
        icon: 'manage_accounts',
        url: '/home/masterdata/session-management'
      }*/
  public selectedMenu: any = {
    title: 'Dashboard',
    icon: 'dashboard',
    subMenu: [],
    url: 'home/applications/welcome'
  };
  public toggleMenu: boolean = false;
  constructor(public router: Router) {
    
  }

  ngOnInit(): void {  
    
  }

  triggerSubmenuClose() {
    this.toggleMenu = !this.toggleMenu;
  }

  toggleSubMenu(icons: any, previousIcons: any) {
    if(icons?.subMenu?.length === 0 && icons?.url !== '') {
      this.router.navigateByUrl(icons.url);
    } else {
      if (icons?.icon === previousIcons?.icon) {
        this.toggleMenu = !this.toggleMenu;
      } else {
        this.toggleMenu = true;
        this.selectedMenu = icons;
      } 
    }
     
  }

  redirectUrl(url: string) {
    this.router.navigateByUrl(url);
    this.toggleMenu = false;
  }

  

}
