import { FileDroppedDirective } from './file-dropped.directive';

describe('FileDroppedDirective', () => {
  it('should create an instance', () => {
    const directive = new FileDroppedDirective();
    expect(directive).toBeTruthy();
  });

  it('should handle drag over empty', () => {
    let e: any = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: {
        files: [new File([''], 'test-file.txt')]
      }
    };

    const directive = new FileDroppedDirective();
    let spy_prevent = spyOn(e, 'preventDefault');
    let spy_propagation = spyOn(e, 'stopPropagation');

    directive.onDrop(e);

    expect(spy_prevent).toHaveBeenCalled();
    expect(spy_propagation).toHaveBeenCalled();
  });

  it('should handle drag over with values', () => {
    let e: any = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: {
        files: [new File(['a,v'], 'test-file.txt')]
      }
    };

    const directive = new FileDroppedDirective();
    let spy_prevent = spyOn(e, 'preventDefault');
    let spy_propagation = spyOn(e, 'stopPropagation');

    directive.onDrop(e);

    expect(spy_prevent).toHaveBeenCalled();
    expect(spy_propagation).toHaveBeenCalled();
  });

});
