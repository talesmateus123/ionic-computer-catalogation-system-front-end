import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchComputerUserPage } from './search-computer-user.page';

describe('SearchComputerUserPage', () => {
  let component: SearchComputerUserPage;
  let fixture: ComponentFixture<SearchComputerUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComputerUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComputerUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
