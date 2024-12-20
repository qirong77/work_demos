import { isLeftNode } from "../utils/isLeftNode";
import { AVLNode } from "./AVLNode";
import { insertBSTNode } from "../BST/insertBSTNode";
import { getLeftToRightWeight } from "../utils/getLeftToRightHeight";
export const insertAVLNode = (node: AVLNode, target: number) => {
  const newNode = insertBSTNode(node, target, undefined);
  if (!newNode) throw new Error("插入失败");
  const root = balanceInsertion(newNode);
  return root.parent ? node : root;
};

export const balanceInsertion = (node: AVLNode): AVLNode => {
  const newNode = node;
  let leftToRightWeight = 0;
  while (true) {
    leftToRightWeight = getLeftToRightWeight(node);
    const isNodeBalance = Math.abs(leftToRightWeight) <= 1;
    if (isNodeBalance) {
      if (!node.parent) return node;
      // 如果当前节点平衡且有父节点,就继续,
      node = node.parent;
    } else {
      break;
    }
  }
  // 右旋,形状为:/
  if (leftToRightWeight > 0 && newNode.value < node.left!.value) {
    return rightRotate(node);
  }
  // 左旋,形状为:\
  if (leftToRightWeight < 0 && newNode.value > node.right!.value) {
    return leftRotate(node);
  }
  // lr
  if (leftToRightWeight > 0 && newNode.value > node.left!.value) {
    const x = node;
    const y = x.left!.break();
    const z = y.right!.break();
    const b = z.left?.break();
    y.right = b;
    if (b) b.parent = y;
    y.parent = z;
    z.left = y;
    z.parent = x;
    x.left = z;
    return rightRotate(x);
  }
  // rl
  if (leftToRightWeight < 0 && newNode.value < node.right!.value) {
    const x = node;
    const y = x.right!.break();
    const z = y.left!.break();
    const c = z.right?.break();
    y.left = c;
    if (c) c.parent = y;
    y.parent = z;
    z.right = y;
    z.parent = x;
    x.right = z;
    return leftRotate(x);
  }
  return node;
};



/*  x,y,a三个字母表示不平衡的ll型,z字母表示新插入的节点
     x               y
  y     c   ->    z     x
z   b                 b   c
*/
function rightRotate(x: AVLNode) {
  const y = x.left!;
  const b = y.right?.break();
  if (x.parent) {
    isLeftNode(x) ? (x.parent.left = y) : (x.parent.right = y);
  }
  y.parent = x.parent;
  y.right = x;
  x.parent = y;
  x.left = b;
  if (b) b.parent = x;
  return y;
}
/* rr型.逆时针旋转
   x                     y
a     y      =>      x      z
    b   z          a   b
*/
function leftRotate(x: AVLNode) {
  const y = x.right!;
  const b = y.left?.break();
  if (x.parent) {
    isLeftNode(x) ? (x.parent.left = y) : (x.parent.right = y);
  }
  // 注意更新的顺序,必须先更新y的
  y.parent = x.parent;
  y.left = x;
  x.parent = y;
  x.right = b;
  if (b) b.parent = x;
  return y;
}
