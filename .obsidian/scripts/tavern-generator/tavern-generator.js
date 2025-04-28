// Генератор таверн для Obsidian
// Подключаем данные
const tavernData = require("./tavern-generator-data.js");

class TavernGenerator {
  constructor(data) {
    this.data = data;
  }

  // Получить случайный элемент из массива
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Получить несколько случайных элементов из массива
  getRandomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Генерация случайной цены
  generatePrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Генерация названия таверны
  generateName() {
    const prefix = this.getRandomElement(this.data.prefixes);
    const noun = this.getRandomElement(this.data.nouns);
    return `"${prefix} ${noun}"`;
  }

  // Генерация описания здания
  generateBuilding() {
    const building = this.getRandomElement(this.data.buildingDescriptions);
    return {
      description: building.description,
      features: building.features,
      condition: building.condition,
    };
  }

  // Генерация интерьера
  generateInterior() {
    const commonRoom = this.getRandomElement(
      this.data.interiorFeatures.filter((f) => f.type === "common_room")
    );
    const bar = this.getRandomElement(
      this.data.interiorFeatures.filter((f) => f.type === "bar")
    );
    const specialRoom =
      Math.random() > 0.5
        ? this.getRandomElement(
            this.data.interiorFeatures.filter((f) => f.type === "special_room")
          )
        : null;

    return {
      commonRoom,
      bar,
      specialRoom,
    };
  }

  // Генерация посетителей
  generatePatrons() {
    const patronCount = Math.floor(Math.random() * 3) + 2; // 2-4 посетителя
    return this.getRandomElements(this.data.patronDescriptions, patronCount);
  }

  // Генерация слухов
  generateRumors() {
    const rumorCount = Math.floor(Math.random() * 2) + 1; // 1-2 слуха
    return this.getRandomElements(this.data.rumors, rumorCount);
  }

  // Генерация меню
  generateMenu() {
    const meals = this.getRandomElements(this.data.specialMeals, 2);
    const drinks = this.getRandomElements(this.data.drinks, 2);
    return { meals, drinks };
  }

  // Генерация услуг
  generateServices() {
    return this.getRandomElements(this.data.specialServices, 2);
  }

  // Основной метод генерации таверны
  generate() {
    const name = this.generateName();
    const building = this.generateBuilding();
    const interior = this.generateInterior();
    const patrons = this.generatePatrons();
    const rumors = this.generateRumors();
    const menu = this.generateMenu();
    const services = this.generateServices();

    // Формируем текст в формате Markdown
    let tavernText = `# Таверна ${name}\n\n`;

    // Описание здания
    tavernText += `## Внешний вид\n${building.description}\n\n`;
    tavernText += `**Особенности здания:**\n${building.features
      .map((f) => `- ${f}`)
      .join("\n")}\n`;
    tavernText += `**Состояние:** ${building.condition}\n\n`;

    // Интерьер
    tavernText += `## Интерьер\n`;
    tavernText += `### Общий зал\n${interior.commonRoom.description}\n`;
    tavernText += `**Атмосфера:** ${interior.commonRoom.atmosphere}\n`;
    tavernText += `**Детали:**\n${interior.commonRoom.features
      .map((f) => `- ${f}`)
      .join("\n")}\n\n`;

    tavernText += `### Барная стойка\n${interior.bar.description}\n`;
    tavernText += `**Особенности:**\n${interior.bar.features
      .map((f) => `- ${f}`)
      .join("\n")}\n\n`;

    if (interior.specialRoom) {
      tavernText += `### Особое помещение\n${interior.specialRoom.description}\n`;
      tavernText += `**Детали:**\n${interior.specialRoom.features
        .map((f) => `- ${f}`)
        .join("\n")}\n\n`;
    }

    // Посетители
    tavernText += `## Посетители\n`;
    patrons.forEach((patron, index) => {
      tavernText += `### Посетитель ${index + 1}\n`;
      tavernText += `**Описание:** ${patron.description}\n`;
      tavernText += `**Поведение:** ${patron.behavior}\n`;
      tavernText += `**История:** ${patron.story}\n\n`;
    });

    // Слухи
    tavernText += `## Слухи\n`;
    rumors.forEach((rumor, index) => {
      tavernText += `### Слух ${index + 1}\n`;
      tavernText += `**Что говорят:** ${rumor.rumor}\n`;
      tavernText += `**Правда:** ${rumor.truth}\n`;
      tavernText += `**Зацепки:**\n${rumor.hooks
        .map((h) => `- ${h}`)
        .join("\n")}\n\n`;
    });

    // Меню
    tavernText += `## Меню\n`;
    tavernText += `### Особые блюда\n`;
    menu.meals.forEach((meal) => {
      tavernText += `#### ${meal.name}\n`;
      tavernText += `**Описание:** ${meal.description}\n`;
      tavernText += `**Цена:** ${meal.price}\n`;
      tavernText += `**Эффект:** ${meal.effect}\n\n`;
    });

    tavernText += `### Напитки\n`;
    menu.drinks.forEach((drink) => {
      tavernText += `#### ${drink.name}\n`;
      tavernText += `**Описание:** ${drink.description}\n`;
      tavernText += `**Цена:** ${drink.price}\n`;
      tavernText += `**Эффект:** ${drink.effect}\n\n`;
    });

    // Услуги
    tavernText += `## Услуги\n`;
    services.forEach((service) => {
      tavernText += `### ${service.name}\n`;
      tavernText += `**Описание:** ${service.description}\n`;
      tavernText += `**Цена:** ${service.price}\n`;
      tavernText += `**Особенности:**\n${service.features
        .map((f) => `- ${f}`)
        .join("\n")}\n\n`;
    });

    return tavernText;
  }
}

// Создаём экземпляр генератора
const generator = new TavernGenerator(tavernData);

// Функция для DataviewJS
function generateTavern() {
  const container = this.container;
  const buttonDiv = container.createDiv();
  const button = buttonDiv.createEl("button", {
    text: "Сгенерировать таверну",
  });

  const contentDiv = container.createDiv();
  contentDiv.addClass("tavern-content");

  button.addEventListener("click", () => {
    const tavernText = generator.generate();
    contentDiv.innerHTML = DOMPurify.sanitize(marked.parse(tavernText));
  });
}

// Экспортируем функцию для использования в Obsidian
module.exports = generateTavern;
