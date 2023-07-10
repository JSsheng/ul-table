export const config = [
  // debug level
  {
    name: "tip.debug",
    pattern: /([^ ]*DEBUG)/g,
  },

  // info level
  {
    name: "tip.info",
    pattern: /([^ ]*INFO)/g,
  },

  // warn level
  {
    name: "tip.warn",
    pattern: /([^ ]*(WARN?[a-zA-Z]*)).*/gi,
  },

  // error level
  {
    name: "string",
    pattern:
      /([^ ]*error[^(]).*|([^ ]*fatal).*|([^ ]*failure).*|([^ ]*failed).*|([^ ]*exception[^(]).*/gi,
  },

  // number format
  {
    name: "constant.numeric",
    pattern: /\b([\d]+)\b/gi,
  },

  // time format
  {
    name: "constant.time",
    pattern: /\b([\d\-:\.,]+)\b/gi,
  },
];