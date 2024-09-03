import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface DataPickerProps {
  availableModelFilenames: string[];
  onModelSelected: (modelFilename: string) => void;
  modelsCount: number;
  useColorMap: boolean;
  setUseColorMap: (useColorMap: boolean) => void;
  setMarginalia: (marginalia: string) => void;
  featuresCount: number;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const DataPicker = ({
  availableModelFilenames,
  onModelSelected,
  modelsCount,
  useColorMap,
  setUseColorMap,
  setMarginalia,
  featuresCount,
}: DataPickerProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="dataPicker">
      <div>
        <h1>
          RISKOMON · Card Deck Explorer for a FasterRisk Rashomon Set (
          <a
            href="https://arxiv.org/abs/2210.05846"
            style={{ color: "cornflowerblue", fontWeight: "bold" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            paper
          </a>
          ,{" "}
          <a
            href="https://github.com/interpretml/FasterRisk/tree/main"
            style={{ color: "cornflowerblue", fontWeight: "bold" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            source code
          </a>
          )
        </h1>
      </div>
      <span>
        <button className="AboutMeButton" onClick={handleClickOpen}>
          ❔
        </button>
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
        Rashomon Set dataset, here showing the{" "}
        <select
          className="modelSelect"
          onChange={(e) => setMarginalia(e.target.value)}
        >
          <option value="LOSS">logistic loss (LOSS)</option>
          <option value="ACC">training accuracy (ACC) </option>
          <option value="AUC">area under the curve (AUC)</option>
          <option value="RISK">full risk profile (RISK)</option>
        </select>{" "}
        of these models, with colormap by coefficient magnitude turned{" "}
        <button
          className="colorMapButton"
          onClick={() => setUseColorMap(!useColorMap)}
        >
          {useColorMap ? "ON" : "OFF"}
        </button>
      </span>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <button className="buttonCardClose" onClick={handleClose}>
          ✖️
        </button>
        <DialogContent className="AboutMeText">
          <br />
          <h2>About FasterRisk</h2>
          <p>
            FasterRisk is an algorithm (
            <a
              href="https://github.com/interpretml/FasterRisk/tree/main"
              style={{ color: "cornflowerblue", fontWeight: "bold" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              source code
            </a>
            ) that efficiently surfaces a pool of equally-good sparse continuous
            solutions learned from data, each with a different support set,
            using a beam-search algorithm. Each of these continuous solutions is
            transformed into a separate risk score through a &quot;star
            ray&quot; search, where a range of multipliers are considered before
            rounding the coefficients sequentially to maintain low logistic loss
            (
            <a
              href="https://arxiv.org/abs/2210.05846"
              style={{ color: "cornflowerblue", fontWeight: "bold" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              paper
            </a>
            ). We use FasterRisk to precompute a Rashomon Set—a dataset composed
            of equally-good risk score models from binarized training
            input—which we then visualize and explore using the Riskomon
            interactive tool. The motivation for developing the FasterRisk
            algorithm is tackling the &quot;black box&quot; problem of the
            traditional machine learning (ML) paradigm, which is a big problem
            for ML in high-stakes decision-making contexts such as parole policy
            and medical diagnoses.
          </p>
          <br />
          <h2>About Riskomon</h2>
          <p>
            Riskomon is a React-based visualization tool (
            <a
              href="https://github.com/dirediredock/Riskomon"
              style={{ color: "cornflowerblue", fontWeight: "bold" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              source code
            </a>
            ) for the exploration of a Rashomon Set of scoring system models
            obtained from the FasterRisk algorithm. We precompute an assortment
            of different Rashomon Sets for the user to consider.
          </p>
          <br />
          <p style={{ color: "tomato", fontWeight: "bold" }}>
            Riskomon is a dynamic website that can differ in display across
            browsers. If you notice the visual elements are too large, manually
            zooming out to about 80% of can help.
          </p>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
