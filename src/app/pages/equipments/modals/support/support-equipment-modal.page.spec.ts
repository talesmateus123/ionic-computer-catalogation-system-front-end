import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupportEquipmentModalPage } from './support-equipment-modal.page';

describe('SupportEquipmentModalPage', () => {
  let component: SupportEquipmentModalPage;
  let fixture: ComponentFixture<SupportEquipmentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportEquipmentModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportEquipmentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
