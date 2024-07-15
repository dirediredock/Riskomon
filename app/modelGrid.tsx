import { useCallback, useMemo, useEffect, useRef } from "react";
import { ModelColumn } from "./modelColumn";
import { FeatureCount, ModelData } from "./modelData";

interface ModelGridProps {
  filename: string;
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
  filename,
  sortedModels,
  features,
  selectedModels,
  setSelectedModels,
  useColorMap,
  marginalia,
  axisBounds,
  hoveredFeature,
}: ModelGridProps) => {
  const initialSelectionDone = useRef(false);

  useEffect(() => {
    initialSelectionDone.current = false;
  }, [filename]);

  useEffect(() => {
    if (sortedModels.length > 0 && !initialSelectionDone.current) {
      setSelectedModels(new Set([sortedModels[0].card_label]));
      initialSelectionDone.current = true;
    }
  }, [sortedModels, setSelectedModels]);

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

  // Colormap by coefficient magnitude

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
