import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchComputerUserModalPage } from './search-computer-user-modal.page';

describe('SearchComputerUserModalPage', () => {
  let component: SearchComputerUserModalPage;
  let fixture: ComponentFixture<SearchComputerUserModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComputerUserModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComputerUserModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
