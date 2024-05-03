const getMatch = require("./getMatch");

test("none items", () => {
  expect(
    getMatch(
      [
        "Romance/Action/crime",
        "Action/Rank A/Romance/Drama",
        "Adventure, Animation, Action",
      ],
      "Crime, rank A",
    ),
  ).toEqual([0, 1]);
});
