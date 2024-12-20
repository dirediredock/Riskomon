The default dataset, MAMMO, predicts cancer risk from mammography information[^MAMMO]. The FICO dataset predicts whether a borrower will default on a loan or credit obligation[^FICO]. The SHROOM dataset predicts the risk of poisoning from mushroom toxicity[^SHROOM]. The BANK dataset predicts whether a person opens an account after a marketing call[^BANK]. The ADULT dataset predicts whether a U.S. resident earns more than $50,000 annually[^ADULT].

| Rashomon Set | Number of models | Number of features | FasterRisk version | `select_top_m` | `gap_tolerance` |
|-------------|-------------|---------------|---------------------|--------------|---------------|
| MAMMO.json  | 30          | 13            | v0.1.10            | 200          | 0.1           |
| ADULT.json  | 47          | 29            | v0.1.10            | 200          | 0.05          |
| BANK.json   | 87          | 34            | v0.1.10            | 50           | 0.05          |
| FICO.json   | 50          | 54            | v0.1.10            | 50           | 0.05          |
| SHROOM.json | 3           | 7             | v0.1.10            | 50           | 0.05          |

In Riskomon, positive feature coefficients map semantically to high risk, visually encoded with red bubbles. The MAMMO, FICO, and SHROOM datasets align with this semantic mapping. However, the BANK and ADULT datasets have a different valence: positive coefficients map to a higher likelihood of opening an account in BANK, and to higher salaries in ADULT. The alternative monochrome colormap (toggle on the Controls strip) can help navigate dataset scenarios with such different valences.

[^FASTERRISK]: Liu, J., Zhong, C., Li, B., Seltzer, M., & Rudin, C. (2022). FasterRisk: Fast and accurate interpretable risk scores. Advances in Neural Information Processing Systems, 35, 17760-17773.

[^ICML]: Rudin, C., Zhong, C., Semenova, L., Seltzer, M., Parr, R., Liu, J., Katta, S., Donnelly, J., Chen, H., & Boner, Z. (2024). Amazing Things Come From Having Many Good Models. arXiv preprint arXiv:2407.04846.

[^MAMMO]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/mammo_data.csv) Elter, M., Schulz‐Wendtland, R., & Wittenberg, T. (2007). The prediction of breast cancer biopsy outcomes using two CAD approaches that both emphasize an intelligible decision process. Medical physics, 34(11), 4164-4172. 

[^BANK]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/bank_data.csv) Moro, S., Cortez, P., & Rita, P. (2014). A data-driven approach to predict the success of bank telemarketing. Decision Support Systems, 62, 22-31.

[^FICO]: [Source](https://community.fico.com/s/explainable-machine-learning-challenge) FICO, Google, Imperial College London, MIT, University of Oxford, UC Irvine, and UC Berkeley. (2018). Explainable Machine Learning Challenge.

[^SHROOM]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/mushroom_data.csv) Schlimmer, J. C. (1987). Concept acquisition through representational adjustment. University of California, Irvine.

[^ADULT]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/adult_data.csv) Kohavi, R. (1996). Scaling up the accuracy of naive-Bayes classifiers: A decision-tree hybrid. In KDD (Vol. 96, pp. 202-207).
