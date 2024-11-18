The default dataset, MAMMO, predicts cancer risk from mammography information[^MAMMO]. The FICO dataset predicts whether a borrower will default on a loan or credit obligation[^FICO]. The SHROOM dataset predicts the risk of poisoning from mushroom toxicity[^SHROOM]. The BANK dataset predicts whether a person opens an account after a marketing call[^BANK]. The ADULT dataset predicts whether a U.S. resident earns more than $50,000 annually[^ADULT].

```
RashomonSet         MAMMO.json
model_count         30
feature_count       13
FasterRisk          v0.1.10
select_top_m        200
gap_tolerance       0.1

RashomonSet         ADULT.json
model_count         47
feature_count       29
FasterRisk          v0.1.10
select_top_m        200
gap_tolerance       0.05

RashomonSet         BANK.json
model_count         87
feature_count       34
FasterRisk          v0.1.10
select_top_m        50
gap_tolerance       0.05

RashomonSet         FICO.json
model_count         50
feature_count       54
FasterRisk          v0.1.10
select_top_m        50
gap_tolerance       0.05

RashomonSet         SHROOM.json
model_count         3
feature_count       7
FasterRisk          v0.1.10
select_top_m        50
gap_tolerance       0.05
```

In Riskomon, positive feature coefficients map semantically to high risk, visually encoded with red bubbles. The MAMMO, FICO, and SHROOM datasets align with this semantic mapping. However, the BANK and ADULT datasets have a different valence: positive coefficients map to a higher likelihood of opening an account in BANK, and to higher salaries in ADULT. The alternative monochrome colormap can help navigate dataset scenarios with such different valences.

[^FASTERRISK]: Liu, J., Zhong, C., Li, B., Seltzer, M., & Rudin, C. (2022). FasterRisk: Fast and accurate interpretable risk scores. Advances in Neural Information Processing Systems, 35, 17760-17773.

[^ICML]: Rudin, C., Zhong, C., Semenova, L., Seltzer, M., Parr, R., Liu, J., Katta, S., Donnelly, J., Chen, H., & Boner, Z. (2024). Amazing Things Come From Having Many Good Models. arXiv preprint arXiv:2407.04846.

[^MAMMO]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/mammo_data.csv) Elter, M., Schulz‐Wendtland, R., & Wittenberg, T. (2007). The prediction of breast cancer biopsy outcomes using two CAD approaches that both emphasize an intelligible decision process. Medical physics, 34(11), 4164-4172. 

[^BANK]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/bank_data.csv) Moro, S., Cortez, P., & Rita, P. (2014). A data-driven approach to predict the success of bank telemarketing. Decision Support Systems, 62, 22-31.

[^FICO]: [Source](https://community.fico.com/s/explainable-machine-learning-challenge) FICO, Google, Imperial College London, MIT, University of Oxford, UC Irvine, and UC Berkeley. (2018). Explainable Machine Learning Challenge.

[^SHROOM]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/mushroom_data.csv) Schlimmer, J. C. (1987). Concept acquisition through representational adjustment. University of California, Irvine.

[^ADULT]: [Source](https://github.com/ustunb/risk-slim/blob/master/examples/data/adult_data.csv) Kohavi, R. (1996). Scaling up the accuracy of naive-Bayes classifiers: A decision-tree hybrid. In KDD (Vol. 96, pp. 202-207).
