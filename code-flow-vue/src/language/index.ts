import { OnEnterSupport } from "./onEnter/onEnterSupport";

export class LanguageService {
  onEnterSupport;
  constructor(lang: "css" | "python") {
    this.onEnterSupport = new OnEnterSupport(lang);
  }
}
