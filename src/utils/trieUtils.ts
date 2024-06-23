export interface TrieNode {
  children: { [key: string]: TrieNode };
  ids: number[];
}

export const createTrieNode = (): TrieNode => ({
  children: {},
  ids: [],
});

export const insertName = (root: TrieNode, name: string, id: number) => {
  let node = root;
  for (const char of name.toLowerCase()) {
    if (!node.children[char]) {
      node.children[char] = createTrieNode();
    }
    node = node.children[char];
  }
  node.ids.push(id);
};

export const collectAllIds = (node: TrieNode): number[] => {
  let results: number[] = [...node.ids];
  for (const childNode of Object.values(node.children)) {
    results = results.concat(collectAllIds(childNode));
  }
  return Array.from(new Set([...results]));
};

export const searchTrie = (root: TrieNode, prefix: string): number[] => {
  const normalizedPrefix = prefix.toLowerCase();
  let node = root;
  for (const char of normalizedPrefix) {
    if (!node.children[char]) {
      return [];
    }
    node = node.children[char];
  }
  return collectAllIds(node);
};
