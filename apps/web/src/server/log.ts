import debug from "debug";
import { emojify } from "node-emoji";

export default new Proxy(debug("santarepo:web") as debug.Debugger, {
  apply(target, _thisArg, argArray: any[]) {
    const mappedArgs = argArray.map((arg) =>
      typeof arg === "string" ? emojify(arg) : arg,
    );
    target(mappedArgs[0], ...mappedArgs.slice(1));
  },
});
