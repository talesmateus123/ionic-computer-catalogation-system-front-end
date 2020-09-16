import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpEquipmentModalPage } from './help-equipment-modal.page';

describe('HelpEquipmentModalPage', () => {
  let component: HelpEquipmentModalPage;
  let fixture: ComponentFixture<HelpEquipmentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpEquipmentModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpEquipmentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
