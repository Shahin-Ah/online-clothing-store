import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { MatMenuTrigger, MatMenuPanel } from '@angular/material/menu';
import {
  FlexibleConnectedPositionStrategy,
  OverlayRef,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { take } from 'rxjs';

@Directive({
  selector: '[center-mat-menu]',
})
export class CenterMatmenuDirective implements OnDestroy  {
  overlayRef: OverlayRef;
  overlayConf: OverlayConfig;
  dropDown: HTMLElement;
  overlayPositionBox: HTMLElement;
  menu: MatMenuPanel;
  button: HTMLElement;
  buttonWidth: number;
  buttonLeft: number;
  buttonBottom: number;
  arrowDiv: HTMLDivElement;

  @Input('center-mat-menu') private menuTrigger: MatMenuTrigger;

  constructor(private _menuButton: ElementRef, private _renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onclick(e) {
    this._setVariables();
    //menu not opened by keyboard down arrow, have to set this so MatMenuTrigger knows the menu was opened with a mouse click
    this.menuTrigger['_openedBy'] = e.button === 0 ? 'mouse' : null;

    this._overrideMatMenu();

    this.dropDown = this.overlayRef.overlayElement.children[0].children[0] as HTMLElement;
    this.overlayPositionBox = this.overlayRef.hostElement as HTMLElement;
    setTimeout(() => {
      this._styleDropDown(this.dropDown);
      //this._renderer.setStyle(this.overlayPositionBox.children[0].children[0], 'padding', '30px');
      this._setOverlayPosition(this.dropDown, this.overlayPositionBox);
      this._openMenu();
    });
  }

  private _setVariables() {
    this.menu = this.menuTrigger.menu;
    const config = this.menuTrigger['_getOverlayConfig'](this.menu);
    this.menuTrigger['_overlayRef'] =
      this.menuTrigger['_overlay'].create(config);
    this.overlayRef = this.menuTrigger['_overlayRef'];
    this.overlayConf = this.overlayRef.getConfig();
    this.overlayRef.keydownEvents().subscribe();
    this.menu = this.menuTrigger.menu;
    this._setButtonVars();
  }

  private _setButtonVars() {
    this.button = this._menuButton.nativeElement;
    this.buttonWidth = this.button.getBoundingClientRect().width;
    this.buttonLeft = this.button.getBoundingClientRect().left;
    this.buttonBottom = this.button.getBoundingClientRect().bottom;
  }

  private _overrideMatMenu() {
    let strat = this.overlayConf
      .positionStrategy as FlexibleConnectedPositionStrategy;
    this.menuTrigger['_setPosition'](this.menu, strat);
    strat.positionChanges.subscribe(() => {

      this._setButtonVars();
      this._setOverlayPosition(this.dropDown, this.overlayPositionBox);
    });
    this.overlayConf.hasBackdrop =
      this.menu.hasBackdrop == null
        ? !this.menuTrigger.triggersSubmenu()
        : this.menu.hasBackdrop;

    const portal = this.menuTrigger['_getPortal'](this.menu);
    this.overlayRef.attach(portal);

    if (this.menu.lazyContent) {
      this.menu.lazyContent.attach();
    }

    this.menuTrigger['_closeSubscription'] = this.menuTrigger[
      '_menuClosingActions'
    ]()
      .pipe(take(1))
      .subscribe(() => {
        this.menuTrigger.closeMenu();
        setTimeout(() => {
          this._renderer.removeChild(this.button, this.arrowDiv);
        }, 75);
      });
    this.menuTrigger['_initMenu'](this.menu);
  }

  private _styleDropDown(dropDown: HTMLElement) {
    this.arrowDiv = this._renderer.createElement('div');
    this._renderer.addClass(this.arrowDiv, 'dialog-arrow');
    this._renderer.appendChild(this.button, this.arrowDiv);
    this._renderer.setStyle(
      this.arrowDiv,
      'left',
      this.buttonWidth / 2 - 10 + 'px'
    );
    this._renderer.setStyle(
      this._renderer.parentNode(dropDown),
      'transform-origin',
      'center top 0px'
    );
  }

  private _setOverlayPosition(
    dropDown: HTMLElement,
    overlayPositionBox: HTMLElement
  ) {
    let dropDownleft =
      this.buttonWidth / 2 + this.buttonLeft - dropDown.offsetWidth / 2;

    this._renderer.setStyle(
      overlayPositionBox,
      'top',
      this.buttonBottom + 9 + 'px'
    );
    this._renderer.setStyle(overlayPositionBox, 'left', dropDownleft + 'px');
    this._renderer.setStyle(overlayPositionBox, 'width', 'fit-content');
    this._renderer.setStyle(overlayPositionBox, 'right', 'unset');
    this._renderer.setStyle(overlayPositionBox.children[0], 'left', '0');
    this._renderer.setStyle(overlayPositionBox.children[0], 'top', '0');
  }

  private _openMenu() {
    this.menuTrigger.menu['_startAnimation']();
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }


  }
}
