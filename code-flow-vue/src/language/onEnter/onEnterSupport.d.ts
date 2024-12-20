
export class OnEnterSupport {
  constructor(conf: any);
  onEnter(
    autoIndent: number,
    previousLineText: string,
    beforeEnterText: string,
    afterEnterText: string
  ): any;
}