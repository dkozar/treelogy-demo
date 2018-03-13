/* Classes and inheritance demo */
const demo2 = {
  versions: [
    {
      id: "Version_1",
      nodes: [
        { id: "foo", data: "return 'foo'; " },
        { id: "bar", data: "return 'bar';" }
      ]
    },
    {
      id: "Version_2",
      parent: "Version_1",
      nodes: [
        { id: "bar", data: "return 'bar_2';" },
        { id: "baz", data: "return 'baz';" }
      ]
    }
  ]
};

export default demo2;
