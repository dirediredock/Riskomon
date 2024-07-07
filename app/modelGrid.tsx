import { useCallback, useMemo, useEffect } from "react";
import { ModelColumn } from "./modelColumn";
import { FeatureCount, ModelData } from "./modelData";

interface ModelGridProps {
  sortedModels: ModelData[];
  features: FeatureCount[];
  selectedModels: Set<ModelData["card_label"]>;
  setSelectedModels: (selectedModels: Set<ModelData["card_label"]>) => void;
  useColorMap: boolean;
  marginalia: string;
  axisBounds: {
    LOSS_max: number;
    LOSS_min: number;
    ACC_max: number;
    ACC_min: number;
    AUC_max: number;
    AUC_min: number;
  };
  hoveredFeature: string | null;
}

export const ModelGrid = ({
  sortedModels,
  features,
  selectedModels,
  setSelectedModels,
  useColorMap,
  marginalia,
  axisBounds,
  hoveredFeature,
}: ModelGridProps) => {
  const handleClick = useCallback(
    (model: ModelData) => {
      let newSelectedModels = new Set(selectedModels);

      if (newSelectedModels.has(model.card_label)) {
        newSelectedModels.delete(model.card_label);
      } else {
        newSelectedModels.add(model.card_label);
      }
      setSelectedModels(newSelectedModels);
    },
    [selectedModels, setSelectedModels]
  );

  const coefficientRangeAbsoluteMax = useMemo(() => {
    let max = -1;
    sortedModels.forEach((m) =>
      m.feature_data.forEach((f) => {
        if (Math.abs(f[0]) > max) {
          max = Math.abs(f[0]);
        }
      })
    );
    return max + 2;
  }, [sortedModels]);

  return (
    <div className="modelGrid">
      {sortedModels.map((model, i) => {
        let containerClassName = "modelColumnContainer";
        if (selectedModels.has(model.card_label)) {
          containerClassName += " selected";
        }
        return (
          <div
            className={containerClassName}
            key={i}
            onClick={() => handleClick(model)}
          >
            <ModelColumn
              model={model}
              features={features}
              coefficientRangeAbsoluteMax={coefficientRangeAbsoluteMax}
              useColorMap={useColorMap}
              marginalia={marginalia}
              axisBounds={axisBounds}
              hoveredFeature={hoveredFeature}
            />
          </div>
        );
      })}
    </div>
  );
};

// make antoher component of the ModelGrid container to avoid re-rednering of the ModelColumn
