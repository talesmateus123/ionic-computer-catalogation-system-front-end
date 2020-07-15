import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchEquipmentPage } from './search-equipment.page';

describe('SearchEquipmentPage', () => {
  let component: SearchEquipmentPage;
  let fixture: ComponentFixture<SearchEquipmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEquipmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchEquipmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
