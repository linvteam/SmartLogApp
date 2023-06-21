import { FileDroppedDirective } from './file-dropped.directive';

describe('FileDroppedDirective', () => {

  // TUV-21: Verifica che la classe venga istanziata correttamente
  it('should create an instance', () => {
    const directive = new FileDroppedDirective();
    expect(directive).toBeTruthy();
  });
});
