import { Identity } from './identity';

describe('Identity', () => {

  // TUV-53: Verifica che la classe venga istanziata correttamente
  it('should create an instance', () => {
    expect(new Identity()).toBeTruthy();
  });
});
