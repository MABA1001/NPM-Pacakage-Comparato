export function calculateScore(packageData) {
  return (
    packageData.evaluation.popularity.communityInterest * 0.2 +
    packageData.evaluation.popularity.downloadsCount * 0.5 +
    0.3 * (packageData.evaluation.quality.carefulness + packageData.evaluation.quality.tests)
  );
}
