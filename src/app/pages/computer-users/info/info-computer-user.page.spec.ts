import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoComputerUserPage } from './info-computer-user.page';

describe('InfoComputerUserPage', () => {
  let component: InfoComputerUserPage;
  let fixture: ComponentFixture<InfoComputerUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoComputerUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComputerUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
