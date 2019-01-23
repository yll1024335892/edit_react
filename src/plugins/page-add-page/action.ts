import { Action, inject } from 'dob';
import * as _ from 'lodash';
import * as React from 'react';
import PageAddStore from './store';
export default class PageAddAction {
    @inject(PageAddStore) private store: PageAddStore;

  /**
   * 修改 page 名称
   */
  @Action
  public changePageName(pageKey: string, pageName: string) {
    const pageInfo = this.store.pages.get(pageKey);
    pageInfo.name = pageName;
  }

  /**
   * 修改 page 路径
   */
  @Action
  public changePagePath(pageKey: string, pagePath: string) {
    const pageInfo = this.store.pages.get(pageKey);
    pageInfo.path = pagePath;
  }

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


  /**
   * 删除 page
   */
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
   * 修改 page 父级
   */
  @Action
  public changePageParentKey(pageKey: string, parentKey: string) {
    const pageInfo = this.store.pages.get(pageKey);

    // 存在父节点，说明不是根节点
    if (pageInfo.parentKey !== null) {
      const preParentInfo = this.store.pages.get(pageInfo.parentKey);
      const existIndex = preParentInfo.childs.findIndex(childKey => childKey === pageKey);
      preParentInfo.childs.splice(existIndex, 1);

      if (parentKey === null) {
        // 如果开始不在根节点，被设置到根节点，添加到数组中
        this.store.rootPageKeys.push(pageKey);
      }
    } else {
      // 如果开始在根节点，被设置到非根节点，从数组中移除
      if (parentKey !== null) {
        const existIndex = this.store.rootPageKeys.findIndex(rootPageKey => rootPageKey === pageKey);
        this.store.rootPageKeys.splice(existIndex, 1);
      }
    }

    pageInfo.parentKey = parentKey;

    const nextParentInfo = this.store.pages.get(parentKey);
    nextParentInfo.childs.push(pageKey);
  }

  /**
   * 确认创建 page
   */
  @Action
  public confirmCreatePage() {
    // 把当前创建页面 key 删除，这个页面就不会随着关闭而消失，进而成功创建了页面
    this.store.currentCreatedPageKey = null;
    this.store.currentEditPageKey = null;
  }
}
