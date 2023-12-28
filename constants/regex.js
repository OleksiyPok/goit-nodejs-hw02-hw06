const REGEX = Object.freeze({
  emailRegex:
    /^[a-zA-Z0-9._%+-][^@ \t\r\n]+@[a-zA-Z0-9._%+-][^@ \t\r\n]+\.[a-zA-Z0-9._%+-][^@ \t\r\n]+$/,
  phoneRegex:
    /^[+]?[(]?[0-9]{0,2}[)]?[-\s.]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,4}$/,
});

module.exports = REGEX;
