import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchEquipmentModalPage } from './search-equipment-modal.page';

describe('SearchEquipmentPage', () => {
  let component: SearchEquipmentModalPage;
  let fixture: ComponentFixture<SearchEquipmentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEquipmentModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchEquipmentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
