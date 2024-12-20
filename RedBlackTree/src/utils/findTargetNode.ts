import { BSTNode } from "../BST/BSTNode";

export const findTargetNode = (
  node: BSTNode | undefined,
  target: number
): BSTNode | null | undefined => {
  if (!node) return null;
  if (node.value === target) return node;
  if (node.value > target) return findTargetNode(node.left, target);
  if (node.value < target) return findTargetNode(node.right, target);
};
