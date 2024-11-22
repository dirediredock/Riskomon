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
            ) designed to efficiently generate a diverse pool of equally-good
            sparse continuous models from data, each with a unique support set,
            using a beam-search approach. These continuous solutions are
            transformed into separate risk scores through a &quot;star ray&quot;
            search, where a range of multipliers is applied, and coefficients
            are sequentially rounded to maintain low logistic loss (
            <a
              href="https://arxiv.org/abs/2210.05846"
              style={{ color: "cornflowerblue", fontWeight: "bold" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              paper
            </a>
            ). We leverage FasterRisk to precompute a Rashomon Set—a dataset
            comprising equally-good risk score models derived from binarized
            training data—and visualize and explore it with Riskomon.
            <br />
            <br />
            The motivation for developing FasterRisk is addressing the
            inscrutable &quot;black box&quot; problem of traditional machine learning (ML),
            which is a critical challenge of ML models deployed in high-stakes domains
            such as financial management, parole policy, and medical diagnoses—contexts in
            which ML interpretability is of critical importance.
          </p>
          <br />
          <h2>About Riskomon</h2>
          <p>
            This web app is an interactive visualization tool (
            <a
              href="https://github.com/dirediredock/Riskomon"
              style={{ color: "cornflowerblue", fontWeight: "bold" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              codebase
            </a>
            ) for the exploration of a Rashomon Set of scoring system models
            obtained from the FasterRisk algorithm. We precompute an assortment
            of different Rashomon Sets for the user to consider (
            <a
              href="https://github.com/dirediredock/Riskomon/tree/main/app/input_data"
              style={{ color: "cornflowerblue", fontWeight: "bold" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              datasets
            </a>
            ).
            <br />
            <br />
            Matt Oddo (UBC) designed and implemented Riskomon in collaboration
            with Jiachang Liu (Duke), Tamara Munzner (UBC), Francis Nguyen
            (UBC), Cynthia Rudin (Duke), Margo Seltzer (UBC), and the
            Interpretable ML Lab (Duke).
          </p>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
