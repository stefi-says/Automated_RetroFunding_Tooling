# Measuring On-Chain Impact of RetroPGF Season 7: An Exploratory Causal Analysis

## 🚧 Project Status: Ongoing - Collecting Feedback

This is an **exploratory research project** examining whether Optimism's RetroPGF Season 7 funding caused measurable increases in on-chain transaction activity. The analysis is currently **open for feedback and discussion** from the community.

---

## 📄 What's Inside

This directory contains a comprehensive causal analysis of three top-funded DEX projects from Optimism's RetroPGF Season 7:

- **[Measuring_OnChain_Impact_of_RetroPGF_Season_7.md](./Measuring_OnChain_Impact_of_RetroPGF_Season_7.md)** - Full analysis document with methodology, findings, and interpretations
- **analysis_ntbk_media/** - Supporting visualizations and charts

---

## 📦 Data Availability

The raw data files used in this analysis are publicly available and can be accessed here:

**[📁 Download Data Files](https://drive.google.com/drive/folders/1CLqYmwwEN02HSdF6B9n2lM8wEwjHuMYT?usp=sharing)**

**To use the data:**
1. Download the necessary data files from the Google Drive folder
2. Place them in the `data/` directory of this project
3. The analysis notebooks will reference these files from that location

**Available datasets include:**
- `balancer_metrics.parquet` - Balancer DEX transaction metrics
- `chain_metrics.parquet` - Optimism chain-level metrics
- `curve_metrics.parquet` - Curve DEX transaction metrics
- `eth_price_market_cap_volume.csv` - Ethereum market data
- `eth_txcount.csv` - Ethereum transaction counts
- `merged_data_boxcox.parquet` - Box-Cox transformed merged dataset
- `raw_merged_data.parquet` - Raw merged dataset for analysis
- `recipients_and_grants.csv` - RetroPGF Season 7 recipients and grant amounts
- And more...

---

## ⚙️ Environment Setup

**⚠️ Important: This analysis requires a dedicated virtual environment due to package compatibility issues.**

The analysis uses TensorFlow Probability's `tfp-causalimpact` package, which has specific version requirements for TensorFlow and related dependencies. Running this analysis in your global Python environment may cause conflicts with other projects.

**Setup Instructions:**

1. A pre-configured virtual environment is available in the `causal_impact_env/` directory
2. For detailed setup instructions, see: [**VENV_SETUP_README.md**](../../VENV_SETUP_README.md)
3. This guide includes step-by-step instructions for:
   - Creating and activating the virtual environment
   - Installing required packages (`tfp-causalimpact`, `tf-keras`, etc.)
   - Configuring Jupyter kernel for notebook integration
   - Troubleshooting common issues

**Quick Start:**
```powershell
# Navigate to the optimism_season7 directory
cd Analysis_and_studies/optimism_season7

# Activate the virtual environment (Windows)
.\causal_impact_env\Scripts\Activate.ps1

# Open Jupyter notebooks with the correct kernel
jupyter notebook
```

---

## 🎯 Research Objective

**Main Question:** Did RetroPGF Season 7 funding cause measurable increases in on-chain transaction activity for funded projects?

**Projects Analyzed:**
- Uniswap
- Aerodrome  
- Velodrome

**Total Funding Analyzed:** ~$870K across three projects

---

## 🔍 Key Findings (Summary)

- **No statistically significant causal effects detected** (p-values: 0.20-0.36)
- **Estimated effects ranged from -0.3% to +9.1%**, with high uncertainty
- **Models showed good historical fit** (R² = 0.89-0.99) but struggled post-funding
- **Severe autocorrelation issues** suggest models didn't capture temporal patterns adequately

### What This Means

This **does NOT mean** funding had no impact or was wasted. 

This **DOES mean** that with current methods, data, and timeframes, any signal is indistinguishable from noise. The analysis reveals what we need to measure impact better: longer time horizons, richer counterfactuals, and metrics beyond transaction counts.

---

## 📊 Methodology

**Approach:** Bayesian Structural Time Series (BSTS) models using TensorFlow Probability's CausalImpact package

**Key Features:**
- Individual project-level analysis (bottom-up approach)
- Multiple data transformations tested (Box-Cox, log, differencing, Anscombe)
- Comprehensive model diagnostics (residuals, autocorrelation, predictive power)
- Counterfactual controls using similar DEXs and ecosystem metrics

**Analysis Period:**
- Pre-treatment: August 1, 2023 - April 4, 2025 (8 months)
- Treatment date: April 5, 2025 (first funding received)
- Post-treatment: April 6, 2025 - July 31, 2025 (4 months)

---

## 💡 Why Share This?

This work is part of a broader research initiative to advance impact measurement for public goods funding. **All code, data, and methodology are shared openly** to:

- Invite feedback and peer review
- Foster collaboration on better measurement approaches
- Document what works (and what doesn't) in measuring retroactive funding effectiveness
- Contribute to the collective learning of the RetroPGF ecosystem

---

## 🤝 We Want Your Feedback!

This is an **ongoing project** and we're actively seeking input from:

- **Data scientists & economists** - Methodological suggestions and improvements
- **RetroPGF stakeholders** - Domain expertise and context
- **Funding program operators** - Practical considerations and alternative metrics
- **Community members** - Questions, critiques, and ideas

### How to Provide Feedback

1. **Open an issue** in the main repository
2. **Direct reach out** [@hey_stefi_](https://x.com/hey_stefi_)


---

## 🔗 Related Resources

- **Main Repository:** [Onchain Recurrent Rewards R&D](../../)
- **Project Board:** [RetroPGF Ecosystem and Enhancements](https://github.com/users/stefi-says/projects/4)
- **Background Article:** [Toward Recurrent and Concurrent Grants Rounds in Web3](https://mirror.xyz/stefipereira.eth/SNXPcTKTO88BGgctU_eJw5_N_q6Tw23q4ed1zGBdCHo)

---

## 📝 Citation

If you reference this work, please cite:

```
Pereira, S. (2025). Measuring On-Chain Impact of RetroPGF Season 7: An Exploratory Causal Analysis.
Onchain Recurrent Rewards Research & Development.
```

---

## 📧 Contact

**Researcher:** Stefi Pereira  
**Twitter:** [@hey_stefi_](https://x.com/hey_stefi_)

---

## 📄 License

This work is licensed under a [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

---

*This is an evolving research project. The analysis and documentation will be updated as we receive feedback and refine our approach.*

