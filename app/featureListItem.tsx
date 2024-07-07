import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import React from "react";
import { useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { FeatureCount } from "./modelData";

export interface FeatureListItem {
  feature: FeatureCount;
  index: number;
}

export const isFeatureListItem = (value: any): value is FeatureListItem =>
  typeof value.feature.name === "string" &&
  typeof value.feature.count === "number" &&
  typeof value.index === "number";

interface FeatureListItemProps extends FeatureListItem {
  setHoveredFeature: (feature: string | null) => void;
}

export const FeatureListItem = ({
  feature,
  index,
  setHoveredFeature,
}: FeatureListItemProps) => {
  const element = useRef<HTMLLIElement>(null);
  const dragHandle = useRef<HTMLDivElement>(null);
  const [closestEdge, setClosestEdge] = React.useState<Edge | null>();
  const handleMouseEnter = useCallback(() => {
    setHoveredFeature(feature.name);
  }, [feature.name, setHoveredFeature]);
  const handleMouseLeave = useCallback(() => {
    setHoveredFeature(null);
  }, [setHoveredFeature]);

  useEffect(() => {
    if (!dragHandle.current || !element.current) return;
    return combine(
      draggable({
        element: dragHandle.current,
        getInitialData: () => ({ feature, index }),
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: "20px",
              y: "20px",
            }),
            render: ({ container }) => {
              const root = createRoot(container);
              root.render(
                <div className="featureDragPreview">{feature.name}</div>
              );
            },
          });
        },
      }),
      dropTargetForElements({
        element: element.current,
        getData: ({ input }) => {
          return attachClosestEdge(
            { feature, index },
            {
              element: element.current!,
              input,
              allowedEdges: ["top", "bottom"],
            }
          );
        },
        onDrag: ({ self, source }) => {
          const isSource = source.element === self.element;
          if (isSource) {
            return;
          }

          const sourceData = source.data;
          const selfData = self.data;
          if (!isFeatureListItem(sourceData) || !isFeatureListItem(selfData)) {
            return;
          }

          setClosestEdge(extractClosestEdge(selfData));
        },
        onDragLeave() {
          setTimeout(() => setClosestEdge(null), 50);
        },
        onDrop() {
          setClosestEdge(null);
        },
      })
    );
  }, [feature, index]);

  return (
    <li
      ref={element}
      className="featureContainer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="featureLabel">
        <span className="featureFrequency">{feature.count}</span>
        <span>{feature.name}</span>
      </div>
      <div ref={dragHandle} className="dragHandle">
        <span role="img">
          <svg width="20" height="20" viewBox="0 0 20 20" role="presentation">
            <g fill="currentColor" fillRule="evenodd" color="gray">
              <circle cx="8" cy="6" r="1.5"></circle>
              <circle cx="12" cy="6" r="1.5"></circle>
              <circle cx="8" cy="14" r="1.5"></circle>
              <circle cx="12" cy="14" r="1.5"></circle>
              <circle cx="8" cy="10" r="1.5"></circle>
              <circle cx="12" cy="10" r="1.5"></circle>
            </g>
          </svg>
        </span>
      </div>

      {closestEdge && <DropIndicator edge={closestEdge} gap="0px" />}
    </li>
  );
};
