export class SEventSource {
  constructor(props = {}) {
    this.id = props.id || new Date().getTime();
    this.title = props.title || '( 无标题 )';
    this.style = props.style || {};
    this.start = props.start;
    this.end = props.end;
  }
}

