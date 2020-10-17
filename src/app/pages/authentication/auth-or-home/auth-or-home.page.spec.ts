import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthOrHomePage } from './auth-or-home.page';

describe('AuthOrHomePage', () => {
  let component: AuthOrHomePage;
  let fixture: ComponentFixture<AuthOrHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthOrHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthOrHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
