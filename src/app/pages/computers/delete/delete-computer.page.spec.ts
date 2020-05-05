import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteComputerPage } from './delete-computer.page';

describe('DeleteComputerPage', () => {
  let component: DeleteComputerPage;
  let fixture: ComponentFixture<DeleteComputerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteComputerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteComputerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
