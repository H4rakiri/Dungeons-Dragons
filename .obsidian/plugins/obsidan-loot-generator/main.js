"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => LootGeneratorPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// views/LootGeneratorView.ts
var import_obsidian = require("obsidian");
var VIEW_TYPE_LOOT_GENERATOR = "loot-generator-view";
var LootGeneratorView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    __publicField(this, "plugin");
    __publicField(this, "container");
    __publicField(this, "crInput");
    __publicField(this, "resultContainer");
    __publicField(this, "currentLoot", null);
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_LOOT_GENERATOR;
  }
  getDisplayText() {
    return "\u0413\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0434\u043E\u0431\u044B\u0447\u0438";
  }
  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("loot-generator-container");
    container.createEl("h2", { text: "\u0413\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0434\u043E\u0431\u044B\u0447\u0438" });
    const crContainer = container.createDiv("cr-container");
    crContainer.createEl("h3", { text: "\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438 (CR):" });
    this.crInput = crContainer.createEl("input", {
      type: "number",
      value: "1",
      attr: { min: "0", max: "30" }
    });
    const buttonContainer = container.createDiv("button-container");
    const generateButton = buttonContainer.createEl("button", {
      text: "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
      cls: "generate-button"
    });
    generateButton.addEventListener("click", () => this.generateLoot());
    const copyButton = buttonContainer.createEl("button", {
      text: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
      cls: "copy-button"
    });
    copyButton.addEventListener("click", () => this.copyLootToClipboard());
    this.resultContainer = container.createDiv("result-container");
  }
  async generateLoot() {
    const cr = parseInt(this.crInput.value);
    const lootRanges = this.plugin.generateLoot(cr);
    const generatedCoins = {};
    for (const [coinType, range] of Object.entries(lootRanges.coins)) {
      if (range.max > 0) {
        const amount = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        if (amount > 0) {
          generatedCoins[coinType] = amount;
        }
      }
    }
    this.currentLoot = {
      coins: generatedCoins,
      items: lootRanges.items
    };
    this.displayLoot();
  }
  displayLoot() {
    if (!this.currentLoot) return;
    this.resultContainer.empty();
    const coinsDiv = this.resultContainer.createDiv("coins-section");
    coinsDiv.createEl("h3", { text: "\u041C\u043E\u043D\u0435\u0442\u044B:" });
    for (const [coinType, amount] of Object.entries(this.currentLoot.coins)) {
      coinsDiv.createEl("p", { text: `${amount} ${this.getCoinName(coinType, amount)}` });
    }
    const itemsDiv = this.resultContainer.createDiv("items-section");
    itemsDiv.createEl("h3", { text: "\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B:" });
    if (this.currentLoot.items.length > 0) {
      const itemsList = itemsDiv.createEl("ul");
      for (const item of this.currentLoot.items) {
        itemsList.createEl("li", { text: item.name });
      }
    } else {
      itemsDiv.createEl("p", { text: "\u041D\u0435\u0442 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u0432" });
    }
  }
  getCoinName(type, amount) {
    const names = {
      copper: ["\u043C\u0435\u0434\u043D\u0430\u044F \u043C\u043E\u043D\u0435\u0442\u0430", "\u043C\u0435\u0434\u043D\u044B\u0435 \u043C\u043E\u043D\u0435\u0442\u044B", "\u043C\u0435\u0434\u043D\u044B\u0445 \u043C\u043E\u043D\u0435\u0442"],
      silver: ["\u0441\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u0430\u044F \u043C\u043E\u043D\u0435\u0442\u0430", "\u0441\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u044B\u0435 \u043C\u043E\u043D\u0435\u0442\u044B", "\u0441\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u044B\u0445 \u043C\u043E\u043D\u0435\u0442"],
      gold: ["\u0437\u043E\u043B\u043E\u0442\u0430\u044F \u043C\u043E\u043D\u0435\u0442\u0430", "\u0437\u043E\u043B\u043E\u0442\u044B\u0435 \u043C\u043E\u043D\u0435\u0442\u044B", "\u0437\u043E\u043B\u043E\u0442\u044B\u0445 \u043C\u043E\u043D\u0435\u0442"]
    };
    if (amount % 10 === 1 && amount % 100 !== 11) {
      return names[type][0];
    } else if ([2, 3, 4].includes(amount % 10) && ![12, 13, 14].includes(amount % 100)) {
      return names[type][1];
    } else {
      return names[type][2];
    }
  }
  async copyLootToClipboard() {
    if (!this.currentLoot) {
      new import_obsidian.Notice("\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u0434\u043E\u0431\u044B\u0447\u0443!");
      return;
    }
    let clipboardText = "\u0414\u043E\u0431\u044B\u0447\u0430:\n\n";
    clipboardText += "\u041C\u043E\u043D\u0435\u0442\u044B:\n";
    for (const [coinType, amount] of Object.entries(this.currentLoot.coins)) {
      clipboardText += `${amount} ${this.getCoinName(coinType, amount)}
`;
    }
    clipboardText += "\n\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B:\n";
    if (this.currentLoot.items.length > 0) {
      for (const item of this.currentLoot.items) {
        clipboardText += `- ${item.name}
`;
      }
    } else {
      clipboardText += "\u041D\u0435\u0442 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u0432\n";
    }
    await navigator.clipboard.writeText(clipboardText);
    new import_obsidian.Notice("\u0414\u043E\u0431\u044B\u0447\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430!");
  }
};

// types.ts
var DEFAULT_SETTINGS = {
  defaultCR: 1
};

// main.ts
var import_obsidian3 = require("obsidian");
var LootGeneratorPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "settings", DEFAULT_SETTINGS);
  }
  async onload() {
    await this.loadSettings();
    this.registerView(
      VIEW_TYPE_LOOT_GENERATOR,
      (leaf) => new LootGeneratorView(leaf, this)
    );
    this.addCommand({
      id: "open-loot-generator",
      name: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0434\u043E\u0431\u044B\u0447\u0438",
      callback: () => {
        this.activateView();
      }
    });
    this.addRibbonIcon("dice", "\u0413\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0434\u043E\u0431\u044B\u0447\u0438", () => {
      this.activateView();
    });
  }
  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_LOOT_GENERATOR)[0];
    if (!leaf) {
      const newLeaf = workspace.getRightLeaf(false);
      if (newLeaf) {
        leaf = newLeaf;
        await leaf.setViewState({
          type: VIEW_TYPE_LOOT_GENERATOR,
          active: true
        });
      } else {
        new import_obsidian3.Notice(
          "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0434\u043E\u0431\u044B\u0447\u0438. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0441\u0432\u043E\u0431\u043E\u0434\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u0432 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u043F\u0430\u043D\u0435\u043B\u0438."
        );
        return;
      }
    }
    workspace.revealLeaf(leaf);
  }
  generateLoot(cr) {
    const baseItemCount = Math.max(1, Math.floor(cr / 2));
    const maxItems = Math.min(baseItemCount + Math.floor(Math.random() * 3), 10);
    const adjustProbability = (baseProbability, minCR) => {
      if (cr < minCR) return 0;
      return baseProbability * (cr / Math.max(minCR, 1));
    };
    const possibleItems = [
      // Обычное снаряжение (доступно с CR 0)
      { name: "\u0412\u0435\u0440\u0435\u0432\u043A\u0430 (5 \u0441\u043C)", probability: adjustProbability(0.4, 0), minCR: 0 },
      { name: "\u0424\u0430\u043A\u0435\u043B (1 \u043C\u043C)", probability: adjustProbability(0.35, 0), minCR: 0 },
      { name: "\u0420\u044E\u043A\u0437\u0430\u043A (2 \u0437\u043C)", probability: adjustProbability(0.3, 0), minCR: 0 },
      { name: "\u0424\u043B\u044F\u0433\u0430 \u0441 \u0432\u043E\u0434\u043E\u0439 (2 \u0441\u043C)", probability: adjustProbability(0.3, 0), minCR: 0 },
      // Простое оружие и броня (доступно с CR 1)
      { name: "\u041E\u0440\u0443\u0436\u0438\u0435 (15-50 \u0437\u043C)", probability: adjustProbability(0.3, 1), minCR: 1 },
      { name: "\u0429\u0438\u0442 (10 \u0437\u043C)", probability: adjustProbability(0.2, 1), minCR: 1 },
      { name: "\u0411\u0440\u043E\u043D\u044F (50-75 \u0437\u043C)", probability: adjustProbability(0.1, 1), minCR: 1 },
      // Зелья и свитки (доступно с CR 3)
      { name: "\u0417\u0435\u043B\u044C\u0435 \u043B\u0435\u0447\u0435\u043D\u0438\u044F (50 \u0437\u043C)", probability: adjustProbability(0.2, 3), minCR: 3 },
      {
        name: "\u0421\u0432\u0438\u0442\u043E\u043A \u0437\u0430\u043A\u043B\u0438\u043D\u0430\u043D\u0438\u044F (75-150 \u0437\u043C)",
        probability: adjustProbability(0.1, 3),
        minCR: 3
      },
      // Драгоценные камни (доступны с разных CR)
      { name: "\u0414\u044B\u043C\u0447\u0430\u0442\u044B\u0439 \u043A\u0432\u0430\u0440\u0446 (15-25 \u0437\u043C)", probability: adjustProbability(0.1, 2), minCR: 2 },
      { name: "\u0427\u0435\u0440\u043D\u044B\u0439 \u043E\u043D\u0438\u043A\u0441 (30-45 \u0437\u043C)", probability: adjustProbability(0.1, 3), minCR: 3 },
      {
        name: "\u0420\u043E\u0437\u043E\u0432\u044B\u0439 \u0442\u0443\u0440\u043C\u0430\u043B\u0438\u043D (40-60 \u0437\u043C)",
        probability: adjustProbability(0.1, 4),
        minCR: 4
      },
      {
        name: "\u042F\u043D\u0442\u0430\u0440\u044C \u0441 \u0437\u0430\u0441\u0442\u044B\u0432\u0448\u0438\u043C \u043D\u0430\u0441\u0435\u043A\u043E\u043C\u044B\u043C (50-75 \u0437\u043C)",
        probability: adjustProbability(0.1, 5),
        minCR: 5
      },
      {
        name: "\u041E\u043F\u0430\u043B \u0441 \u043F\u0435\u0440\u0435\u043B\u0438\u0432\u0430\u044E\u0449\u0438\u043C\u0438\u0441\u044F \u0446\u0432\u0435\u0442\u0430\u043C\u0438 (70-90 \u0437\u043C)",
        probability: adjustProbability(0.1, 6),
        minCR: 6
      },
      {
        name: "\u0427\u0438\u0441\u0442\u044B\u0439 \u0441\u0430\u043F\u0444\u0438\u0440 (80-120 \u0437\u043C)",
        probability: adjustProbability(0.05, 7),
        minCR: 7
      },
      {
        name: "\u0420\u0443\u0431\u0438\u043D \u0433\u043B\u0443\u0431\u043E\u043A\u043E\u0433\u043E \u043A\u0440\u0430\u0441\u043D\u043E\u0433\u043E \u0446\u0432\u0435\u0442\u0430 (90-130 \u0437\u043C)",
        probability: adjustProbability(0.05, 8),
        minCR: 8
      },
      {
        name: "\u0421\u0432\u0435\u0440\u043A\u0430\u044E\u0449\u0438\u0439 \u0438\u0437\u0443\u043C\u0440\u0443\u0434 (100-150 \u0437\u043C)",
        probability: adjustProbability(0.05, 9),
        minCR: 9
      },
      // Ювелирные украшения (доступны с разных CR)
      {
        name: "\u041C\u0435\u0434\u043D\u044B\u0439 \u0431\u0440\u0430\u0441\u043B\u0435\u0442 \u0441 \u0440\u0443\u043D\u0430\u043C\u0438 (5-15 \u0437\u043C)",
        probability: adjustProbability(0.1, 2),
        minCR: 2
      },
      {
        name: "\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0435 \u0441 \u043F\u043E\u0434\u0432\u0435\u0441\u043A\u043E\u0439 (15-30 \u0437\u043C)",
        probability: adjustProbability(0.1, 3),
        minCR: 3
      },
      {
        name: "\u0421\u0435\u0440\u044C\u0433\u0438 \u0441 \u043B\u0443\u043D\u043D\u044B\u043C \u043A\u0430\u043C\u043D\u0435\u043C (20-35 \u0437\u043C)",
        probability: adjustProbability(0.1, 4),
        minCR: 4
      },
      {
        name: "\u0417\u043E\u043B\u043E\u0442\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E \u0441 \u0433\u0440\u0430\u0432\u0438\u0440\u043E\u0432\u043A\u043E\u0439 (25-50 \u0437\u043C)",
        probability: adjustProbability(0.1, 5),
        minCR: 5
      },
      {
        name: "\u041C\u0435\u0434\u0430\u043B\u044C\u043E\u043D \u0438\u0437 \u044D\u043B\u0435\u043A\u0442\u0440\u0443\u043C\u0430 (40-60 \u0437\u043C)",
        probability: adjustProbability(0.05, 6),
        minCR: 6
      },
      {
        name: "\u0414\u0438\u0430\u0434\u0435\u043C\u0430 \u0441 \u0440\u0435\u0447\u043D\u044B\u043C \u0436\u0435\u043C\u0447\u0443\u0433\u043E\u043C (50-80 \u0437\u043C)",
        probability: adjustProbability(0.05, 7),
        minCR: 7
      },
      {
        name: "\u041F\u043B\u0430\u0442\u0438\u043D\u043E\u0432\u044B\u0439 \u0431\u0440\u0430\u0441\u043B\u0435\u0442 (75-100 \u0437\u043C)",
        probability: adjustProbability(0.05, 8),
        minCR: 8
      },
      // Безделушки (доступны всегда, но с разной вероятностью в зависимости от CR)
      {
        name: "\u041C\u0443\u043C\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0440\u0443\u043A\u0430 \u0433\u043E\u0431\u043B\u0438\u043D\u0430 (1 \u0441\u043C)",
        probability: adjustProbability(0.15, 0),
        minCR: 0
      },
      {
        name: "\u041A\u0443\u0441\u043E\u0447\u0435\u043A \u043A\u0440\u0438\u0441\u0442\u0430\u043B\u043B\u0430, \u0441\u0432\u0435\u0442\u044F\u0449\u0438\u0439\u0441\u044F \u0432 \u043B\u0443\u043D\u043D\u043E\u043C \u0441\u0432\u0435\u0442\u0435 (5 \u0441\u043C)",
        probability: adjustProbability(0.15, 0),
        minCR: 0
      },
      {
        name: "\u0417\u043E\u043B\u043E\u0442\u0430\u044F \u043C\u043E\u043D\u0435\u0442\u0430 \u0438\u0437 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u044B (2 \u0437\u043C)",
        probability: adjustProbability(0.15, 0),
        minCR: 0
      },
      {
        name: "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u043D\u0430 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u043C \u044F\u0437\u044B\u043A\u0435 (1-5 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041B\u0430\u0442\u0443\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E, \u043D\u0435 \u0442\u0435\u043C\u043D\u0435\u044E\u0449\u0435\u0435 \u0441\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0435\u043C (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0442\u0430\u0440\u0430\u044F \u0441\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u0430\u044F \u0448\u0430\u0445\u043C\u0430\u0442\u043D\u0430\u044F \u0444\u0438\u0433\u0443\u0440\u0430 (3 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0418\u0433\u0440\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0441\u0442\u0438 \u0441 \u0447\u0435\u0440\u0435\u043F\u0430\u043C\u0438 \u0432\u043C\u0435\u0441\u0442\u043E \u0448\u0435\u0441\u0442\u0451\u0440\u043E\u043A (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041D\u0435\u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0438\u0434\u043E\u043B \u0441\u0442\u0440\u0430\u0448\u043D\u043E\u0433\u043E \u0447\u0443\u0434\u043E\u0432\u0438\u0449\u0430 (2 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041E\u0436\u0435\u0440\u0435\u043B\u044C\u0435 \u0438\u0437 \u044D\u043B\u044C\u0444\u0438\u0439\u0441\u043A\u0438\u0445 \u043F\u0430\u043B\u044C\u0446\u0435\u0432 (0 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041A\u0432\u0438\u0442\u0430\u043D\u0446\u0438\u044F \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u0441\u044B\u043B\u043A\u0438 (0 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041A\u0443\u0441\u043E\u0447\u0435\u043A \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0433\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430 (1-3 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0422\u0440\u044F\u043F\u0438\u0447\u043D\u0430\u044F \u043A\u0443\u043A\u043B\u0430 \u0441 \u0438\u0433\u043E\u043B\u043A\u0430\u043C\u0438 (1 \u043C\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0417\u0443\u0431 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0433\u043E \u0437\u0432\u0435\u0440\u044F (2 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041E\u0433\u0440\u043E\u043C\u043D\u0430\u044F \u0447\u0435\u0448\u0443\u0439\u043A\u0430 \u0434\u0440\u0430\u043A\u043E\u043D\u0430 (5-10 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u042F\u0440\u043A\u043E-\u0437\u0435\u043B\u0451\u043D\u043E\u0435 \u043F\u0435\u0440\u043E (1 \u0441\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u0421\u0442\u0430\u0440\u0430\u044F \u0433\u0430\u0434\u0430\u043B\u044C\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430 \u0441 \u0432\u0430\u0448\u0438\u043C \u043B\u0438\u0446\u043E\u043C (0 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u0430\u044F \u0441\u0444\u0435\u0440\u0430 \u0441 \u0434\u044B\u043C\u043E\u043C (2 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u041A\u0440\u0430\u0441\u043D\u043E\u0435 \u044F\u0439\u0446\u043E (1 \u0441\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u041A\u0443\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0442\u0440\u0443\u0431\u043A\u0430 \u0441 \u043F\u0443\u0437\u044B\u0440\u044F\u043C\u0438 (3 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0413\u0440\u0430\u0444\u0438\u043D \u0441 \u043C\u0443\u0442\u043D\u043E\u0439 \u0436\u0438\u0434\u043A\u043E\u0441\u0442\u044C\u044E (1 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u0448\u043A\u0430\u0442\u0443\u043B\u043A\u0430 \u0433\u043D\u043E\u043C\u044C\u0435\u0439 \u0440\u0430\u0431\u043E\u0442\u044B (5-15 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0442\u0430\u0442\u0443\u044D\u0442\u043A\u0430 \u043D\u0430\u0440\u044F\u0434\u043D\u043E\u0433\u043E \u043F\u043E\u043B\u0443\u0440\u043E\u0441\u043B\u0438\u043A\u0430 (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041B\u0430\u0442\u0443\u043D\u043D\u0430\u044F \u0441\u0444\u0435\u0440\u0430 \u0441 \u0440\u0443\u043D\u0430\u043C\u0438 (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0420\u0430\u0437\u043D\u043E\u0446\u0432\u0435\u0442\u043D\u044B\u0439 \u043A\u0430\u043C\u0435\u043D\u043D\u044B\u0439 \u0434\u0438\u0441\u043A (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u044B\u0439 \u0432\u043E\u0440\u043E\u043D (4 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u041A\u043E\u0433\u043E\u0442\u044C \u0434\u0440\u0430\u043A\u043E\u043D\u0430, \u043F\u043E\u0434\u0432\u0435\u0448\u0435\u043D\u043D\u044B\u0439 \u043D\u0430 \u043F\u0440\u043E\u0441\u0442\u043E\u043C \u043A\u043E\u0436\u0430\u043D\u043E\u043C \u0448\u043D\u0443\u0440\u043A\u0435 (3-8 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041F\u0430\u0440\u0430 \u0441\u0442\u0430\u0440\u044B\u0445 \u043D\u043E\u0441\u043A\u043E\u0432 (0 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0427\u0438\u0441\u0442\u0430\u044F \u043A\u043D\u0438\u0433\u0430, \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0445 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F \u043F\u0438\u0441\u0430\u0442\u044C (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u044B\u0439 \u0437\u043D\u0430\u0447\u043E\u043A \u0432 \u0444\u043E\u0440\u043C\u0435 \u043F\u044F\u0442\u0438\u043A\u043E\u043D\u0435\u0447\u043D\u043E\u0439 \u0437\u0432\u0435\u0437\u0434\u044B (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041D\u043E\u0436, \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0430\u0432\u0448\u0438\u0439 \u0440\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A\u0443 (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u044B\u0439 \u0444\u043B\u0430\u043A\u043E\u043D \u0441 \u043E\u0431\u0440\u0435\u0437\u043A\u0430\u043C\u0438 \u043D\u043E\u0433\u0442\u0435\u0439 (0 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E \u0441 \u043A\u043E\u043B\u043F\u0430\u0447\u043A\u0430\u043C\u0438 (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0411\u0435\u043B\u044B\u0435 \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0438 \u0441 \u0431\u043B\u0451\u0441\u0442\u043A\u0430\u043C\u0438 (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041E\u0434\u0435\u044F\u043D\u0438\u0435 \u0441 \u0441\u043E\u0442\u043D\u0435\u0439 \u043A\u0440\u043E\u0445\u043E\u0442\u043D\u044B\u0445 \u043A\u0430\u0440\u043C\u0430\u043D\u043E\u0432 (5 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0439 \u043A\u0430\u043C\u0435\u043D\u043D\u044B\u0439 \u043A\u0438\u0440\u043F\u0438\u0447, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0432\u0435\u0441\u0438\u0442 (10 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041A\u0440\u043E\u0445\u043E\u0442\u043D\u044B\u0439 \u043D\u0430\u0431\u0440\u043E\u0441\u043E\u043A \u043F\u043E\u0440\u0442\u0440\u0435\u0442\u0430 \u0433\u043E\u0431\u043B\u0438\u043D\u0430 (1 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041F\u0443\u0441\u0442\u043E\u0439 \u0444\u043B\u0430\u043A\u043E\u043D, \u043F\u0430\u0445\u043D\u0443\u0449\u0438\u0439 \u0434\u0443\u0445\u0430\u043C\u0438 \u043F\u0440\u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0438 (2 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0414\u0440\u0430\u0433\u043E\u0446\u0435\u043D\u043D\u044B\u0439 \u043A\u0430\u043C\u0435\u043D\u044C-\u0445\u0430\u043C\u0435\u043B\u0435\u043E\u043D (15-25 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041A\u0443\u0441\u043E\u043A \u0441\u0442\u0430\u0440\u043E\u0433\u043E \u0437\u043D\u0430\u043C\u0435\u043D\u0438 (0 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0417\u043D\u0430\u043A \u0440\u0430\u0437\u043B\u0438\u0447\u0438\u044F \u0434\u0440\u0435\u0432\u043D\u0435\u0433\u043E \u043B\u0435\u0433\u0438\u043E\u043D\u0430 (5 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041A\u0440\u043E\u0445\u043E\u0442\u043D\u044B\u0439 \u0441\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u044B\u0439 \u043A\u043E\u043B\u043E\u043A\u043E\u043B\u044C\u0447\u0438\u043A \u0431\u0435\u0437 \u044F\u0437\u044B\u0447\u043A\u0430 (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043A\u0430\u043D\u0430\u0440\u0435\u0439\u043A\u0430 \u0432 \u0433\u043D\u043E\u043C\u044C\u0435\u0439 \u043B\u0430\u043C\u043F\u0435 (8-12 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041A\u0440\u043E\u0445\u043E\u0442\u043D\u044B\u0439 \u0441\u0443\u043D\u0434\u0443\u043A \u0441 \u043D\u0435\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E \u0433\u043B\u0443\u0431\u043E\u043A\u0438\u043C \u0434\u043D\u043E\u043C (7 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041C\u0451\u0440\u0442\u0432\u044B\u0439 \u0441\u043F\u0440\u0430\u0439\u0442 \u0432 \u0447\u0438\u0441\u0442\u043E\u0439 \u0441\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u043E\u0439 \u0431\u0443\u0442\u044B\u043B\u043A\u0435 (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0417\u0430\u043F\u0430\u044F\u043D\u043D\u0430\u044F \u043C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0431\u0430\u043D\u043A\u0430 \u0441 \u0436\u0438\u0434\u043A\u043E\u0441\u0442\u044C\u044E (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u0430\u044F \u0441\u0444\u0435\u0440\u0430 \u0441 \u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0437\u043E\u043B\u043E\u0442\u043E\u0439 \u0440\u044B\u0431\u043A\u043E\u0439 (6 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u0430\u044F \u043B\u043E\u0436\u043A\u0430 \u0441 \u0432\u044B\u0433\u0440\u0430\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0431\u0443\u043A\u0432\u043E\u0439 '\u041C' (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0432\u0438\u0441\u0442\u043E\u043A \u0438\u0437 \u0434\u0435\u0440\u0435\u0432\u0430 \u0437\u043E\u043B\u043E\u0442\u043E\u0433\u043E \u0446\u0432\u0435\u0442\u0430 (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041C\u0451\u0440\u0442\u0432\u044B\u0439 \u0441\u043A\u0430\u0440\u0430\u0431\u0435\u0439 \u0440\u0430\u0437\u043C\u0435\u0440\u043E\u043C \u0441 \u043B\u0430\u0434\u043E\u043D\u044C (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0414\u0432\u0430 \u0438\u0433\u0440\u0443\u0448\u0435\u0447\u043D\u044B\u0445 \u0441\u043E\u043B\u0434\u0430\u0442\u0438\u043A\u0430, \u043E\u0434\u0438\u043D \u0431\u0435\u0437 \u0433\u043E\u043B\u043E\u0432\u044B (1 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041D\u0435\u0431\u043E\u043B\u044C\u0448\u0430\u044F \u043A\u043E\u0440\u043E\u0431\u043A\u0430 \u0441 \u043F\u0443\u0433\u043E\u0432\u0438\u0446\u0430\u043C\u0438 \u0440\u0430\u0437\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (2 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0432\u0435\u0447\u0430, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043D\u0438\u043A\u0430\u043A \u043D\u0435 \u0437\u0430\u0433\u043E\u0440\u0430\u0435\u0442\u0441\u044F (5 \u043C\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041A\u0440\u043E\u0445\u043E\u0442\u043D\u0430\u044F \u043A\u043B\u0435\u0442\u043A\u0430 \u0431\u0435\u0437 \u0434\u0432\u0435\u0440\u0446\u044B (3 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u0421\u0442\u0430\u0440\u044B\u0439 \u043A\u043B\u044E\u0447 (1 \u0441\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u041D\u0435 \u043F\u043E\u0434\u0434\u0430\u044E\u0449\u0430\u044F\u0441\u044F \u0440\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u043A\u0435 \u043A\u0430\u0440\u0442\u0430 \u0441\u043E\u043A\u0440\u043E\u0432\u0438\u0449 (5-15 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0420\u0443\u043A\u043E\u044F\u0442\u043A\u0430 \u043E\u0442 \u0441\u043B\u043E\u043C\u0430\u043D\u043D\u043E\u0433\u043E \u043C\u0435\u0447\u0430 (2 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u041A\u0440\u043E\u043B\u0438\u0447\u044C\u044F \u043B\u0430\u043F\u043A\u0430 (1 \u0441\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      { name: "\u0421\u0442\u0435\u043A\u043B\u044F\u043D\u043D\u044B\u0439 \u0433\u043B\u0430\u0437 (2 \u0441\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u041A\u0430\u043C\u0435\u044F \u0441 \u0440\u0435\u0437\u043D\u044B\u043C \u043F\u043E\u0440\u0442\u0440\u0435\u0442\u043E\u043C \u0443\u0436\u0430\u0441\u043D\u043E\u0433\u043E \u043B\u0438\u0446\u0430 (4 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u044B\u0439 \u0447\u0435\u0440\u0435\u043F \u0440\u0430\u0437\u043C\u0435\u0440\u043E\u043C \u0441 \u043C\u043E\u043D\u0435\u0442\u0443 (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0410\u043B\u0435\u0431\u0430\u0441\u0442\u0440\u043E\u0432\u0430\u044F \u043C\u0430\u0441\u043A\u0430 (5 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u043A\u0430 \u0431\u043B\u0430\u0433\u043E\u0432\u043E\u043D\u0438\u044F (1 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041D\u043E\u0447\u043D\u043E\u0439 \u043A\u043E\u043B\u043F\u0430\u043A, \u0434\u0430\u0440\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u0438\u044F\u0442\u043D\u044B\u0435 \u0441\u043D\u044B (8 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041E\u0434\u0438\u043D \u043A\u043E\u0441\u0442\u044F\u043D\u043E\u0439 \u043A\u0430\u043B\u0442\u0440\u043E\u043F (1 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0417\u043E\u043B\u043E\u0442\u0430\u044F \u043E\u043F\u0440\u0430\u0432\u0430 \u043C\u043E\u043D\u043E\u043A\u043B\u044F \u0431\u0435\u0437 \u043B\u0438\u043D\u0437\u044B (5 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0420\u0430\u0437\u043D\u043E\u0446\u0432\u0435\u0442\u043D\u044B\u0439 \u043A\u0443\u0431\u0438\u043A (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0425\u0440\u0443\u0441\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u0432\u0435\u0440\u043D\u0430\u044F \u0440\u0443\u0447\u043A\u0430 (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041F\u0430\u043A\u0435\u0442\u0438\u043A \u0440\u043E\u0437\u043E\u0432\u043E\u0439 \u043F\u044B\u043B\u0438 (1 \u043C\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0414\u0432\u0430 \u043B\u0438\u0441\u0442\u0430 \u043F\u0435\u0440\u0433\u0430\u043C\u0435\u043D\u0442\u0430 \u0441 \u043D\u043E\u0442\u0430\u043C\u0438 (2 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u0430\u044F \u0441\u0435\u0440\u044C\u0433\u0430-\u0441\u043B\u0435\u0437\u0438\u043D\u043A\u0430 (4 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u042F\u0438\u0447\u043D\u0430\u044F \u0441\u043A\u043E\u0440\u043B\u0443\u043F\u0430 \u0441 \u0436\u0443\u0442\u043A\u0438\u043C\u0438 \u0441\u0446\u0435\u043D\u0430\u043C\u0438 (0 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0412\u0435\u0435\u0440 \u0441\u043E \u0441\u043F\u044F\u0449\u0435\u0439 \u043A\u043E\u0448\u043A\u043E\u0439 (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041D\u0430\u0431\u043E\u0440 \u043A\u043E\u0441\u0442\u044F\u043D\u044B\u0445 \u0442\u0440\u0443\u0431\u043E\u0447\u0435\u043A (3 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0417\u0430\u0441\u0443\u0448\u0435\u043D\u043D\u044B\u0439 \u0447\u0435\u0442\u044B\u0440\u0451\u0445\u043B\u0438\u0441\u0442\u043D\u044B\u0439 \u043A\u043B\u0435\u0432\u0435\u0440 (1 \u0441\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041B\u0438\u0441\u0442 \u0441 \u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0435\u0439 (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0420\u0430\u0437\u0443\u043A\u0440\u0430\u0448\u0435\u043D\u043D\u044B\u0435 \u043D\u043E\u0436\u043D\u044B (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u043D\u0430 \u0440\u043E\u043A\u043E\u0432\u0443\u044E \u0432\u0435\u0447\u0435\u0440\u0438\u043D\u043A\u0443 (0 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0411\u0440\u043E\u043D\u0437\u043E\u0432\u0430\u044F \u043F\u0435\u043D\u0442\u0430\u0433\u0440\u0430\u043C\u043C\u0430 (4 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439 \u043F\u043B\u0430\u0442\u043E\u043A \u0430\u0440\u0445\u0438\u043C\u0430\u0433\u0430 (10 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041F\u043E\u043B\u043E\u0432\u0438\u043D\u043A\u0430 \u043F\u043B\u0430\u043D\u0430 \u0445\u0440\u0430\u043C\u0430 (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0412\u043E\u043B\u0448\u0435\u0431\u043D\u0430\u044F \u0441\u043A\u043B\u0430\u0434\u043D\u0430\u044F \u043A\u0435\u043F\u043A\u0430 (5 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0430\u044F \u043A\u0432\u0438\u0442\u0430\u043D\u0446\u0438\u044F (0 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0414\u043D\u0435\u0432\u043D\u0438\u043A \u0431\u0435\u0437 \u0441\u0442\u0440\u0430\u043D\u0438\u0446 (1 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u0430\u044F \u0442\u0430\u0431\u0430\u043A\u0435\u0440\u043A\u0430 (5 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0416\u0435\u043B\u0435\u0437\u043D\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B \u0431\u043E\u0436\u0435\u0441\u0442\u0432\u0430 (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041A\u043D\u0438\u0433\u0430 \u0431\u0435\u0437 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0439 \u0433\u043B\u0430\u0432\u044B (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u043E\u0441\u0443\u0434 \u0441 \u0434\u0440\u0430\u043A\u043E\u043D\u044C\u0435\u0439 \u043A\u0440\u043E\u0432\u044C\u044E (15-25 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0414\u0440\u0435\u0432\u043D\u044F\u044F \u044D\u043B\u044C\u0444\u0438\u0439\u0441\u043A\u0430\u044F \u0441\u0442\u0440\u0435\u043B\u0430 (5 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u041D\u0435\u0433\u043D\u0443\u0449\u0430\u044F\u0441\u044F \u0438\u0433\u043E\u043B\u043A\u0430 (1 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      { name: "\u0414\u0432\u0430\u0440\u0444\u0441\u043A\u0430\u044F \u0431\u0440\u043E\u0448\u044C (6 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u0411\u0443\u0442\u044B\u043B\u043A\u0430 \u044D\u043B\u0438\u0442\u043D\u043E\u0433\u043E \u0432\u0438\u043D\u0430 (8 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0413\u043B\u0430\u0437\u0443\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u043C\u043E\u0437\u0430\u0438\u043A\u0430 (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u041E\u043A\u0430\u043C\u0435\u043D\u0435\u0432\u0448\u0430\u044F \u043C\u044B\u0448\u044C (1 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      { name: "\u041F\u0438\u0440\u0430\u0442\u0441\u043A\u0438\u0439 \u0444\u043B\u0430\u0433 (3 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      { name: "\u041C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u0440\u0430\u0431 (7 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u0424\u043B\u0430\u043A\u043E\u043D \u0436\u0438\u0440\u0430 \u0433\u0440\u0438\u0444\u043E\u043D\u0430 (12 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0414\u0432\u0443\u0445\u0433\u043E\u043B\u043E\u0432\u044B\u0439 \u0447\u0435\u0440\u0432\u044F\u043A \u0432 \u043A\u043E\u0440\u043E\u0431\u043A\u0435 (4 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u0423\u0440\u043D\u0430 \u0441 \u043F\u0440\u0430\u0445\u043E\u043C (5 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      { name: "\u0428\u0435\u043F\u0447\u0443\u0449\u0438\u0439 \u043A\u0430\u043C\u0435\u043D\u044C (8 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u0440\u0430\u043A\u043E\u0432\u0438\u043D\u0430 (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u0448\u043A\u0430\u0442\u0443\u043B\u043A\u0430 (10 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u0411\u0430\u043D\u043A\u0430 \u0441 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043E\u043C (6 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u041E\u043A\u0430\u043C\u0435\u043D\u0435\u0432\u0448\u0430\u044F \u0440\u0430\u043A\u043E\u0432\u0438\u043D\u0430 (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0413\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043A\u0430 \u0441\u0442\u0438\u0445\u0438\u0439 (5 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u041C\u0430\u0433\u043D\u0438\u0442\u043D\u044B\u0439 \u043A\u0443\u0431\u0438\u043A (4 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      { name: "\u041A\u043E\u043B\u044C\u0446\u043E \u0441 \u043D\u0430\u0434\u043F\u0438\u0441\u044C\u044E (7 \u0437\u043C)", probability: adjustProbability(0.05, 0), minCR: 0 },
      {
        name: "\u0411\u0440\u0430\u0441\u043B\u0435\u0442 \u0438\u0437 \u043A\u0440\u044E\u0447\u043A\u043E\u0432 (2 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      {
        name: "\u0421\u0442\u0438\u0445\u043E\u0442\u0432\u043E\u0440\u043D\u044B\u0439 \u0434\u043D\u0435\u0432\u043D\u0438\u043A (3 \u0437\u043C)",
        probability: adjustProbability(0.05, 0),
        minCR: 0
      },
      { name: "\u0421\u0432\u0435\u0442\u044F\u0449\u0438\u0439\u0441\u044F \u043A\u0430\u043C\u0435\u043D\u044C (6 \u0437\u043C)", probability: adjustProbability(0.15, 0), minCR: 0 }
    ];
    const availableItems = possibleItems.filter((item) => cr >= item.minCR).filter((item) => Math.random() < item.probability);
    const selectedItems = [];
    const shuffledItems = [...availableItems].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(maxItems, shuffledItems.length); i++) {
      selectedItems.push(shuffledItems[i]);
    }
    return {
      coins: {
        copper: { min: Math.floor(3 * cr), max: Math.floor(18 * cr) },
        silver: { min: Math.floor(2 * cr), max: Math.floor(12 * cr) },
        gold: {
          min: Math.floor(cr > 5 ? cr - 5 : 0),
          max: Math.floor(cr > 5 ? 6 * (cr - 5) : 0)
        }
      },
      items: selectedItems
    };
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
