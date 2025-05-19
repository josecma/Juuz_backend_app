// import { BaseJSON } from "../shared";
// import Base from "./base";

// export default class Tree<T extends Base> {
//     root: T;
//     subTrees: Array<Tree<T>>;

//     public constructor(
//         params: {
//             root: T;
//             subTrees: Array<Tree<T>>;
//         }
//     ) {

//         const { root, subTrees } = params;

//         this.root = root ?? null;
//         this.subTrees = subTrees ?? [];

//     };

//     public toJSON<J extends BaseJSON>(): TreeJSON<J> {
//         return {
//             root: this.root.toJSON(),
//             subTrees: this.subTrees.map((subT) => subT.toJSON()),
//         };
//     };

// };