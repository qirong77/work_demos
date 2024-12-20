export const commands = new Map();
export function registerCommand(config = { id: "", desc: "", hadler: () => {} }) {
  checkHasCommand(config.id)
  commands.set(config.id, config);
}
function checkHasCommand(id) {
  if (commands.has(id)) {
    throw new Error(`${id} 命令已经存在`);
  }
}
