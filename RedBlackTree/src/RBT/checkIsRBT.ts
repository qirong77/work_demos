import { NilNode, RBTNode } from "./RBTNode";

export const checkRBTPath = (node: RBTNode) => {
  const paths: (RBTNode | NilNode)[][] = [];
  function dfs(node: RBTNode | NilNode, path: (RBTNode | NilNode)[] = []) {
    if (node instanceof NilNode) {
      paths.push([...path, node]);
      return;
    }
    dfs(node.left, [...path, node]);
    dfs(node.right, [...path, node]);
  }
  dfs(node);
  console.log(paths);
  const p2 = paths.map(
    (path) =>
      path.filter((node) => node instanceof NilNode || node.isBlack()).length
  );
  console.log(p2);
  if (new Set(p2).size !== 1) throw new Error("红黑树黑色高度平衡出错");
};

export function isRootBlack(node: RBTNode | NilNode) {
  if (!(node instanceof RBTNode) || !node.isBlack())
    throw new Error("根节点不是黑色节点");
}
export function checkRBTNode(node: RBTNode | NilNode) {
  console.log(node)
  if (!node || node instanceof NilNode) return;
  if (node instanceof RBTNode) {
    checkRBTPath(node);
    checkRBTNodeBalance(node);
  }
  checkRBTNode(node.left);
  checkRBTNode(node.right);
}
function checkRBTNodeBalance(node: RBTNode) {
  const leftValue = node.left instanceof RBTNode ? node.left.value : -Infinity;
  const rightValue =
    node.right instanceof RBTNode ? node.right.value : Infinity;
  if (!(leftValue < node.value && rightValue > node.value))
    throw new Error("二叉树左右子树节点平衡出错!");
}
