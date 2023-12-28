const REGEX = Object.freeze({
  emailRegex: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
  phoneRegex:
    /^[+]?[(]?[0-9]{0,2}[)]?[-\s.]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,4}$/,
});

module.exports = REGEX;
