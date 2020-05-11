import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewEquipmentPage } from './new-equipment.page';

describe('NewEquipmentPage', () => {
  let component: NewEquipmentPage;
  let fixture: ComponentFixture<NewEquipmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEquipmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewEquipmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
