import {AfterViewInit, Component, OnInit, OnDestroy} from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { SettingsService } from 'app/services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  public color: string;
  public menuItems: object;
  public activeFontColor: string;
  public normalFontColor: string;
  public dividerBgColor: string;
  constructor(public settingsService: SettingsService) {
    this.menuItems = ROUTES;
    this.activeFontColor = 'rgba(0,0,0,1)';
    this.normalFontColor = 'rgba(255,255,255,1)';
    this.dividerBgColor = 'rgba(255, 255, 255, 1)';
  }

  ngOnInit() {
    this.color = this.settingsService.getSidebarFilter();
    this.settingsService.sidebarFilterUpdate.subscribe((filter: string) => {
      this.color = filter;
      if (filter === '#fff') {
        this.activeFontColor = 'rgba(0,0,0,1)';
      } else {
        this.activeFontColor = 'rgba(255,255,255,1)';
      }
    });
    this.settingsService.sidebarColorUpdate.subscribe((color: string) => {
      if (color === '#fff') {
        this.normalFontColor = 'rgba(0,0,0,1)';
        this.dividerBgColor = 'rgba(0,0,0,1)';
      } else {
        this.normalFontColor = 'rgba(255,255,255,1)';
        this.dividerBgColor = 'rgba(255, 255, 255, 1)';
      }
    });
  }
  ngOnDestroy() {
    this.settingsService.sidebarFilterUpdate.unsubscribe();
    this.settingsService.sidebarColorUpdate.unsubscribe();
  }

  ngAfterViewInit() {
  }
isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
