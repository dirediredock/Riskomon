import { useMemo, useEffect } from "react";
import { ModelData } from "./modelData";
import * as d3 from "d3";

interface PopUpCardProps {
  model: ModelData;
  marginalia: string;
  removeModel: (cardLabel: string) => void;
  inert: boolean;
}

export const PopUpCard = ({
  model,
  marginalia,
  removeModel,
  inert,
}: PopUpCardProps) => {
  const handleClose = () => {
    if (inert) return;
    removeModel(model.card_label);
  };
  useEffect(() => {
    const svg = d3.select("svg#card_svg_" + model.card_label);
    const svgNode = svg.node();
    const { width } = (svgNode as Element).getBoundingClientRect();
    const height = width;

    const margin = 20;

    const x_data = model.risk_scale.map((riskDatum) => riskDatum[0]);
    const y_data = model.risk_scale.map((riskDatum) => riskDatum[1]);

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(x_data) as number, d3.max(x_data) as number])
      .range([margin * 2, width - margin * 1.5]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([height - margin, 0 + margin]);

    const rScale = d3.scaleSqrt().domain([0, 1]).range([0.01, 10]);

    const xMax = xScale(d3.max(x_data) as number);

    svg.attr("height", height);

    svg
      .selectAll("circle")
      .data(x_data)
      .join("circle")
      .attr("cx", (d) => xScale(d))
      .attr("cy", (d, i) => yScale(y_data[i]))
      .attr("r", 3.5)
      .attr("fill", "gray");

    svg
      .append("path")
      .datum(model.risk_scale)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1]))
      );
    svg
      .selectAll("circle.blue")
      .data(y_data)
      .join("circle")
      .attr("cx", xMax + 30)
      .attr("cy", (d) => yScale(d))
      .attr("r", (d) => rScale(d))
      .attr("fill", "skyblue")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .lower();

    svg
      .selectAll("text")
      .data(x_data)
      .join("text")
      .attr("x", (d) => xScale(d) - 4)
      .attr("y", (d, i) => yScale(y_data[i]) - 8)
      .text((d) => Math.round(d).toString())
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "11px");

    svg
      .append("g")
      .attr("transform", `translate(${width + 25}, 0)`)
      .call(
        d3
          .axisRight(yScale)
          .tickValues([0, 0.2, 0.4, 0.6, 0.8, 1])
          .tickFormat((d) => `${(d as number) * 100}%`)
      )
      .selectAll("path, line")
      .attr("stroke", "skyblue")
      .selectAll("text")
      .attr("fill", "skyblue");

    svg
      .selectAll(".tick text")
      .attr("fill", "skyblue")
      .attr("font-weight", "bold");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        `translate(${margin * 14.5}, ${height / 2}) rotate(+90)`
      )
      .attr("fill", "skyblue")
      .style("font-size", "13px")
      .style("font-weight", "bold")
      .style("font-family", "sans-serif")
      .text("RISK");
  }, [model.card_label, model.risk_scale, removeModel]);

  return (
    <div className="popUpCard">
      <button
        className="buttonCardClose"
        onClick={handleClose}
        style={{ cursor: inert ? "default" : "pointer" }}
      >
        ✖️
      </button>
      <h3>Model {model.card_label} Card</h3>
      <div className="landscapeCard">
        <div className="featureRowVis">
          {model.feature_data.map((featureDatum) => {
            let sign = "";
            if (featureDatum[0] > 0) {
              sign = "+";
            }
            return (
              <div className="featureNameVis" key={featureDatum[1]}>
                {featureDatum[1]}
                <span className="featureCoeffVis">
                  {sign + featureDatum[0]}
                </span>
              </div>
            );
          })}
        </div>
        <div className="chartContainer">
          <svg id={`card_svg_${model.card_label}`} />
        </div>
      </div>
      <div className="popUpBanner">
        <div
          className={marginalia === "LOSS" ? "popUpBannerSelected" : undefined}
        >
          LOSS: {model.training_logistic_loss.toFixed(1)}
        </div>
        <div
          className={marginalia === "ACC" ? "popUpBannerSelected" : undefined}
        >
          ACC: {model.training_accuracy.toFixed(2)}%
        </div>
        <div
          className={marginalia === "AUC" ? "popUpBannerSelected" : undefined}
        >
          AUC: {model.training_AUC.toFixed(3)}
        </div>
        <div
          className={marginalia === "RISK" ? "popUpBannerSelected" : undefined}
        >
          MAX RISK: {(model.risk_scale[0][1] * 100).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};
