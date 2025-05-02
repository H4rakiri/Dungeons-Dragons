---
name: "Артис"
class: "Воин"
level: 10
race: "Тифлинг"
background: "Воин"
alignment: "Хаотично добрый"
experience: 600

# Характеристики
strength: 20
dexterity: 8
constitution: 12
intelligence: 20
wisdom: 15
charisma: 12

# Спасброски
strengthSaveProficient: false
dexteritySaveProficient: false
constitutionSaveProficient: false
intelligenceSaveProficient: false
wisdomSaveProficient: false
charismaSaveProficient: false

# Навыки
acrobaticsProficient: false
acrobaticsExpert: false
animalHandlingProficient: false
animalHandlingExpert: false
arcanaProficient: false
arcanaExpert: false
athleticsProficient: false
athleticsExpert: false
deceptionProficient: false
deceptionExpert: false
historyProficient: false
historyExpert: false
insightProficient: false
insightExpert: false
intimidationProficient: false
intimidationExpert: false
investigationProficient: false
investigationExpert: false
medicineProficient: false
medicineExpert: false
natureProficient: false
natureExpert: false
perceptionProficient: false
perceptionExpert: false
performanceProficient: false
performanceExpert: false
persuasionProficient: false
persuasionExpert: false
religionProficient: false
religionExpert: false
sleightOfHandProficient: false
sleightOfHandExpert: false
stealthProficient: false
stealthExpert: false
survivalProficient: false
survivalExpert: false

# Боевые характеристики
armorClass: 18
speed: 30
maxHp: 100
currentHp: 10
tempHp: 0
hitDice: "1d8"

# Заклинания
spellcastingAbility: "Харизма"
spellSlots:
  1: 2
  2: 4
  3: 4
  4: 5
  5: 0
  6: 0
  7: 0
  8: 0
  9: 0
---

```dataviewjs
// Функции для расчетов
const calculateModifier = (score) => Math.floor((score - 10) / 2);
const calculateProficiencyBonus = (level) => Math.floor((level - 1) / 4) + 2;
const calculateSkillModifier = (abilityScore, proficient, expert, proficiencyBonus) => {
    const baseModifier = calculateModifier(abilityScore);
    if (expert) return baseModifier + (proficiencyBonus * 2);
    if (proficient) return baseModifier + proficiencyBonus;
    return baseModifier;
};

// Получаем данные из frontmatter
const data = dv.current();
const proficiencyBonus = calculateProficiencyBonus(data.level);

// Основная информация
dv.header(2, "Основная информация");
dv.table(
    ["Параметр", "Значение"],
    [
        ["Имя персонажа", data.name],
        ["Класс и уровень", `${data.class} ${data.level}`],
        ["Раса", data.race],
        ["Предыстория", data.background],
        ["Мировоззрение", data.alignment],
        ["Опыт", data.experience]
    ]
);

// Характеристики
dv.header(2, "Характеристики");
dv.table(
    ["Характеристика", "Значение", "Модификатор"],
    [
        ["Сила", data.strength, calculateModifier(data.strength)],
        ["Ловкость", data.dexterity, calculateModifier(data.dexterity)],
        ["Телосложение", data.constitution, calculateModifier(data.constitution)],
        ["Интеллект", data.intelligence, calculateModifier(data.intelligence)],
        ["Мудрость", data.wisdom, calculateModifier(data.wisdom)],
        ["Харизма", data.charisma, calculateModifier(data.charisma)]
    ]
);

// Бонус мастерства
dv.header(2, "Бонус мастерства");
dv.paragraph(`+${proficiencyBonus}`);

// Спасброски
dv.header(2, "Спасброски");
dv.table(
    ["Характеристика", "Модификатор"],
    [
        ["Сила", calculateSkillModifier(data.strength, data.strengthSaveProficient, false, proficiencyBonus)],
        ["Ловкость", calculateSkillModifier(data.dexterity, data.dexteritySaveProficient, false, proficiencyBonus)],
        ["Телосложение", calculateSkillModifier(data.constitution, data.constitutionSaveProficient, false, proficiencyBonus)],
        ["Интеллект", calculateSkillModifier(data.intelligence, data.intelligenceSaveProficient, false, proficiencyBonus)],
        ["Мудрость", calculateSkillModifier(data.wisdom, data.wisdomSaveProficient, false, proficiencyBonus)],
        ["Харизма", calculateSkillModifier(data.charisma, data.charismaSaveProficient, false, proficiencyBonus)]
    ]
);

// Навыки
dv.header(2, "Навыки");
const skills = [
    ["Акробатика", "dexterity", "acrobatics"],
    ["Уход за животными", "wisdom", "animalHandling"],
    ["Магия", "intelligence", "arcana"],
    ["Атлетика", "strength", "athletics"],
    ["Обман", "charisma", "deception"],
    ["История", "intelligence", "history"],
    ["Проницательность", "wisdom", "insight"],
    ["Запугивание", "charisma", "intimidation"],
    ["Расследование", "intelligence", "investigation"],
    ["Медицина", "wisdom", "medicine"],
    ["Природа", "intelligence", "nature"],
    ["Восприятие", "wisdom", "perception"],
    ["Выступление", "charisma", "performance"],
    ["Убеждение", "charisma", "persuasion"],
    ["Религия", "intelligence", "religion"],
    ["Ловкость рук", "dexterity", "sleightOfHand"],
    ["Скрытность", "dexterity", "stealth"],
    ["Выживание", "wisdom", "survival"]
];

dv.table(
    ["Навык", "Модификатор"],
    skills.map(([name, ability, skill]) => [
        name,
        calculateSkillModifier(
            data[ability],
            data[`${skill}Proficient`],
            data[`${skill}Expert`],
            proficiencyBonus
        )
    ])
);

// Боевые характеристики
dv.header(2, "Боевые характеристики");
dv.table(
    ["Параметр", "Значение"],
    [
        ["Класс доспеха", data.armorClass],
        ["Скорость", data.speed],
        ["Максимум хитов", data.maxHp],
        ["Текущие хиты", data.currentHp],
        ["Временные хиты", data.tempHp],
        ["Кости хитов", data.hitDice]
    ]
);

// Заклинания
dv.header(2, "Заклинания");
dv.table(
    ["Параметр", "Значение"],
    [
        ["Характеристика заклинаний", data.spellcastingAbility],
        ["Сл спасброска от заклинаний", 8 + proficiencyBonus + calculateModifier(data[data.spellcastingAbility.toLowerCase()])],
        ["Бонус атаки заклинаниями", proficiencyBonus + calculateModifier(data[data.spellcastingAbility.toLowerCase()])]
    ]
);

// Ячейки заклинаний
dv.header(3, "Ячейки заклинаний");
dv.table(
    ["Уровень", "Количество"],
    Object.entries(data.spellSlots).map(([level, slots]) => [level, slots])
);
```
