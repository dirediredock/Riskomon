import { FeatureCount, ModelData } from "./modelData";
import adult from "./input_data/ADULT.json";
import bank from "./input_data/BANK.json";
import fico from "./input_data/FICO.json";
import mammo from "./input_data/MAMMO.json";
import shroom from "./input_data/SHROOM.json";

interface FetchDataResult {
  models: ModelData[];
  sortedFeatures: FeatureCount[];
  LOSS_max: number;
  LOSS_min: number;
  ACC_max: number;
  ACC_min: number;
  AUC_max: number;
  AUC_min: number;
}

export const fetchData = (filename: string): FetchDataResult => {
  const fetch = (fn: String): ModelData[] => {
    switch (fn) {
      case "ADULT":
        return adult as ModelData[];
      case "BANK":
        return bank as ModelData[];
      case "FICO":
        return fico as ModelData[];
      case "MAMMO":
        return mammo as ModelData[];
      case "SHROOM":
        return shroom as ModelData[];
      default:
        return [];
    }
  };

  const extractFeatures = (
    models: ModelData[]
  ): {
    sortedFeatures: FeatureCount[];
    LOSS_max: number;
    LOSS_min: number;
    ACC_max: number;
    ACC_min: number;
    AUC_max: number;
    AUC_min: number;
  } => {
    if (!models?.length)
      return {
        sortedFeatures: [],
        LOSS_max: -1,
        LOSS_min: -1,
        ACC_max: -1,
        ACC_min: -1,
        AUC_max: -1,
        AUC_min: -1,
      };
    const featuresCountDict = new Map<string, number>();

    let LOSS_max = Number.MIN_VALUE;
    let LOSS_min = Number.MAX_VALUE;

    let ACC_max = Number.MIN_VALUE;
    let ACC_min = Number.MAX_VALUE;

    let AUC_max = Number.MIN_VALUE;
    let AUC_min = Number.MAX_VALUE;

    models.forEach((m) => {
      m.feature_data.forEach(([_, f]) => {
        featuresCountDict.set(f, (featuresCountDict.get(f) || 0) + 1);

        const loss = m.training_logistic_loss;
        LOSS_max = Math.max(LOSS_max, loss);
        LOSS_min = Math.min(LOSS_min, loss);

        const acc = m.training_accuracy;
        ACC_max = Math.max(ACC_max, acc);
        ACC_min = Math.min(ACC_min, acc);

        const auc = m.training_AUC;
        AUC_max = Math.max(AUC_max, auc);
        AUC_min = Math.min(AUC_min, auc);
      });
    });

    const features = Array.from(featuresCountDict.entries()).map(
      ([name, count]) => ({ name, count })
    );

    const sortedFeatures = features.sort((a, b) => b.count - a.count);

    // sortedFeatures.sort(() => Math.random() - 0.5);

    return {
      sortedFeatures,
      LOSS_max,
      LOSS_min,
      ACC_max,
      ACC_min,
      AUC_max,
      AUC_min,
    };
  };

  const data = fetch(filename);
  const models = data;
  const {
    sortedFeatures,
    LOSS_max,
    LOSS_min,
    ACC_max,
    ACC_min,
    AUC_max,
    AUC_min,
  } = extractFeatures(models);

  return {
    models,
    sortedFeatures,
    LOSS_max,
    LOSS_min,
    ACC_max,
    ACC_min,
    AUC_max,
    AUC_min,
  };
};
