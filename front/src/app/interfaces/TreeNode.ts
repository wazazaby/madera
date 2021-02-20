export interface TreeNode<T> {
  data: T;
  children?: TreeNode<any>[];
  expanded?: boolean;
}
