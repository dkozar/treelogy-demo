import Treelogy from '../treelogy/Treelogy'

const buildDemo = () => {
  const treelogy = new Treelogy();

  const tree1 = treelogy.createVersion("tree_1");
  tree1.createNode("node_1", "1-1");
  tree1.createNode("node_2", "1-2");
  tree1.createNode("node_3", "1-3");

  const tree2 = treelogy.createVersion("tree_2");
  tree2.inherits(tree1);
  tree2.updateNode("node_4", "2-4");
  tree2.updateNode("node_2", "2-2");

  const tree3 = treelogy.createVersion("tree_3");
  tree3.inherits(tree2);
  tree3.updateNode("node_5", "3-5");
  tree3.updateNode("node_6", "3-6");

  const tree4 = treelogy.createVersion("tree_4");
  tree4.inherits(tree3);
  tree4.updateNode("node_2", "4-2");
  tree4.updateNode("node_3", "4-3");

  const tree5 = treelogy.createVersion("tree_5");
  tree5.inherits(tree4);
  tree5.updateNode("node_3", "5-3");
  tree5.updateNode("node_7", "5-7");
  tree5.updateNode("node_8", "5-8");

  return treelogy;
};

export default buildDemo;
