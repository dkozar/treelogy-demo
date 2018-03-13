/* Tree nodes demo */
const demo4 = {
  versions: [
    {
      id: "A",
      nodes: [
        { id: "1", data: '{data: "foo"}' },
        { id: "2", data: '{data: "bar", parentId: "1", index: 0}' }
      ]
    },
    {
      id: "B",
      parent: "A",
      nodes: [{ id: "3", data: '{data: "baz", parentId: "1", index: 1}' }]
    },
    {
      id: "C",
      parent: "B",
      nodes: [
        {
          id: "3",
          data: '{data: "look ma\', I changed parent", parentId: "2", index: 0}'
        }
      ]
    }
  ]
};

export default demo4;
