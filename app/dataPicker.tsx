import { coolwarm } from "./colormap";

interface DataPickerProps {
  availableModelFilenames: string[];
  onModelSelected: (modelFilename: string) => void;
  modelsCount: number;
  useColorMap: boolean;
  setUseColorMap: (useColorMap: boolean) => void;
  setMarginalia: (marginalia: string) => void;
  featuresCount: number;
}

export const DataPicker = ({
  availableModelFilenames,
  onModelSelected,
  modelsCount,
  useColorMap,
  setUseColorMap,
  setMarginalia,
  featuresCount,
}: DataPickerProps) => {
  return (
    <div className="dataPicker">
      <h1>FASTERRISK RASHOMON SET EXPLORER</h1>
      <span>
        The&nbsp;
        <select
          className="modelSelect"
          onChange={(e) => onModelSelected(e.target.value)}
        >
          {availableModelFilenames.map((modelFilename) => (
            <option key={modelFilename} value={modelFilename}>
              {modelFilename}
            </option>
          ))}
        </select>
        &nbsp; dataset has{" "}
        <span className="featuresCount">{featuresCount}</span> features across{" "}
        <span className="modelsCount">{modelsCount}</span> models. Showing the{" "}
        <select
          className="modelSelect"
          onChange={(e) => setMarginalia(e.target.value)}
        >
          <option value="LOSS">logistic loss (LOSS)</option>
          <option value="ACC">training accuracy (ACC) </option>
          <option value="AUC">area under the curve (AUC)</option>
          <option value="RISK">full risk profile (RISK)</option>
        </select>{" "}
        of these models. Colormap:{" "}
        <button
          className="colorMapButton"
          style={{
            background: useColorMap
              ? `linear-gradient(0.95turn, ${coolwarm[50]} 0%, ${coolwarm[coolwarm.length / 2]} 50%, ${coolwarm[coolwarm.length - 50]} 100%)`
              : "skyblue",
          }}
          title={!useColorMap ? "Use color map" : "Use default color"}
          onClick={() => setUseColorMap(!useColorMap)}
        >
          {useColorMap ? "ON" : "OFF"}
        </button>
      </span>
    </div>
  );
};
