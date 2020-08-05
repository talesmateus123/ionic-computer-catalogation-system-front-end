import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoEquipmentPage } from './info-equipment.page';

describe('InfoEquipmentPage', () => {
  let component: InfoEquipmentPage;
  let fixture: ComponentFixture<InfoEquipmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEquipmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoEquipmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
