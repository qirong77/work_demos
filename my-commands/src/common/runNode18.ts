import { execCommand } from "./execCommond";

export function runNode18(command = '') {
    execCommand(`. ~/.nvm/nvm.sh  && nvm use 18 && ${command}`);
}