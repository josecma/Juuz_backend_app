// export default function calculateNewScore(currentScore: CompanyScore | undefined, newValue: number): CompanyScore {
//     if (!currentScore) {
//         return {
//             lastAvg: newValue,
//             lastDiv: 1,
//         };
//     }

//     const lastSum = currentScore.lastAvg * currentScore.lastDiv;
//     const currentDiv = currentScore.lastDiv + 1;
//     const currentAvg = (lastSum + newValue) / currentDiv;

//     return {
//         lastAvg: currentAvg,
//         lastDiv: currentDiv,
//     };
// };