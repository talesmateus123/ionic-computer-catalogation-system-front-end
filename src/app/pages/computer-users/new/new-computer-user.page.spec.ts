import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewComputerUserPage } from './new-computer-user.page';

describe('NewComputerUserPage', () => {
  let component: NewComputerUserPage;
  let fixture: ComponentFixture<NewComputerUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewComputerUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewComputerUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
