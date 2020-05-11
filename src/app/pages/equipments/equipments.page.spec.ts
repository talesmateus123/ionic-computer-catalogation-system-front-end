import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipmentsPage } from './equipments.page';

describe('EquipmentsPage', () => {
  let component: EquipmentsPage;
  let fixture: ComponentFixture<EquipmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
