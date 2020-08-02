import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComputerUsersModalPage } from './computer-users.page-modal';

describe('ComputerUsersModalPage', () => {
  let component: ComputerUsersModalPage;
  let fixture: ComponentFixture<ComputerUsersModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerUsersModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComputerUsersModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
