import { StoreProps } from 'gaea-editor/src/stores';
import PageAddAction from './action';
import PageAddStore from './store';
export class Props extends StoreProps< {
    PageAddAction: PageAddAction;
  },
  {
    PageAddStore: PageAddStore;
  }> {}
export class State {}
