import { useCallback, useEffect } from "react";
import { FeatureListItem, isFeatureListItem } from "./featureListItem";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";
import { FeatureCount } from "./modelData";

interface FeatureListProps {
  features: FeatureCount[];
  reorderFeatures: (startIndex: number, finishIndex: number) => void;
  setHoveredFeature: (feature: string | null) => void;
}

export const FeatureList = ({
  features,
  reorderFeatures,
  setHoveredFeature,
}: FeatureListProps) => {
  const reorderItem = useCallback(
    ({
      startIndex,
      indexOfTarget,
      closestEdgeOfTarget,
    }: {
      startIndex: number;
      indexOfTarget: number;
      closestEdgeOfTarget: Edge | null;
    }) => {
      const finishIndex = getReorderDestinationIndex({
        startIndex,
        closestEdgeOfTarget,
        indexOfTarget,
        axis: "vertical",
      });

      if (finishIndex === startIndex) {
        // If there would be no change, we skip the update
        return;
      }

      reorderFeatures(startIndex, finishIndex);
    },
    [reorderFeatures]
  );

  useEffect(() => {
    return monitorForElements({
      onDrop: ({ location, source }) => {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;
        if (!isFeatureListItem(sourceData) || !isFeatureListItem(targetData))
          return;

        const indexOfTarget = features.findIndex(
          (item) => item.name === targetData.feature.name
        );
        if (indexOfTarget < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        reorderItem({
          startIndex: sourceData.index,
          indexOfTarget,
          closestEdgeOfTarget,
        });
      },
    });
  }, [features, reorderItem]);

  return (
    <div className="featureList">
      <ul>
        {features.map((f, i) => (
          <FeatureListItem
            key={f.name}
            feature={f}
            index={i}
            setHoveredFeature={setHoveredFeature}
          />
        ))}
      </ul>
    </div>
  );
};
