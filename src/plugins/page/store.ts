import { inject,observable, Static } from 'dob';
import ViewportStore from 'gaea-editor/src/stores/viewport/store';
@observable
export default class PageStore {
    public currentCreatedPageKey: string = null;
    public currentEditPageKey: string = null;
    public pages = new Map<string, IPage>();
      /**
   * 根结点 pagekeys，因为树状图没有根节点，又要保证顺序，故存储根节点数组
   */
    public rootPageKeys: string[] = [];

      /**
   * Current edit page
   */
  public get currentEditPage() {
    return this.pages.get(this.currentEditPageKey);
  }
}
