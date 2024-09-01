import { FeatureCount, ModelData } from "./modelData";
import adult from "./input_data/ADULT.json";
import bank from "./input_data/BANK.json";
import demo from "./input_data/DEMO.json";
import fico from "./input_data/FICO.json";
import mammo from "./input_data/MAMMO.json";
import shroom from "./input_data/SHROOM.json";

import adult_50_05 from "./input_data/ADULT_50_05.json";
import adult_200_1 from "./input_data/ADULT_200_1.json";
import adult_200_05 from "./input_data/ADULT_200_05.json";

import bank_50_05 from "./input_data/BANK_50_05.json";
import bank_200_1 from "./input_data/BANK_200_1.json";
import bank_200_05 from "./input_data/BANK_200_05.json";

import fico_50_05 from "./input_data/FICO_50_05.json";
import fico_200_1 from "./input_data/FICO_200_1.json";
import fico_200_05 from "./input_data/FICO_200_05.json";

import mammo_50_05 from "./input_data/MAMMO_50_05.json";
import mammo_200_1 from "./input_data/MAMMO_200_1.json";
import mammo_200_05 from "./input_data/MAMMO_200_05.json";

import shroom_50_05 from "./input_data/SHROOM_50_05.json";
import shroom_200_1 from "./input_data/SHROOM_200_1.json";
import shroom_200_05 from "./input_data/SHROOM_200_05.json";

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
      case "ADULT_50_05":
        return adult_50_05 as ModelData[];
      case "ADULT_200_1":
        return adult_200_1 as ModelData[];
      case "ADULT_200_05":
        return adult_200_05 as ModelData[];

      case "BANK":
        return bank as ModelData[];
      case "BANK_50_05":
        return bank_50_05 as ModelData[];
      case "BANK_200_1":
        return bank_200_1 as ModelData[];
      case "BANK_200_05":
        return bank_200_05 as ModelData[];

      // case "DEMO":
      //   return demo as ModelData[];

      case "FICO":
        return fico as ModelData[];
      case "FICO_50_05":
        return fico_50_05 as ModelData[];
      case "FICO_200_1":
        return fico_200_1 as ModelData[];
      case "FICO_200_05":
        return fico_200_05 as ModelData[];

      case "MAMMO":
        return mammo as ModelData[];
      case "MAMMO_50_05":
        return mammo_50_05 as ModelData[];
      case "MAMMO_200_1":
        return mammo_200_1 as ModelData[];
      case "MAMMO_200_05":
        return mammo_200_05 as ModelData[];

      case "SHROOM":
        return shroom as ModelData[];
      case "SHROOM_50_05":
        return shroom_50_05 as ModelData[];
      case "SHROOM_200_1":
        return shroom_200_1 as ModelData[];
      case "SHROOM_200_05":
        return shroom_200_05 as ModelData[];

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
