function getMatch(box, need) {
  need = need.split(",").map((i) => i.toLowerCase().trim());
  box = box.map((i) =>
    i
      .replace(/["/"]/g, ",")
      .split(",")
      .map((v) => v.trim().toLowerCase()),
  );
  let picked = [];
  box.forEach((v, i) => {
    for (let x = 0; x < need.length; x++) {
      let isInclude = v.includes(need[x]);
      if (isInclude) {
        picked.push(i);
        break;
      }
    }
  });
  return picked;
}

module.exports = getMatch;
