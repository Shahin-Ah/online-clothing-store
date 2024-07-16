import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingWidgetsComponent } from './shopping-widgets.component';

describe('ShoppingWidgetsComponent', () => {
  let component: ShoppingWidgetsComponent;
  let fixture: ComponentFixture<ShoppingWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingWidgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
