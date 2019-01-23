import { Action, inject } from 'dob';
import * as _ from 'lodash';
import * as React from 'react';
import PageStore from './store';

export default class PageAction {
  @inject(PageStore) private store: PageStore;
   /**
   * 删除当前创建中的 page
   */
  @Action
  public RemoveCreatingPage() {
    if (this.store.currentCreatedPageKey !== null) {
      this.removePage(this.store.currentCreatedPageKey);
    }
    this.store.currentCreatedPageKey = null;
    this.store.currentEditPageKey = null;
  }

  @Action
  public removePage(pageKey: string) {
    const pageInfo = this.store.pages.get(pageKey);

    // 先从父级元素删除此 pageKey
    if (pageInfo.parentKey !== null) {
      const parentPage = this.store.pages.get(pageInfo.parentKey);
      const existIndex = parentPage.childs.findIndex(childKey => childKey === pageKey);
      parentPage.childs.splice(existIndex, 1);
    }

    // 如果是根节点，从根节点数组中删除
    if (!pageInfo.parentKey) {
      const existIndex = this.store.rootPageKeys.findIndex(rootPageKey => rootPageKey === pageKey);
      this.store.rootPageKeys.splice(existIndex, 1);
    }

    this.store.pages.delete(pageKey);
  }
    /**
   * 生成唯一的 page key
   */
  @Action
  public createNewPageKey() {
    return _.uniqueId('gaea_page_');
  }

   /**
   * 创建首页
   */
  @Action
  public createHomePage() {
    const pageKey = this.createNewPageKey();
    this.store.pages.set(pageKey, {
      type: 'page',
      name: '首页',
      path: '',
      parentKey: null,
      isHomePage: true
    });

    this.store.rootPageKeys.push(pageKey);

    return pageKey;
  }
  /**
   * 创建 page
   */
  @Action
  public createNewPage(isFolder: boolean) {
    const pageKey = this.createNewPageKey();
    this.store.currentCreatedPageKey = pageKey;
    this.store.currentEditPageKey = pageKey;
    if (isFolder) {
      this.store.pages.set(pageKey, {
        type: 'folder',
        name: '',
        path: '',
        parentKey: null,
        childs: []
      });
    } else {
      this.store.pages.set(pageKey, {
        type: 'page',
        name: '',
        path: '',
        parentKey: null
      });
    }

    // 新创建的页面默认都在根节点
    this.store.rootPageKeys.push(pageKey);

    return pageKey;
  }
}
