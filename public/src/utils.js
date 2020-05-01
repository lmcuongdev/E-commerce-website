const VND = (money) => {
  const s = money.toString();
  const ar = s.split("");
  //   [2,3].
  for (let i = 3; s.length - i >= 1; i += 3) {
    ar.splice(s.length - i, 0, ".");
  }
  return ar.join("") + " VND";
};
const parseVND = (money) => Number(parseFloat(money.replace(/\./g, "")));

export { VND, parseVND };
