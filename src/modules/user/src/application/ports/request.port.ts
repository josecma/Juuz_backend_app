// export default interface RequestPort {
//     create(
//         params: {
//             request: {
//                 id?: string;
//                 source?: {
//                     type: string;
//                     id: string;
//                 };
//                 target?: {
//                     type: string;
//                     id: string;
//                 };
//                 channel: {
//                     method: string;
//                     target: string;
//                 }
//                 type: string,
//             };
//         },
//     ): Promise<{
//         id?: string;
//         source?: {
//             type: string;
//             id: string;
//         };
//         target: {
//             type: string;
//             id: string;
//         };
//         channel: {
//             method: string;
//             target: string;
//         }
//         type: string,
//     }>;

//     // update(
//     //     params: {
//     //         id: string;
//     //         updateObject: {
//     //             source?: {
//     //                 type: 'EMAIL' | 'PLATFORM',
//     //                 value: string;
//     //             };
//     //             target?: {
//     //                 type: 'EMAIL' | 'PLATFORM',
//     //                 value: string;
//     //             };
//     //             type?: 'JOIN',
//     //         };
//     //     },
//     // ): Promise<{
//     //     id: string;
//     //     source: {
//     //         type: 'EMAIL' | 'PLATFORM',
//     //         value: string;
//     //     };
//     //     target: {
//     //         type: 'EMAIL' | 'PLATFORM',
//     //         value: string;
//     //     };
//     //     type: 'JOIN',
//     // }>;
// };