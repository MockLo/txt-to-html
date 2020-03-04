/**
 * 格式化源txt文本
 * @param {string} origin 源txt文本
 */
const fmtTxt = origin => origin.replace(/\n/g, '</p><p>')

module.exports = { fmtTxt }
