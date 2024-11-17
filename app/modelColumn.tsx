import { CSSProperties, useEffect, useMemo } from "react";
import { FeatureCount, ModelData } from "./modelData";
import { coolwarm, getColor } from "./colormap";
import * as d3 from "d3";

interface ModelColumnProps {
  model: ModelData;
  features: FeatureCount[];
  coefficientRangeAbsoluteMax: number;
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

const Dot = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="coefficientContainer">
      <div
        style={{ backgroundColor: isHovered ? "gray" : undefined }}
        className="dot"
      />
    </div>
  );
};

const Line = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="coefficientContainer">
      <div
        style={{
          backgroundColor: isHovered ? "gray" : undefined,
        }}
        className="line"
      />
    </div>
  );
};

const Coefficient = ({
  coefficient,
  coefficientRangeAbsoluteMax,
  topCap,
  bottomCap,
  useColorMap,
  isHovered,
}: {
  coefficient: number;
  coefficientRangeAbsoluteMax: number;
  topCap?: boolean;
  bottomCap?: boolean;
  useColorMap: boolean;
  isHovered: boolean;
}) => {
  const colorStyle = useMemo(
    () => ({
      backgroundColor: useColorMap
        ? getColor(coefficient, coefficientRangeAbsoluteMax)
        : undefined,
      border: isHovered ? "2px solid rgb(72,72,72)" : "2px solid transparent",
    }),
    [coefficient, coefficientRangeAbsoluteMax, isHovered, useColorMap]
  );

  return (
    <div className="coefficientContainer">
      {topCap && <div className="topCap" />}
      {bottomCap && <div className="bottomCap" />}
      <div className="coefficient" style={colorStyle}>
        {coefficient}
      </div>
    </div>
  );
};

export const ModelColumn = ({
  model,
  features,
  coefficientRangeAbsoluteMax,
  useColorMap,
  marginalia,
  axisBounds,
  hoveredFeature,
}: ModelColumnProps) => {
  const { firstIndex, lastIndex } = useMemo(() => {
    let firstIndex = -1;
    let lastIndex = -1;
    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      const featureData = model.feature_data.find((d) => d[1] === feature.name);
      if (firstIndex === -1 && featureData) {
        firstIndex = i;
      }
      if (featureData) {
        lastIndex = i;
      }
    }

    return { firstIndex, lastIndex };
  }, [features, model.feature_data]);

  const getCoeff = (feature: string) => {
    const featureData = model.feature_data.find((d) => d[1] === feature);
    if (featureData) {
      return featureData[0];
    } else {
      return 0;
    }
  };

  useEffect(() => {
    const svg = d3.select("svg#marginalia_svg_" + model.card_label);
    d3.select("svg#marginalia_svg_" + model.card_label)
      .selectAll("*")
      .remove();

    const height = 150;
    const margin = 10;

    const rScale = d3.scaleSqrt().domain([0, 1]).range([0, 5]);

    let y_data: number[];
    let yScale: d3.ScaleLinear<number, number, never>;

    switch (marginalia) {
      case "LOSS":
        y_data = [model.training_logistic_loss];
        yScale = d3
          .scaleLinear()
          .domain([axisBounds.LOSS_min, axisBounds.LOSS_max])
          .range([height - margin, margin]);
        break;
      case "AUC":
        y_data = [model.training_AUC];
        yScale = d3
          .scaleLinear()
          .domain([axisBounds.AUC_min, axisBounds.AUC_max])
          .range([height - margin, margin]);
        break;
      case "ACC":
        y_data = [model.training_accuracy];
        yScale = d3
          .scaleLinear()
          .domain([axisBounds.ACC_min, axisBounds.ACC_max])
          .range([height - margin, margin]);
        break;
      case "RISK":
        y_data = model.risk_scale.map((riskDatum) => riskDatum[1]);
        yScale = d3
          .scaleLinear()
          .domain([0, 1])
          .range([height - margin, margin]);
        break;
      default:
        y_data = [];
        yScale = d3
          .scaleLinear()
          .domain([0, 1])
          .range([height - margin, margin]);
    }

    svg
      .selectAll("circle.column")
      .data(y_data)
      .join("circle")
      .attr("class", "column")
      .attr("cx", 12.5)
      .attr("cy", (d) => yScale(d))
      .attr("r", (d) => (marginalia === "RISK" ? rScale(d) : 6))
      .attr("fill", "skyblue")
      .lower();

    // const axisGroup = svg
    //   .append("g")
    //   .attr("transform", `translate(${20}, 0)`)
    //   .call(d3.axisLeft(yScale));
  }, [
    marginalia,
    model.card_label,
    model.training_logistic_loss,
    model.training_accuracy,
    model.training_AUC,
    model.risk_scale,
    axisBounds.LOSS_min,
    axisBounds.LOSS_max,
    axisBounds.AUC_min,
    axisBounds.AUC_max,
    axisBounds.ACC_min,
    axisBounds.ACC_max,
  ]);

  return (
    <>
      <div className="visColumnAxis">
        <svg
          id={`marginalia_svg_${model.card_label}`}
          width="25px"
          height="150px"
        />
      </div>
      <div className="modelIndex">{model.card_label}</div>
      <div className="modelColumn">
        {features.map((f, i) => {
          const coeff = getCoeff(f.name);
          const isHovered = hoveredFeature === f.name;
          if (coeff) {
            return (
              <Coefficient
                key={f.name}
                coefficient={coeff}
                coefficientRangeAbsoluteMax={coefficientRangeAbsoluteMax}
                topCap={i > firstIndex}
                bottomCap={i < lastIndex}
                useColorMap={useColorMap}
                isHovered={isHovered}
              />
            );
          } else {
            return i > firstIndex && i < lastIndex ? (
              <Line key={f.name} isHovered={isHovered} />
            ) : (
              <Dot key={f.name} isHovered={isHovered} />
            );
          }
        })}
      </div>
    </>
  );
};
