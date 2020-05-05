import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComputersPage } from './computers.page';

describe('ComputersPage', () => {
  let component: ComputersPage;
  let fixture: ComponentFixture<ComputersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComputersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
