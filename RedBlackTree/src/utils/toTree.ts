import { BSTNode } from "../BST/BSTNode";
import { cloneDeep } from "lodash-es";
import { RBTNode } from "../RBT/RBTNode";
export const toTree = (node: BSTNode | RBTNode | undefined) => {
  return toFullBinaryTree(cloneDeep(node));
};

function toFullBinaryTree(
  node: BSTNode | RBTNode | undefined,
  depth = 0,
  results = [] as (BSTNode | RBTNode | null)[][]
) {
  if (depth > 6) return;
  if (node) {
    if (results[depth]) results[depth].push(node);
    else results[depth] = [node];
  } else {
    if (results[depth]) results[depth].push(null);
    else results[depth] = [null];
  }
  toFullBinaryTree(node?.left as any, depth + 1, results);
  toFullBinaryTree(node?.right as any, depth + 1, results);
  return results;
}
