# Лист персонажа D&D 5e

```dataviewjs
// Константы для расчетов
const PROFICIENCY_BONUS = Math.floor((dv.current().level - 1) / 4) + 2;

// Функция для расчета модификатора характеристики
function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
}

// Функция для расчета модификатора навыка
function calculateSkillModifier(abilityModifier, isProficient, isExpert) {
    let modifier = abilityModifier;
    if (isProficient) modifier += PROFICIENCY_BONUS;
    if (isExpert) modifier += PROFICIENCY_BONUS;
    return modifier;
}

// Функция для форматирования модификатора
function formatModifier(modifier) {
    return modifier >= 0 ? `+${modifier}` : modifier;
}

// Функция для обновления всех значений
function updateAllValues() {
    // Обновляем бонус мастерства
    const level = parseInt(document.querySelector('input[name="level"]').value) || 1;
    const newProficiencyBonus = Math.floor((level - 1) / 4) + 2;
    document.querySelector('.proficiency-value').textContent = `+${newProficiencyBonus}`;

    // Обновляем модификаторы характеристик
    document.querySelectorAll('.ability-score').forEach(scoreEl => {
        const ability = scoreEl.dataset.ability;
        const value = parseInt(document.querySelector(`input[name="${ability}"]`).value) || 10;
        const modifier = calculateModifier(value);
        scoreEl.querySelector('.modifier').textContent = formatModifier(modifier);
    });

    // Обновляем спасброски
    document.querySelectorAll('.saving-throw').forEach(throwEl => {
        const ability = throwEl.dataset.ability;
        const isProficient = throwEl.querySelector('input[type="checkbox"]').checked;
        const abilityModifier = parseInt(document.querySelector(`.ability-score[data-ability="${ability}"] .modifier`).textContent);
        const totalModifier = isProficient ? abilityModifier + newProficiencyBonus : abilityModifier;
        throwEl.querySelector('.modifier').textContent = formatModifier(totalModifier);
    });

    // Обновляем навыки
    document.querySelectorAll('.skill').forEach(skillEl => {
        const ability = skillEl.dataset.ability;
        const isProficient = skillEl.querySelector('.proficiency').checked;
        const isExpert = skillEl.querySelector('.expertise').checked;
        const abilityModifier = parseInt(document.querySelector(`.ability-score[data-ability="${ability}"] .modifier`).textContent);
        const totalModifier = calculateSkillModifier(abilityModifier, isProficient, isExpert);
        skillEl.querySelector('.modifier').textContent = formatModifier(totalModifier);
    });

    // Обновляем Сл спасброска от заклинаний и бонус атаки
    const spellcastingAbility = document.querySelector('input[name="spellcastingAbility"]').value;
    if (spellcastingAbility) {
        const abilityModifier = parseInt(document.querySelector(`.ability-score[data-ability="${spellcastingAbility}"] .modifier`).textContent);
        const spellSaveDC = 8 + newProficiencyBonus + abilityModifier;
        const spellAttackBonus = newProficiencyBonus + abilityModifier;
        document.querySelector('.spell-save-dc .value').textContent = spellSaveDC;
        document.querySelector('.spell-attack-bonus .value').textContent = formatModifier(spellAttackBonus);
    }
}

// Получаем текущие данные персонажа
const character = dv.current();

// Создаем HTML структуру листа
const sheet = dv.el('div', '', { cls: 'character-sheet' });

// Секция основной информации
const header = dv.el('div', '', { cls: 'header' });
header.appendChild(dv.el('div', '', { cls: 'character-info' }, [
    dv.el('div', '', { cls: 'name' }, [
        dv.el('label', 'Имя персонажа:'),
        dv.el('input', '', { type: 'text', name: 'name', value: character.name || '' })
    ]),
    dv.el('div', '', { cls: 'class-level' }, [
        dv.el('label', 'Класс и уровень:'),
        dv.el('input', '', { type: 'text', name: 'class', value: character.class || '' }),
        dv.el('input', '', { type: 'number', name: 'level', value: character.level || 1, min: 1, max: 20 })
    ]),
    dv.el('div', '', { cls: 'background' }, [
        dv.el('label', 'Предыстория:'),
        dv.el('input', '', { type: 'text', name: 'background', value: character.background || '' })
    ]),
    dv.el('div', '', { cls: 'player-name' }, [
        dv.el('label', 'Имя игрока:'),
        dv.el('input', '', { type: 'text', name: 'playerName', value: character.playerName || '' })
    ]),
    dv.el('div', '', { cls: 'race' }, [
        dv.el('label', 'Раса:'),
        dv.el('input', '', { type: 'text', name: 'race', value: character.race || '' })
    ]),
    dv.el('div', '', { cls: 'alignment' }, [
        dv.el('label', 'Мировоззрение:'),
        dv.el('input', '', { type: 'text', name: 'alignment', value: character.alignment || '' })
    ]),
    dv.el('div', '', { cls: 'experience' }, [
        dv.el('label', 'Очки опыта:'),
        dv.el('input', '', { type: 'number', name: 'experience', value: character.experience || 0 })
    ])
]));
sheet.appendChild(header);

// Секция характеристик
const mainStats = dv.el('div', '', { cls: 'main-stats' });

// Блок характеристик
const abilityScores = dv.el('div', '', { cls: 'ability-scores' });
['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].forEach(ability => {
    const score = character[ability] || 10;
    const modifier = calculateModifier(score);
    abilityScores.appendChild(dv.el('div', '', { cls: 'ability-score', 'data-ability': ability }, [
        dv.el('div', ability.charAt(0).toUpperCase() + ability.slice(1), { cls: 'score-name' }),
        dv.el('input', '', { type: 'number', name: ability, value: score, min: 1, max: 30 }),
        dv.el('div', formatModifier(modifier), { cls: 'modifier' })
    ]));
});
mainStats.appendChild(abilityScores);

// Бонус мастерства
mainStats.appendChild(dv.el('div', '', { cls: 'proficiency-bonus' }, [
    dv.el('div', `+${PROFICIENCY_BONUS}`, { cls: 'proficiency-value' }),
    dv.el('div', 'Бонус мастерства', { cls: 'proficiency-label' })
]));

// Спасброски
const savingThrows = dv.el('div', '', { cls: 'saving-throws' });
savingThrows.appendChild(dv.el('h3', 'Спасброски'));
['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].forEach(ability => {
    const isProficient = character[`${ability}SaveProficient`] || false;
    const modifier = calculateModifier(character[ability] || 10);
    const totalModifier = isProficient ? modifier + PROFICIENCY_BONUS : modifier;
    savingThrows.appendChild(dv.el('div', '', { cls: 'saving-throw', 'data-ability': ability }, [
        dv.el('input', '', { type: 'checkbox', checked: isProficient, name: `${ability}SaveProficient` }),
        dv.el('label', ability.charAt(0).toUpperCase() + ability.slice(1)),
        dv.el('div', formatModifier(totalModifier), { cls: 'modifier' })
    ]));
});
mainStats.appendChild(savingThrows);

// Навыки
const skills = dv.el('div', '', { cls: 'skills' });
skills.appendChild(dv.el('h3', 'Навыки'));

const skillList = [
    { name: 'Акробатика', ability: 'dexterity', key: 'acrobatics' },
    { name: 'Уход за животными', ability: 'wisdom', key: 'animalHandling' },
    { name: 'Магия', ability: 'intelligence', key: 'arcana' },
    { name: 'Атлетика', ability: 'strength', key: 'athletics' },
    { name: 'Обман', ability: 'charisma', key: 'deception' },
    { name: 'История', ability: 'intelligence', key: 'history' },
    { name: 'Проницательность', ability: 'wisdom', key: 'insight' },
    { name: 'Запугивание', ability: 'charisma', key: 'intimidation' },
    { name: 'Расследование', ability: 'intelligence', key: 'investigation' },
    { name: 'Медицина', ability: 'wisdom', key: 'medicine' },
    { name: 'Природа', ability: 'intelligence', key: 'nature' },
    { name: 'Восприятие', ability: 'wisdom', key: 'perception' },
    { name: 'Выступление', ability: 'charisma', key: 'performance' },
    { name: 'Убеждение', ability: 'charisma', key: 'persuasion' },
    { name: 'Религия', ability: 'intelligence', key: 'religion' },
    { name: 'Ловкость рук', ability: 'dexterity', key: 'sleightOfHand' },
    { name: 'Скрытность', ability: 'dexterity', key: 'stealth' },
    { name: 'Выживание', ability: 'wisdom', key: 'survival' }
];

skillList.forEach(skill => {
    const isProficient = character[`${skill.key}Proficient`] || false;
    const isExpert = character[`${skill.key}Expert`] || false;
    const abilityModifier = calculateModifier(character[skill.ability] || 10);
    const totalModifier = calculateSkillModifier(abilityModifier, isProficient, isExpert);

    skills.appendChild(dv.el('div', '', { cls: 'skill', 'data-ability': skill.ability }, [
        dv.el('input', '', { type: 'checkbox', class: 'proficiency', checked: isProficient, name: `${skill.key}Proficient` }),
        dv.el('input', '', { type: 'checkbox', class: 'expertise', checked: isExpert, name: `${skill.key}Expert` }),
        dv.el('label', `${skill.name} (${skill.ability.charAt(0).toUpperCase()})`),
        dv.el('div', formatModifier(totalModifier), { cls: 'modifier' })
    ]));
});
mainStats.appendChild(skills);

sheet.appendChild(mainStats);

// Секция боевых характеристик
const combatStats = dv.el('div', '', { cls: 'combat-stats' });

// Класс доспеха
combatStats.appendChild(dv.el('div', '', { cls: 'armor-class' }, [
    dv.el('h3', 'Класс доспеха'),
    dv.el('input', '', { type: 'number', name: 'armorClass', value: character.armorClass || 10, min: 0 })
]));

// Инициатива
combatStats.appendChild(dv.el('div', '', { cls: 'initiative' }, [
    dv.el('h3', 'Инициатива'),
    dv.el('div', formatModifier(calculateModifier(character.dexterity || 10)), { cls: 'value' })
]));

// Скорость
combatStats.appendChild(dv.el('div', '', { cls: 'speed' }, [
    dv.el('h3', 'Скорость'),
    dv.el('input', '', { type: 'number', name: 'speed', value: character.speed || 30, min: 0 })
]));

// Хиты
const hitPoints = dv.el('div', '', { cls: 'hit-points' });
hitPoints.appendChild(dv.el('h3', 'Хиты'));
hitPoints.appendChild(dv.el('div', '', { cls: 'max-hp' }, [
    dv.el('label', 'Максимум'),
    dv.el('input', '', { type: 'number', name: 'maxHp', value: character.maxHp || 0, min: 0 })
]));
hitPoints.appendChild(dv.el('div', '', { cls: 'current-hp' }, [
    dv.el('label', 'Текущие'),
    dv.el('input', '', { type: 'number', name: 'currentHp', value: character.currentHp || 0, min: 0 })
]));
hitPoints.appendChild(dv.el('div', '', { cls: 'temp-hp' }, [
    dv.el('label', 'Временные'),
    dv.el('input', '', { type: 'number', name: 'tempHp', value: character.tempHp || 0, min: 0 })
]));
combatStats.appendChild(hitPoints);

// Кости хитов
combatStats.appendChild(dv.el('div', '', { cls: 'hit-dice' }, [
    dv.el('h3', 'Кости хитов'),
    dv.el('input', '', { type: 'text', name: 'hitDice', value: character.hitDice || '1d8' })
]));

// Спасброски от смерти
const deathSaves = dv.el('div', '', { cls: 'death-saves' });
deathSaves.appendChild(dv.el('h3', 'Спасброски от смерти'));

const successes = dv.el('div', '', { cls: 'successes' });
successes.appendChild(dv.el('label', 'Успехи'));
const successBoxes = dv.el('div', '', { cls: 'boxes' });
for (let i = 0; i < 3; i++) {
    successBoxes.appendChild(dv.el('input', '', { type: 'checkbox', name: `deathSaveSuccess${i}`, checked: character[`deathSaveSuccess${i}`] || false }));
}
successes.appendChild(successBoxes);
deathSaves.appendChild(successes);

const failures = dv.el('div', '', { cls: 'failures' });
failures.appendChild(dv.el('label', 'Провалы'));
const failureBoxes = dv.el('div', '', { cls: 'boxes' });
for (let i = 0; i < 3; i++) {
    failureBoxes.appendChild(dv.el('input', '', { type: 'checkbox', name: `deathSaveFailure${i}`, checked: character[`deathSaveFailure${i}`] || false }));
}
failures.appendChild(failureBoxes);
deathSaves.appendChild(failures);

combatStats.appendChild(deathSaves);
sheet.appendChild(combatStats);

// Секция атак и заклинаний
const attacks = dv.el('div', '', { cls: 'attacks' });
attacks.appendChild(dv.el('h3', 'Атаки и заклинания'));

const attackTable = dv.el('table', '');
const thead = dv.el('thead', '');
thead.appendChild(dv.el('tr', '', {}, [
    dv.el('th', 'Название'),
    dv.el('th', 'Бонус атаки'),
    dv.el('th', 'Урон/Тип')
]));
attackTable.appendChild(thead);

const tbody = dv.el('tbody', '');
for (let i = 0; i < 3; i++) {
    tbody.appendChild(dv.el('tr', '', {}, [
        dv.el('td', '', {}, [dv.el('input', '', { type: 'text', name: `attack${i}Name`, value: character[`attack${i}Name`] || '' })]),
        dv.el('td', '', {}, [dv.el('input', '', { type: 'text', name: `attack${i}Bonus`, value: character[`attack${i}Bonus`] || '+0' })]),
        dv.el('td', '', {}, [dv.el('input', '', { type: 'text', name: `attack${i}Damage`, value: character[`attack${i}Damage`] || '1d6+0' })])
    ]));
}
attackTable.appendChild(tbody);
attacks.appendChild(attackTable);
sheet.appendChild(attacks);

// Секция снаряжения
const equipment = dv.el('div', '', { cls: 'equipment' });
equipment.appendChild(dv.el('h3', 'Снаряжение'));
equipment.appendChild(dv.el('textarea', '', { name: 'equipment' }, character.equipment || ''));
sheet.appendChild(equipment);

// Секция особенностей и черт
const features = dv.el('div', '', { cls: 'features' });
features.appendChild(dv.el('h3', 'Особенности и черты'));
features.appendChild(dv.el('textarea', '', { name: 'features' }, character.features || ''));
sheet.appendChild(features);

// Секция заклинаний
const spells = dv.el('div', '', { cls: 'spells' });
spells.appendChild(dv.el('h3', 'Заклинания'));

// Характеристика заклинаний
spells.appendChild(dv.el('div', '', { cls: 'spellcasting-ability' }, [
    dv.el('label', 'Характеристика заклинаний:'),
    dv.el('input', '', { type: 'text', name: 'spellcastingAbility', value: character.spellcastingAbility || '' })
]));

// Сл спасброска от заклинаний
const spellSaveDC = 8 + PROFICIENCY_BONUS + calculateModifier(character[character.spellcastingAbility] || 10);
spells.appendChild(dv.el('div', '', { cls: 'spell-save-dc' }, [
    dv.el('label', 'Сл спасброска от заклинаний:'),
    dv.el('div', spellSaveDC.toString(), { cls: 'value' })
]));

// Бонус атаки заклинаниями
const spellAttackBonus = PROFICIENCY_BONUS + calculateModifier(character[character.spellcastingAbility] || 10);
spells.appendChild(dv.el('div', '', { cls: 'spell-attack-bonus' }, [
    dv.el('label', 'Бонус атаки заклинаниями:'),
    dv.el('div', formatModifier(spellAttackBonus), { cls: 'value' })
]));

// Ячейки заклинаний
const spellSlots = dv.el('div', '', { cls: 'spell-slots' });
spellSlots.appendChild(dv.el('h4', 'Ячейки заклинаний'));

const slotLevels = dv.el('div', '', { cls: 'slot-levels' });
for (let i = 1; i <= 9; i++) {
    slotLevels.appendChild(dv.el('div', '', { cls: 'slot-level' }, [
        dv.el('label', `${i}-й`),
        dv.el('input', '', { type: 'number', name: `spellSlot${i}`, value: character[`spellSlot${i}`] || 0, min: 0, max: i === 1 ? 4 : i <= 5 ? 3 : i <= 7 ? 2 : 1 })
    ]));
}
spellSlots.appendChild(slotLevels);
spells.appendChild(spellSlots);

// Известные заклинания
spells.appendChild(dv.el('div', '', { cls: 'spells-known' }, [
    dv.el('h4', 'Известные заклинания'),
    dv.el('textarea', '', { name: 'spellsKnown' }, character.spellsKnown || '')
]));

sheet.appendChild(spells);

// Добавляем лист на страницу
dv.container.appendChild(sheet);

// Добавляем обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    // Обработчики для всех числовых полей
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', updateAllValues);
    });

    // Обработчики для всех чекбоксов
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateAllValues);
    });

    // Обработчик для характеристики заклинаний
    document.querySelector('input[name="spellcastingAbility"]').addEventListener('change', updateAllValues);
});
```

## Метаданные персонажа

```yaml
name: "Артис"
class: "Воин"
level: 10
background: ""
playerName: "Артем"
race: ""
alignment: ""
experience: 0

# Характеристики
strength: 10
dexterity: 10
constitution: 10
intelligence: 10
wisdom: 10
charisma: 10

# Спасброски
strengthSaveProficient: true
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
maxHp: 0
currentHp: 0
tempHp: 0
hitDice: "1d8"

# Спасброски от смерти
deathSaveSuccess0: false
deathSaveSuccess1: false
deathSaveSuccess2: false
deathSaveFailure0: false
deathSaveFailure1: false
deathSaveFailure2: false

# Атаки
attack0Name: ""
attack0Bonus: "+0"
attack0Damage: "1d6+0"
attack1Name: ""
attack1Bonus: "+0"
attack1Damage: "1d6+0"
attack2Name: ""
attack2Bonus: "+0"
attack2Damage: "1d6+0"

# Снаряжение и особенности
equipment: ""
features: ""

# Заклинания
spellcastingAbility: ""
spellSlot1: 0
spellSlot2: 0
spellSlot3: 0
spellSlot4: 0
spellSlot5: 0
spellSlot6: 0
spellSlot7: 0
spellSlot8: 0
spellSlot9: 0
spellsKnown: ""
</rewritten_file>
```
