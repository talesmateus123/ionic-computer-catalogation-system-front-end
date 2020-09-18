import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchSupportModalPage } from './search-support-modal.page';

describe('SearchSupportModalPage', () => {
  let component: SearchSupportModalPage;
  let fixture: ComponentFixture<SearchSupportModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSupportModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSupportModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
