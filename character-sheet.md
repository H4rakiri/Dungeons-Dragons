---
name: "Имя персонажа"
class: "Класс"
level: 1
race: "Раса"
background: "Предыстория"
alignment: "Мировоззрение"
experience: 0

# Характеристики
strength: 10
dexterity: 10
constitution: 10
intelligence: 10
wisdom: 10
charisma: 10

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
armorClass: 10
speed: 30
maxHp: 10
currentHp: 10
tempHp: 0
hitDice: "1d8"

# Заклинания
spellcastingAbility: "Интеллект"
spellSlots:
  1: 2
  2: 0
  3: 0
  4: 0
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

// Создаем HTML для листа персонажа
const sheet = `
<div class="character-sheet">
    <style>
        .character-sheet {
            font-family: 'Times New Roman', serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
            color: #333;
            border: 2px solid #8b4513;
            border-radius: 5px;
        }
        .section {
            margin-bottom: 20px;
            padding: 15px;
            background-color: white;
            border: 1px solid #8b4513;
            border-radius: 3px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #8b4513;
            margin: 0;
            font-size: 2em;
        }
        .grid-2, .grid-3, .grid-6 {
            display: grid;
            gap: 10px;
            margin-top: 10px;
        }
        .grid-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-3 { grid-template-columns: repeat(3, 1fr); }
        .grid-6 { grid-template-columns: repeat(6, 1fr); }
        .field {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .field label {
            font-weight: bold;
            color: #8b4513;
        }
        .ability {
            text-align: center;
            padding: 10px;
            border: 1px solid #8b4513;
            border-radius: 3px;
        }
        .ability-name {
            font-weight: bold;
            color: #8b4513;
        }
        .modifier {
            font-size: 1.2em;
            font-weight: bold;
            color: #8b4513;
        }
        .proficiency-bonus {
            font-size: 1.5em;
            font-weight: bold;
            text-align: center;
            color: #8b4513;
        }
        .saving-throw, .skill {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px;
            border: 1px solid #8b4513;
            border-radius: 3px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }
        th, td {
            padding: 8px;
            border: 1px solid #8b4513;
            text-align: left;
        }
        th {
            background-color: #8b4513;
            color: white;
        }
        .spellcasting-info {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 15px;
        }
        .spell-slot {
            text-align: center;
            padding: 8px;
            border: 1px solid #8b4513;
            border-radius: 3px;
        }
    </style>

    <div class="header">
        <h1>Лист персонажа D&D 5e</h1>
    </div>

    <div class="section">
        <h2>Основная информация</h2>
        <div class="grid-2">
            <div class="field">
                <label>Имя персонажа:</label>
                <div>${data.name}</div>
            </div>
            <div class="field">
                <label>Класс и уровень:</label>
                <div>${data.class} ${data.level}</div>
            </div>
            <div class="field">
                <label>Раса:</label>
                <div>${data.race}</div>
            </div>
            <div class="field">
                <label>Предыстория:</label>
                <div>${data.background}</div>
            </div>
            <div class="field">
                <label>Мировоззрение:</label>
                <div>${data.alignment}</div>
            </div>
            <div class="field">
                <label>Опыт:</label>
                <div>${data.experience}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Характеристики</h2>
        <div class="grid-6">
            <div class="ability">
                <div class="ability-name">Сила</div>
                <div>${data.strength}</div>
                <div class="modifier">${calculateModifier(data.strength) >= 0 ? '+' + calculateModifier(data.strength) : calculateModifier(data.strength)}</div>
            </div>
            <div class="ability">
                <div class="ability-name">Ловкость</div>
                <div>${data.dexterity}</div>
                <div class="modifier">${calculateModifier(data.dexterity) >= 0 ? '+' + calculateModifier(data.dexterity) : calculateModifier(data.dexterity)}</div>
            </div>
            <div class="ability">
                <div class="ability-name">Телосложение</div>
                <div>${data.constitution}</div>
                <div class="modifier">${calculateModifier(data.constitution) >= 0 ? '+' + calculateModifier(data.constitution) : calculateModifier(data.constitution)}</div>
            </div>
            <div class="ability">
                <div class="ability-name">Интеллект</div>
                <div>${data.intelligence}</div>
                <div class="modifier">${calculateModifier(data.intelligence) >= 0 ? '+' + calculateModifier(data.intelligence) : calculateModifier(data.intelligence)}</div>
            </div>
            <div class="ability">
                <div class="ability-name">Мудрость</div>
                <div>${data.wisdom}</div>
                <div class="modifier">${calculateModifier(data.wisdom) >= 0 ? '+' + calculateModifier(data.wisdom) : calculateModifier(data.wisdom)}</div>
            </div>
            <div class="ability">
                <div class="ability-name">Харизма</div>
                <div>${data.charisma}</div>
                <div class="modifier">${calculateModifier(data.charisma) >= 0 ? '+' + calculateModifier(data.charisma) : calculateModifier(data.charisma)}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Бонус мастерства</h2>
        <div class="proficiency-bonus">+${proficiencyBonus}</div>
    </div>

    <div class="section">
        <h2>Спасброски</h2>
        <div class="grid-3">
            <div class="saving-throw">
                <div>Сила</div>
                <div class="modifier">${calculateSkillModifier(data.strength, data.strengthSaveProficient, false, proficiencyBonus) >= 0 ? '+' + calculateSkillModifier(data.strength, data.strengthSaveProficient, false, proficiencyBonus) : calculateSkillModifier(data.strength, data.strengthSaveProficient, false, proficiencyBonus)}</div>
            </div>
            <div class="saving-throw">
                <div>Ловкость</div>
                <div class="modifier">${calculateSkillModifier(data.dexterity, data.dexteritySaveProficient, false, proficiencyBonus) >= 0 ? '+' + calculateSkillModifier(data.dexterity, data.dexteritySaveProficient, false, proficiencyBonus) : calculateSkillModifier(data.dexterity, data.dexteritySaveProficient, false, proficiencyBonus)}</div>
            </div>
            <div class="saving-throw">
                <div>Телосложение</div>
                <div class="modifier">${calculateSkillModifier(data.constitution, data.constitutionSaveProficient, false, proficiencyBonus) >= 0 ? '+' + calculateSkillModifier(data.constitution, data.constitutionSaveProficient, false, proficiencyBonus) : calculateSkillModifier(data.constitution, data.constitutionSaveProficient, false, proficiencyBonus)}</div>
            </div>
            <div class="saving-throw">
                <div>Интеллект</div>
                <div class="modifier">${calculateSkillModifier(data.intelligence, data.intelligenceSaveProficient, false, proficiencyBonus) >= 0 ? '+' + calculateSkillModifier(data.intelligence, data.intelligenceSaveProficient, false, proficiencyBonus) : calculateSkillModifier(data.intelligence, data.intelligenceSaveProficient, false, proficiencyBonus)}</div>
            </div>
            <div class="saving-throw">
                <div>Мудрость</div>
                <div class="modifier">${calculateSkillModifier(data.wisdom, data.wisdomSaveProficient, false, proficiencyBonus) >= 0 ? '+' + calculateSkillModifier(data.wisdom, data.wisdomSaveProficient, false, proficiencyBonus) : calculateSkillModifier(data.wisdom, data.wisdomSaveProficient, false, proficiencyBonus)}</div>
            </div>
            <div class="saving-throw">
                <div>Харизма</div>
                <div class="modifier">${calculateSkillModifier(data.charisma, data.charismaSaveProficient, false, proficiencyBonus) >= 0 ? '+' + calculateSkillModifier(data.charisma, data.charismaSaveProficient, false, proficiencyBonus) : calculateSkillModifier(data.charisma, data.charismaSaveProficient, false, proficiencyBonus)}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Навыки</h2>
        <div class="grid-3">
            ${[
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
            ].map(([name, ability, skill]) => `
                <div class="skill">
                    <div>${name}</div>
                    <div class="modifier">${calculateSkillModifier(data[ability], data[`${skill}Proficient`], data[`${skill}Expert`], proficiencyBonus) >= 0 ? '+' + calculateSkillModifier(data[ability], data[`${skill}Proficient`], data[`${skill}Expert`], proficiencyBonus) : calculateSkillModifier(data[ability], data[`${skill}Proficient`], data[`${skill}Expert`], proficiencyBonus)}</div>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="section">
        <h2>Боевые характеристики</h2>
        <div class="grid-3">
            <div class="field">
                <label>Класс доспеха:</label>
                <div>${data.armorClass}</div>
            </div>
            <div class="field">
                <label>Скорость:</label>
                <div>${data.speed}</div>
            </div>
            <div class="field">
                <label>Максимум хитов:</label>
                <div>${data.maxHp}</div>
            </div>
            <div class="field">
                <label>Текущие хиты:</label>
                <div>${data.currentHp}</div>
            </div>
            <div class="field">
                <label>Временные хиты:</label>
                <div>${data.tempHp}</div>
            </div>
            <div class="field">
                <label>Кости хитов:</label>
                <div>${data.hitDice}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Заклинания</h2>
        <div class="spellcasting-info">
            <div class="field">
                <label>Характеристика заклинаний:</label>
                <div>${data.spellcastingAbility}</div>
            </div>
            <div class="field">
                <label>Сл спасброска от заклинаний:</label>
                <div>${8 + proficiencyBonus + calculateModifier(data[data.spellcastingAbility.toLowerCase()])}</div>
            </div>
            <div class="field">
                <label>Бонус атаки заклинаниями:</label>
                <div>${proficiencyBonus + calculateModifier(data[data.spellcastingAbility.toLowerCase()]) >= 0 ? '+' + (proficiencyBonus + calculateModifier(data[data.spellcastingAbility.toLowerCase()])) : proficiencyBonus + calculateModifier(data[data.spellcastingAbility.toLowerCase()])}</div>
            </div>
        </div>
        <h3>Ячейки заклинаний</h3>
        <div class="grid-9">
            ${Object.entries(data.spellSlots).map(([level, slots]) => `
                <div class="spell-slot">
                    <div>${level}-й</div>
                    <div>${slots}</div>
                </div>
            `).join('')}
        </div>
    </div>
</div>
`;

dv.paragraph(sheet);
```
