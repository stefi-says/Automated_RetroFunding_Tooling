# Measuring On-Chain Impact of RetroPGF Season 7: An Exploratory Causal Analysis

## 🚧 Project Status: Ongoing - Collecting Feedback

This is an **exploratory research project** examining whether Optimism's RetroPGF Season 7 funding caused measurable increases in on-chain transaction activity. The analysis is currently **open for feedback and discussion** from the community.

---

## 📄 What's Inside

This directory contains a comprehensive causal analysis of three top-funded DEX projects from Optimism's RetroPGF Season 7:

- **[Measuring_OnChain_Impact_of_RetroPGF_Season_7.md](./Measuring_OnChain_Impact_of_RetroPGF_Season_7.md)** - Full analysis document with methodology, findings, and interpretations
- **analysis_ntbk_media/** - Supporting visualizations and charts
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

