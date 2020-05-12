import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComputerUsersPage } from './computer-users.page';

describe('ComputerUsersPage', () => {
  let component: ComputerUsersPage;
  let fixture: ComponentFixture<ComputerUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComputerUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
