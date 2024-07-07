import { FeatureCount, ModelData } from "./modelData";

export const sortModels = (
  models: ModelData[],
  sortedFeatures: FeatureCount[]
) =>
  models.sort((a, b) => {
    for (let i = 0; i < sortedFeatures.length; i++) {
      const feature = sortedFeatures[i];
      const featureIndexA = a.feature_data.findIndex(
        (d) => d[1] === feature.name
      );
      const featureIndexB = b.feature_data.findIndex(
        (d) => d[1] === feature.name
      );
      let featureValueA = 0;
      let featureValueB = 0;

      if (featureIndexA !== -1) {
        featureValueA = Math.abs(a.feature_data[featureIndexA][0]);
      }

      if (featureIndexB !== -1) {
        featureValueB = Math.abs(b.feature_data[featureIndexB][0]);
      }

      if (featureValueA > featureValueB) {
        return -1;
      } else if (featureValueA < featureValueB) {
        return 1;
      }
    }

    return 0;
  });
