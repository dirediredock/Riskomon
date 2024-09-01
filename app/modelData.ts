type FeatureData = [number, string];
type RiskScale = [number, number];

export interface ModelData {
  feature_data: FeatureData[];
  risk_scale: RiskScale[];
  training_logistic_loss: number;
  training_accuracy: number;
  training_AUC: number;
  card_popularity?: string;
  card_label: string;
}

export interface FeatureCount {
  name: string;
  count: number;
}
