import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchSectorPage } from './search-sector.page';

describe('SearchSectorPage', () => {
  let component: SearchSectorPage;
  let fixture: ComponentFixture<SearchSectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
