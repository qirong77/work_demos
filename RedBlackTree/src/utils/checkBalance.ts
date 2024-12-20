import { BSTNode } from "../BST/BSTNode";

export const checkBSTBalance = (node: BSTNode | undefined,depth=0) => {
  if (!node) return;
  if(depth && !node.parent) {
    throw new Error('当前节点没有父节点')
  }
  if (node.left && node.right) {
    if (node.left.value >= node.value || node.value >= node.right.value || node.left.value >= node.right.value) {
      throw new Error("不平衡");
    }
  }
  checkBSTBalance(node.left,depth+1);
  checkBSTBalance(node.right,depth+1);
};
