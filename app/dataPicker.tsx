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
      <h1>RISKOMON · Card Deck Explorer for a FasterRisk Rashomon Set</h1>
      <span>
        There are <span className="modelsCount">{modelsCount}</span> models that
        share <span className="featuresCount">{featuresCount}</span> features in
        the{" "}
        <select
          className="modelSelect"
          onChange={(e) => onModelSelected(e.target.value)}
        >
          {availableModelFilenames.map((modelFilename) => (
            <option key={modelFilename} value={modelFilename}>
              {modelFilename}
            </option>
          ))}
        </select>{" "}
        Rashomon Set dataset. Showing the{" "}
        <select
          className="modelSelect"
          onChange={(e) => setMarginalia(e.target.value)}
        >
          <option value="LOSS">logistic loss (LOSS)</option>
          <option value="ACC">training accuracy (ACC) </option>
          <option value="AUC">area under the curve (AUC)</option>
          <option value="RISK">full risk profile (RISK)</option>
        </select>{" "}
        of these models. Colormap by coefficient magnitude:{" "}
        <button
          className="colorMapButton"
          // style={{
          //   background: useColorMap
          //     ? `linear-gradient(0.95turn, ${coolwarm[50]} 0%, ${coolwarm[coolwarm.length / 2]} 50%, ${coolwarm[coolwarm.length - 50]} 100%)`
          //     : "skyblue",
          // }}
          onClick={() => setUseColorMap(!useColorMap)}
        >
          {useColorMap ? "ON" : "OFF"}
        </button>
      </span>
    </div>
  );
};
