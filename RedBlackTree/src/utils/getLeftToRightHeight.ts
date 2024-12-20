import { AVLNode } from "../AVL/AVLNode";

export function getLeftToRightWeight(node: AVLNode) {
    return getNodeHeight(node?.left) - getNodeHeight(node?.right);
    function getNodeHeight(node: AVLNode | undefined): number {
      if (!node) return 1;
      return 1 + Math.max(getNodeHeight(node.left), getNodeHeight(node.right));
    }
  }