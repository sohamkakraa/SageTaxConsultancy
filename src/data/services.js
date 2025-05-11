const services = {
  tax: [
    {
      slug: "vat",
      name: "Value Added Tax (VAT)",
      description: "End-to-end support on VAT registration, return filing & compliance.",
      longDescription:
        "Our VAT team handles threshold assessment, registration, quarterly filing, voluntary disclosure, and FTA audit representation …", // <— expand
      image: require("../assets/vat.jpg"),
    },
    {
      slug: "corporate-tax",
      name: "Corporate Tax",
      description: "Navigate the UAE’s 9 % regime with expert planning.",
      longDescription:
        "From impact assessment to tax grouping and transfer‑pricing compliance …",
      image: require("../assets/corporate-tax.jpg"),
    },
  ],
  // … other categories follow the same pattern …
};
export default services;