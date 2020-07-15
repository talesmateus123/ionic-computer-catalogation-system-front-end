import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchElectronicComponentPage } from './search-electronic-component.page';

describe('SearchElectronicComponentPage', () => {
  let component: SearchElectronicComponentPage;
  let fixture: ComponentFixture<SearchElectronicComponentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchElectronicComponentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchElectronicComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
