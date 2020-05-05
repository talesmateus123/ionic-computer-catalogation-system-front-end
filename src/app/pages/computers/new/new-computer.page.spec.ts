import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewComputerPage } from './new-computer.page';

describe('NewComputerPage', () => {
  let component: NewComputerPage;
  let fixture: ComponentFixture<NewComputerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewComputerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewComputerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
