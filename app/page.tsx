"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FeatureList } from "./featureList";
import { DataPicker } from "./dataPicker";
import { fetchData } from "./fetchData";
import { FeatureCount, ModelData } from "./modelData";
import { ModelGrid } from "./modelGrid";
import { CardRousel } from "./cardRousel";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { sortModels } from "./sortModels";
import * as d3 from "d3";

const filenames = [
  "MAMMO",
  "MAMMO_50_05",
  "MAMMO_200_1",
  "MAMMO_200_05",

  "ADULT",
  "ADULT_50_05",
  "ADULT_200_1",
  "ADULT_200_05",

  "BANK",
  "BANK_50_05",
  "BANK_200_1",
  "BANK_200_05",

  "FICO",
  "FICO_50_05",
  "FICO_200_1",
  "FICO_200_05",

  "SHROOM",
  "SHROOM_50_05",
  "SHROOM_200_1",
  "SHROOM_200_05",
];

export default function Home() {
  const [filename, setFilename] = useState(filenames[0]);
  const [models, setModels] = useState([] as ModelData[]);
  const [features, setFeatures] = useState([] as FeatureCount[]);
  const [selectedModels, setSelectedModels] = useState(
    new Set<ModelData["card_label"]>()
  );
  const [sortedModels, setSortedModels] = useState([] as ModelData[]);
  const [useColorMap, setUseColorMap] = useState(true);
  const [marginalia, setMarginalia] = useState("LOSS");
  const [axisBounds, setAxisBounds] = useState({
    LOSS_max: -1,
    LOSS_min: -1,
    ACC_max: -1,
    ACC_min: -1,
    AUC_max: -1,
    AUC_min: -1,
  });
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const featureListContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sortedModels = [...sortModels(models, features)];
    setSortedModels(sortedModels);
  }, [features, models]);

  useEffect(() => {
    const {
      models,
      sortedFeatures,
      LOSS_max,
      LOSS_min,
      ACC_max,
      ACC_min,
      AUC_max,
      AUC_min,
    } = fetchData(filename);
    setModels(models);
    setFeatures(sortedFeatures);
    setAxisBounds({
      LOSS_max,
      LOSS_min,
      ACC_max,
      ACC_min,
      AUC_max,
      AUC_min,
    });
    setSelectedModels(new Set());
  }, [filename]);

  useEffect(() => {
    const svgElement = document.querySelector("svg#pickAxis");
    if (!svgElement) return;
    d3.select(svgElement).selectAll("*").remove();

    const width = 80;
    const height = 150;

    const margin = 10;

    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;

    if (marginalia === "LOSS") {
      max = axisBounds.LOSS_max;
      min = axisBounds.LOSS_min;
    } else if (marginalia === "ACC") {
      max = axisBounds.ACC_max;
      min = axisBounds.ACC_min;
    } else if (marginalia === "AUC") {
      max = axisBounds.AUC_max;
      min = axisBounds.AUC_min;
    } else if (marginalia === "RISK") {
      max = 1;
      min = 0;
    } else {
      throw new Error("Invalid marginalia");
    }

    const yScale = d3
      .scaleLinear()
      .domain([min, max])
      .range([height - margin, margin]);

    const svg = d3.select(svgElement);

    const axisGroup = svg
      .append("g")
      .attr("transform", `translate(${width - 1}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickValues(
            marginalia === "RISK"
              ? [0, 0.2, 0.4, 0.6, 0.8, 1]
              : [
                  min,
                  ...Array.from(
                    { length: 4 },
                    (_, i) => min + ((max - min) * (i + 1)) / 5
                  ),
                  max,
                ]
          )
          .tickFormat((d) =>
            marginalia === "RISK"
              ? `${(d as number) * 100}%`
              : marginalia === "AUC"
                ? d.valueOf().toFixed(3)
                : marginalia === "ACC"
                  ? `${d.valueOf().toFixed(1)}%`
                  : d.valueOf().toFixed(0)
          )
      );

    axisGroup
      .selectAll("path, line")
      .attr("stroke", "skyblue")
      .attr("stroke-width", 1.5);

    axisGroup
      .selectAll("text")
      .attr("fill", "skyblue")
      .style("font-weight", "bold");

    axisGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        `translate(${margin * -4.5}, ${height / 2}) rotate(-90)`
      )
      .attr("fill", "skyblue")
      .style("font-size", "13px")
      .style("font-weight", "bold")
      .text(marginalia);
  }, [
    axisBounds.ACC_max,
    axisBounds.ACC_min,
    axisBounds.AUC_max,
    axisBounds.AUC_min,
    axisBounds.LOSS_max,
    axisBounds.LOSS_min,
    filename,
    marginalia,
  ]);

  const handleModelSelected = (modelFilename: string) => {
    setFilename(modelFilename);
  };

  const reorderFeatures = useCallback(
    (startIndex: number, finishIndex: number) => {
      setFeatures((oldFeatures) => {
        return reorder({
          list: oldFeatures,
          startIndex,
          finishIndex,
        });
      });
    },
    []
  );

  return (
    <div className="page">
      <DataPicker
        availableModelFilenames={filenames}
        onModelSelected={handleModelSelected}
        modelsCount={models.length}
        useColorMap={useColorMap}
        setUseColorMap={setUseColorMap}
        setMarginalia={setMarginalia}
        featuresCount={features.length}
      />
      <div className="featureGrid">
        <div className="featureListContainer" ref={featureListContainerRef}>
          <div className="subtitleHeader">
            <span className="subtitleHeaderText">FEATURES</span>
            <span className="subtitleHeaderText subtitleModels">MODELS</span>
          </div>
          <div className="visPickAxis">
            <div className="instructions">
              Drag important feature rows up and undesired rows down with the
              <span
                role="img"
                style={{ display: "inline-block", verticalAlign: "bottom" }}
              >
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 20"
                  role="presentation"
                >
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
              handle: the model columns will reorder from left to right
              accordingly.
            </div>
            <svg
              key={filename + marginalia}
              id={"pickAxis"}
              width="80px"
              height="150px"
            />
          </div>
          <FeatureList
            features={features}
            reorderFeatures={reorderFeatures}
            setHoveredFeature={setHoveredFeature}
          />
        </div>

        <div className="modelGridContainer">
          <ModelGrid
            sortedModels={sortedModels}
            features={features}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
            useColorMap={useColorMap}
            marginalia={marginalia}
            axisBounds={axisBounds}
            hoveredFeature={hoveredFeature}
            filename={filename}
          />
        </div>
      </div>
      <div className="emptySpacer" />
      <CardRousel
        sortedModels={sortedModels}
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
        marginalia={marginalia}
      />
    </div>
  );
}
