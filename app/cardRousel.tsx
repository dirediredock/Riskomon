import { useMemo, useState, useCallback } from "react";
import { ModelData } from "./modelData";
import { PopUpCard } from "./popUpCard";

interface CardRouselProps {
  sortedModels: ModelData[];
  selectedModels: Set<ModelData["card_label"]>;
  setSelectedModels: (
    selectedModels: (
      selectedModels: Set<ModelData["card_label"]>
    ) => Set<ModelData["card_label"]>
  ) => void;
  marginalia: string;
}

export const CardRousel = ({
  sortedModels,
  selectedModels,
  setSelectedModels,
  marginalia,
}: CardRouselProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sortedSelectedModels = useMemo(
    () => sortedModels.filter((model) => selectedModels.has(model.card_label)),
    [selectedModels, sortedModels]
  );

  const removeModel = useCallback(
    (cardLabel: ModelData["card_label"]) => {
      setSelectedModels((prevSelectedModels) => {
        const newSelectedModels = new Set(prevSelectedModels);
        newSelectedModels.delete(cardLabel);
        return newSelectedModels;
      });
    },
    [setSelectedModels]
  );

  return (
    <div className="cardRousel">
      <div className="cardRouselHeaderContainer">
      <span className="cardRouselLabel">CARDS</span>
      <button
        className="collapseButton"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ transform: isCollapsed ? "rotate(180deg)" : undefined }}
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="gray"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      </div>
      <div
        className="cardConatiner"
        style={{
          maxHeight: isCollapsed ? "20px" : undefined,
          overflowY: isCollapsed ? "hidden" : undefined,
          overflowX: isCollapsed ? "hidden" : undefined,
        }}
      >
        {sortedSelectedModels.map((model) => {
          return (
            <PopUpCard
              key={model.card_label}
              model={model}
              marginalia={marginalia}
              removeModel={removeModel}
              inert={isCollapsed}
            />
          );
        })}
        {!isCollapsed && sortedSelectedModels.length === 0 && (
          <div className="noModelsMessage">
            Click on model columns to show their FasterRisk model cards.
          </div>
        )}
      </div>
    </div>
  );
};
