/* Versioning demo */
const demo3 = {
  versions: [
    {
      id: "version_1",
      nodes: [
        { id: "node_1", data: "1-1" },
        { id: "node_2", data: "1-2" },
        { id: "node_3", data: "1-3" }
      ]
    },
    {
      id: "version_2",
      parent: "version_1",
      nodes: [{ id: "node_4", data: "2-4" }, { id: "node_2", data: "2-2" }]
    },
    {
      id: "version_3",
      parent: "version_2",
      nodes: [{ id: "node_5", data: "3-5" }, { id: "node_6", data: "3-6" }]
    },
    {
      id: "version_4",
      parent: "version_3",
      nodes: [{ id: "node_2", data: "4-2" }, { id: "node_3", data: "4-3" }]
    },
    {
      id: "version_5",
      parent: "version_4",
      nodes: [
        { id: "node_3", data: "5-3" },
        { id: "node_7", data: "5-7" },
        { id: "node_8", data: "5-8" }
      ]
    }
  ]
};

export default demo3;
