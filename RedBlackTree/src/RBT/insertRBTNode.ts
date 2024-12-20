import { isLeftNode } from "../utils/isLeftNode";
import { NODE_COLOR, NilNode, RBTNode } from "./RBTNode";

export const insertRBTNode = (node: RBTNode | undefined, target: number) => {
  const newNode = insertBSTNode(node, target, undefined);
  const balanceRoot = balanceInsertion(newNode);
  return balanceRoot.parent ? (node as RBTNode) : balanceRoot;
};

function insertBSTNode(
  node: RBTNode | undefined | NilNode,
  target: number,
  parent: RBTNode | undefined
): RBTNode {
  if (!node || node instanceof NilNode) {
    const newNode = new RBTNode(target);
    if (!parent) {
      console.log("插入根节点");
      node = newNode;
    } else {
      newNode.parent = parent;
      parent.value > target
        ? (parent.left = newNode)
        : (parent.right = newNode);
    }
    return newNode;
  }
  if (node.value > target) return insertBSTNode(node.left, target, node);
  else return insertBSTNode(node.right, target, node);
}

// 红黑树的平衡操作
function balanceInsertion(node: RBTNode): RBTNode {
  // case1: 插入的节点是根节点
  if (!node.parent) {
    node.setBlack();
    return node;
  }
  // case2: 父节点是黑色的,无需调整
  if (node.parent.isBlack()) {
    return node;
  }
  // 以下case,父节点一定是红色,那么根据红黑树的性质,爷节点存在
  if (!node.parent.parent) throw new Error("红黑树出错!");
  // case 4.1 叔叔节点存在并且为红色
  if (
    node.parent.parent.left instanceof RBTNode &&
    node.parent.parent.left.isRed() &&
    node.parent.parent.right instanceof RBTNode &&
    node.parent.parent.right.isRed()
  ) {
    node.parent.parent.left.setBlack()
    node.parent.parent.right.setBlack()
    node.parent.parent.setRed();
    if (node.parent.parent.parent?.isBlack()) return node;
    else return balanceInsertion(node.parent.parent);
  }
  // case 4.2 ll 叔叔节点,为黑色或者nil
  if (
    node.parent.getBrotherNode().color === NODE_COLOR.BLACK &&
    isLeftNode(node) &&
    isLeftNode(node.parent)
  ) {
    node.parent.setBlack();
    node.parent.parent.setRed();
    return rightRotate(node.parent.parent);
  }
  // case : lr
  if (
    node.parent.getBrotherNode().color === NODE_COLOR.BLACK &&
    !isLeftNode(node) &&
    isLeftNode(node.parent)
  ) {
    // 完成左旋
    const pp = node.parent.parent;
    const p = node.parent;
    const i = node;
    i.parent = pp;
    i.left = p;
    i.right = new NilNode(i);
    pp.left = i;
    p.parent = i;
    p.right = new NilNode(p);
    // 变色
    i.setBlack();
    pp.setRed();
    return rightRotate(pp);
  }
  // case: rr
  if (
    node.parent.getBrotherNode().color === NODE_COLOR.BLACK &&
    !isLeftNode(node) &&
    !isLeftNode(node.parent)
  ) {
    node.parent.setBlack();
    node.parent.parent.setRed();
    return leftRotate(node.parent.parent);
  }
  // case: rl
  if (
    node.parent.getBrotherNode().color === NODE_COLOR.BLACK &&
    isLeftNode(node) &&
    !isLeftNode(node.parent)
  ) {
    // 变为\的形状
    const pp = node.parent.parent;
    const p = node.parent;
    const i = node;
    pp.right = i;
    i.parent = pp;
    i.left = new NilNode(i);
    i.right = p;
    p.parent = i;
    p.left = new NilNode(i);
    // 变色
    i.setBlack()
    pp.setRed()
    // 左旋
    return leftRotate(pp);
  }
  throw new Error("平衡出错,没有对应的case");
}

// 右旋,形状为/,p的left没有变化
function rightRotate(node: RBTNode) {
  const pp = node;
  const p = node.left as RBTNode;
  if (pp.parent) {
    isLeftNode(pp) ? (pp.parent.left = p) : (pp.parent.right = p);
  }
  p.parent = pp.parent;
  p.right = pp;
  pp.left = new NilNode(pp);
  pp.right = new NilNode(pp);
  pp.parent = p;
  return p;
}
// 左旋,形状为\
function leftRotate(node: RBTNode) {
  const pp = node;
  const p = node.right as RBTNode;
  if (pp.parent) {
    isLeftNode(pp) ? (pp.parent.left = p) : (pp.parent.right = p);
  }
  p.parent = pp.parent;
  p.left = pp;
  pp.left = new NilNode(pp);
  pp.right = new NilNode(pp);
  pp.parent = p;
  return p;
}
