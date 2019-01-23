import { inject,observable, Static } from 'dob';
@observable
export default class PageAddStore {
    public pages = new Map<string, IPage>();
    public currentEditPageKey: string = null;
     /**
   * Current create page key
   */
  public currentCreatedPageKey: string = null;
  /**
   * The page key used by viewport at present
   */
  public currentViewportPageKey: string = null;
    /**
   * Current edit page
   */
  public get currentEditPage() {
    return this.pages.get(this.currentEditPageKey);
  }
    /**
   * 根结点 pagekeys，因为树状图没有根节点，又要保证顺序，故存储根节点数组
   */
  public rootPageKeys: string[] = [];
   /**
   * Page folder list
   */
  public get pageFolderList() {
    return Array.from(this.pages)
      .filter(([pageKey, pageInfo], index) => {
        return pageInfo.type === 'folder';
      })
      .map(([pageKey, pageInfo], index) => {
        return pageKey;
      });
  }
  /**
   * Current edit page real path
   */
  public get currentEditPageRealPath() {
    if (!this.currentEditPageKey) {
      return null;
    }

    const pageInfo = this.pages.get(this.currentEditPageKey);

    if (pageInfo.type !== 'page') {
      return null;
    }

    let realPath = pageInfo.path;

    let tempPageInfo = pageInfo;
    while (tempPageInfo.parentKey !== null) {
      const parentPageInfo = this.pages.get(tempPageInfo.parentKey);
      realPath = parentPageInfo.path + '/' + realPath;
      tempPageInfo = parentPageInfo;
    }

    return realPath;
  }
}
