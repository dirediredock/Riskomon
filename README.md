# A Visualization Tool for Risk Score Rashomon Sets

[![Riskomon YouTube Walkthrough](figures/README_YouTube.png)](https://www.youtube.com/watch?v=JzP4Mv4rbNE&ab_channel=Boffrey)

Riskomon is an interactive visualization tool for the exploration of a Rashomon set of scoring system models—that is, a collection of equally-good risk score models—obtained from the [FasterRisk](https://github.com/interpretml/FasterRisk/tree/main) algorithm[^FASTERRISK]. Each column represents a different risk score model. All the models represented have loss close to the best loss possible on the given training set. The yellow stripe indicates a selected model which, just like picking cards from a deck of cards, appears at the bottom of the screen.

This GitHub repo hosts the codebase for a Netlify build, check out the live tool here: [riskomon.netlify.app](https://riskomon.netlify.app/)

The motivation for developing the Riskomon visualization tool is tackling the "black box" problem of the traditional machine learning (ML) paradigm, which is a big problem for ML in high-stakes decision-making contexts such as parole policy and medical diagnoses. As explained in the spotlight perspective [_Amazing Things Come From Having Many Good Models_](https://users.cs.duke.edu/~cynthia/docs/RudinAmazingThingsICML2024.pdf)[^ICML], in the traditional ML pipeline, a single model is the only output, and its inner workings are a mystery due to the "black box" training architecture, which makes further model alignment time-consuming and computationally expensive. In contrast, the Rashomon set paradigm computes a collection of different yet equally-performing models, all of which are, from the outset, built with an interpretable architecture. In the Rashomon set paradigm, model alignment by human experts is not computationally expensive, given that all of the models are already computed within the Rashomon set. This is where visualization tools like Riskomon come into the picture, enabling human experts to sieve through Rashomon sets to find models that match the domain knowledge constraints required in high-stakes decision-making contexts.

<a href="https://riskomon.netlify.app/"><img src="figures/README_Fig1x.png" width="100%" ></a>

## Interface Components

The Riskomon graphical user interface has four components: the CONTROLS strip, the FEATURES pane, the MODELS pane, and the CARDS pane.

<img src="figures/README_Fig2x.png" width="100%" ></a>

The CONTROLS strip at the top shows the number of models and features that appear in the Rashomon set dataset selected in the first dropdown menu. The default Rashomon set shown here, the MAMMO dataset, is a collection of scoring system models that compute breast cancer risk from mammography data. The second dropdown menu lets users pick which statistic to show at the top of the MODELS pane. Logistic loss (LOSS) is the default view. Other possibilities include training accuracy (ACC) and area under the curve (AUC). The full risk profile (RISK) statistic shows the risk percent distribution for each model, not just a single value. The colormap button on the right toggles between the default of coloring by coefficient magnitude and the monochrome alternative. The colormap ranges from red to blue, where red bubbles map to positive coefficients, which add more risk to a model; while blue bubbles map to negative coefficients, which subtract risk from a model.

The FEATURES pane on the left shows all the features that appear in any model in the Rashomon set. For each row, the blue number on the left reports the number of models containing that feature. By default, the feature rows are ordered by the number of different models in which the feature appears. Using the handle to the right of each feature name, a user can drag and drop features to reorder the rows. 

The MODELS pane on the right shows each model as a column. Connected by a vertical line, each bubble in the column represents a feature that appears in the model, and the number in the bubble represents the coefficient of that feature. The order of the model columns depends on the order of the rows; moving features on the left will change the order in which the models appear. The leftmost columns show the models containing the greatest number of features at the top rows of the list of features. Therefore, when you promote feature rows by moving them to the top to indicate their desirability, the columns on the left will represent the models that use those features.

The top of the MODELS pane, above the connected bubbles, contains vertical plots of the model statistic selected in the CONTROLS strip. These plots have a shared axis on the left, with a shared range that is the minimum to maximum values across all models.

The bottom CARDS pane shows the card views of each column selected in the MODELS pane above it; the first one is already selected by default. Selecting more columns makes their cards appear. They can be removed with the X on the upper right or by clicking on the column again. Panning horizontally can show more models.

<img src="figures/README_Fig3.png" width="100%" ></a>

Each model’s card view lists all the features that constitute that model, along with the respective score coefficient. The sigmoid risk curve shows how the scores, which are the sum of the coefficients, are translated into risk percentages, encoded as blue circles along the vertical axis. The larger the dot, the higher the risk. The range of the scores reflects all possible coefficient combinations.

The bottom of each card reports four model statistic values: logistic loss (LOSS), training accuracy (ACC), area under the curve (AUC), and overall peak risk (MAX RISK), which is the height of the sigmoid curve.

## Use Case Walkthrough

Now, we briefly walk through an example scenario with the MAMMO dataset in which a domain expert decides which model to use for analyzing breast cancer lesions in a mammogram. The expert demotes feature _Age_geq_30_ by dragging it down to the bottom, because most women under 30 don't get mammograms. 

<img src="figures/README_Fig4.png" width="100%" ></a>

The model columns reorder accordingly, reflecting the new feature order. The _Age_geq_30_ feature now has a purple downward arrow, showing that it was demoted. 

<img src="figures/README_Fig5.png" width="100%" ></a>

Then, the expert promotes the features _SpiculatedMargin_ and _OvalShape_ by dragging them upwards. Again, the model columns reorder, and these promoted features have a green upward arrow by their handles. 

<img src="figures/README_Fig6.png" width="100%" ></a>

The current ordering of columns in the MODELS pane shows that only the first three models have both promoted features. The first one, _Model 03_, has both promoted features without the demoted one, but the next two models include that demoted one, so we do not select them. We also notice that from _Model 06_ through _Model 12_, there's one feature we care about without the one we demoted, so we select a few of these within this promising neighborhood to inspect in more detail.

<img src="figures/README_Fig7.png" width="100%" ></a>

## Datasets

The current version of Riskomon comes with five precomputed datasets. Future versions will allow users to upload their own FasterRisk Rashomon Set datasets.

The default dataset, MAMMO, predicts cancer risk from mammography information[^MAMMO]. The FICO dataset predicts whether a borrower will default on a loan or credit obligation[^FICO]. The SHROOM dataset predicts the risk of poisoning from mushroom toxicity[^SHROOM]. The BANK dataset predicts whether a person opens an account after a marketing call[^BANK]. The ADULT dataset predicts whether a U.S. resident earns more than $50,000 annually[^ADULT].

| Rashomon Set | Number of models | Number of features | FasterRisk version | `select_top_m` | `gap_tolerance` |
|-------------|-------------|---------------|---------------------|--------------|---------------|
| MAMMO.json  | 30          | 13            | v0.1.10            | 200          | 0.1           |
| ADULT.json  | 47          | 29            | v0.1.10            | 200          | 0.05          |
| BANK.json   | 87          | 34            | v0.1.10            | 50           | 0.05          |
| FICO.json   | 50          | 54            | v0.1.10            | 50           | 0.05          |
| SHROOM.json | 3           | 7             | v0.1.10            | 50           | 0.05          |

In Riskomon, positive feature coefficients map semantically to high risk, visually encoded with red bubbles. The MAMMO, FICO, and SHROOM datasets align with this semantic mapping. However, the BANK and ADULT datasets have a different valence: positive coefficients map to a higher likelihood of opening an account in BANK, and to higher salaries in ADULT. The alternative monochrome colormap (toggle on the Controls strip) can help navigate dataset scenarios with such different valences.

## Adaptive Design

<img src="figures/README_Scrollbars.png" width="100%" ></a>

Riskomon is designed for a target screen size of at least 1000 pixels of vertical resolution. Scrollbars will appear if any pane is too large to fit within the window. The FEATURES and MODELS panes scroll together vertically, while only the MODELS pane will scroll horizontally. Up to 50 models will be visible without the need to scroll the MODELS pane with a window of 1710 pixels. The CARDS pane scrolls separately, and is always 300 pixels tall.

## Project Authors

[Matt Oddo](https://github.com/dirediredock) (UBC) designed and implemented Riskomon in collaboration with [Jiachang Liu](https://jiachangliu.github.io/) (Duke), [Tamara Munzner](https://www.cs.ubc.ca/~tmm/) (UBC), [Francis Nguyen](https://fmnguyen.com/) (UBC), [Cynthia Rudin](https://users.cs.duke.edu/~cynthia/) (Duke), [Margo Seltzer](https://www.seltzer.com/margo/) (UBC), and the [Interpretable ML Lab](https://users.cs.duke.edu/~cynthia/lab.html) (Duke).

## References

[^FASTERRISK]: Liu, J., Zhong, C., Li, B., Seltzer, M., & Rudin, C. (2022). FasterRisk: Fast and accurate interpretable risk scores. Advances in Neural Information Processing Systems, 35, 17760-17773.

[^ICML]: Rudin, C., Zhong, C., Semenova, L., Seltzer, M., Parr, R., Liu, J., Katta, S., Donnelly, J., Chen, H., & Boner, Z. (2024). Amazing Things Come From Having Many Good Models. arXiv preprint arXiv:2407.04846.

[^MAMMO]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/mammo_data.csv) Elter, M., Schulz‐Wendtland, R., & Wittenberg, T. (2007). The prediction of breast cancer biopsy outcomes using two CAD approaches that both emphasize an intelligible decision process. Medical physics, 34(11), 4164-4172. 

[^BANK]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/bank_data.csv) Moro, S., Cortez, P., & Rita, P. (2014). A data-driven approach to predict the success of bank telemarketing. Decision Support Systems, 62, 22-31. 

[^FICO]: [Source](https://community.fico.com/s/explainable-machine-learning-challenge) FICO, Google, Imperial College London, MIT, University of Oxford, UC Irvine, and UC Berkeley. (2018). Explainable Machine Learning Challenge. 

[^SHROOM]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/mushroom_data.csv) Schlimmer, J. C. (1987). Concept acquisition through representational adjustment. University of California, Irvine. 

[^ADULT]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/adult_data.csv) Kohavi, R. (1996). Scaling up the accuracy of naive-Bayes classifiers: A decision-tree hybrid. In KDD (Vol. 96, pp. 202-207). 




