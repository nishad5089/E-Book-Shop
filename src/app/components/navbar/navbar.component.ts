import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES } from '../sidebar/sidebar-routes.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    desktopSidebarMode = true;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    @Output() displaySidebar = new EventEmitter();
    constructor(location: Location,  private element: ElementRef, private router: Router) {
      this.location = location;
          this.sidebarVisible = false;
          this.desktopSidebarMode = true;
    }

    ngOnInit() {
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         const $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }
    isDesktopMenu() {
        if ($(window).width() > 991) {
            return true;
        }
        return false;
    };

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function() {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible === 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            // tslint:disable-next-line: no-use-before-declare
            if ($layer) {
                // tslint:disable-next-line: no-use-before-declare
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);
            // tslint:disable-next-line: no-var-keyword  tslint:disable-next-line: prefer-const
            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');

            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { // asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };
    deskSidebarOpen() {
        // setTimeout(() => {
        //     $('.sidebar').css('left', '0%');
        // }, 300)
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('sidebar-mini');
        $('.text').show();
        body.classList.add('sidebar-normal');
        this.desktopSidebarMode = true;
    }
    deskSidebarClose() {
      //  $('.sidebar').css('left', '-32%');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('sidebar-mini');
        $('.sidebar .collapse').css('height', 'auto');
        $('.text').hide();
        //  $('.main-panel').css('width', '95%');
        this.desktopSidebarMode = false;
    }
    toggleDesktopSidebar() {
        if (this.desktopSidebarMode === false) {
            this.deskSidebarOpen();
        } else {
            this.deskSidebarClose();
        }
    }
    getTitle() {
      let titlee = this.location.prepareExternalUrl(this.location.path());
      if (titlee.charAt(0) === '#') {
          titlee = titlee.slice( 1 );
      }

      for (let item = 0; item < this.listTitles.length; item++) {
          if (this.listTitles[item].path === titlee) {
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
}
