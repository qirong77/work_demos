import { deleteBSTNode } from "../BST/deleteBSTNode";
import { AVLNode } from "./AVLNode";

export const deleteAVLNode = (node: AVLNode, target: number) => {
  deleteBSTNode(node, target);
};
