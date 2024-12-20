import { isNumber } from "lodash-es";
import { findRightSubTreeMin } from "../utils/findRightSubTreeMin";
import { findTargetNode } from "../utils/findTargetNode";
import { isLeftNode } from "../utils/isLeftNode";
import { BSTNode } from "./BSTNode";

export const deleteBSTNode = (node: BSTNode, target: number | BSTNode) => {
  const targetNode = isNumber(target) ? findTargetNode(node, target) : target;
  if (!targetNode) throw new Error("找不到需要删除的节点");
  if (
    (targetNode.left && !targetNode.right) ||
    (!targetNode.left && targetNode.right)
  ) {
    const singleNode = (targetNode.left || targetNode.right) as BSTNode;
    // 如果没有父节点,说明当前要删除的节点是根节点,直接将根节点删除即可
    if (!targetNode.parent) {
      singleNode.parent = undefined;
      return;
    }
    const parentNode = targetNode.parent;
    singleNode.parent = parentNode;
    isLeftNode(targetNode)
      ? (parentNode.left = singleNode)
      : (parentNode.right = singleNode);
    return;
  }
  if (!targetNode.left && !targetNode.right) {
    targetNode.free();
    return;
  }
  if (targetNode.left && targetNode.right) {
    const nextNode = findRightSubTreeMin(targetNode);
    targetNode.value = nextNode.value;
    if (nextNode.isLeaf()) nextNode.free();
    else deleteBSTNode(nextNode, nextNode);
    return;
  }
};
