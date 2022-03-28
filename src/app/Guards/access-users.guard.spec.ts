import { TestBed } from '@angular/core/testing';

import { AccessUsersGuard } from './access-users.guard';

describe('AccessUsersGuard', () => {
  let guard: AccessUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
