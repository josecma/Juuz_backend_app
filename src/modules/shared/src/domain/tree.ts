export default class Tree<T> {
    private root: T;
    private subtrees: T[];

    public constructor(params: { root: T; }) {

        const { root } = params;

        this.root = root;
        this.subtrees = [];

    };

    public getRoot() {
        return this.root;
    };

    public isLeaf() {
        return this.subtrees.length === 0;
    };

    public toPrimitive() {

    };

};