import { FeatureCount, ModelData } from "./modelData";

export const sortModels = (
  models: ModelData[],
  sortedFeatures: FeatureCount[]
) =>
  models.sort((a, b) => {
    for (const feature of sortedFeatures) {
      const featureIndexA = a.feature_data.findIndex(
        (d) => d[1] === feature.name
      );
      const featureIndexB = b.feature_data.findIndex(
        (d) => d[1] === feature.name
      );
      let featureValueA = 0;
      let featureValueB = 0;
      if (featureIndexA !== -1) {
        featureValueA = 1;
      }
      if (featureIndexB !== -1) {
        featureValueB = 1;
      }
      if (featureValueA > featureValueB) {
        return -1;
      } else if (featureValueA < featureValueB) {
        return 1;
      }
    }

    return 0;
  });
