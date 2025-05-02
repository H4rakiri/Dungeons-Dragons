# Лист персонажа D&D 5e

```dataviewjs
<div class="character-sheet">
    <div class="header">
        <div class="character-info">
            <div class="name">
                <label>Имя персонажа:</label>
                <input type="text" placeholder="Введите имя персонажа">
            </div>
            <div class="class-level">
                <label>Класс и уровень:</label>
                <input type="text" placeholder="Класс">
                <input type="number" placeholder="Уровень" id="character-level" min="1" max="20" value="1">
            </div>
            <div class="background">
                <label>Предыстория:</label>
                <input type="text" placeholder="Предыстория">
            </div>
            <div class="player-name">
                <label>Имя игрока:</label>
                <input type="text" placeholder="Имя игрока">
            </div>
            <div class="race">
                <label>Раса:</label>
                <input type="text" placeholder="Раса">
            </div>
            <div class="alignment">
                <label>Мировоззрение:</label>
                <input type="text" placeholder="Мировоззрение">
            </div>
            <div class="experience">
                <label>Очки опыта:</label>
                <input type="number" placeholder="XP" id="experience-points">
            </div>
        </div>
    </div>
    <div class="main-stats">
        <div class="ability-scores">
            <div class="ability-score">
                <div class="score-name">Сила</div>
                <input type="number" class="score-value" placeholder="10" min="1" max="30" value="10" data-ability="strength">
                <div class="modifier" data-ability="strength">+0</div>
            </div>
            <div class="ability-score">
                <div class="score-name">Ловкость</div>
                <input type="number" class="score-value" placeholder="10" min="1" max="30" value="10" data-ability="dexterity">
                <div class="modifier" data-ability="dexterity">+0</div>
            </div>
            <div class="ability-score">
                <div class="score-name">Телосложение</div>
                <input type="number" class="score-value" placeholder="10" min="1" max="30" value="10" data-ability="constitution">
                <div class="modifier" data-ability="constitution">+0</div>
            </div>
            <div class="ability-score">
                <div class="score-name">Интеллект</div>
                <input type="number" class="score-value" placeholder="10" min="1" max="30" value="10" data-ability="intelligence">
                <div class="modifier" data-ability="intelligence">+0</div>
            </div>
            <div class="ability-score">
                <div class="score-name">Мудрость</div>
                <input type="number" class="score-value" placeholder="10" min="1" max="30" value="10" data-ability="wisdom">
                <div class="modifier" data-ability="wisdom">+0</div>
            </div>
            <div class="ability-score">
                <div class="score-name">Харизма</div>
                <input type="number" class="score-value" placeholder="10" min="1" max="30" value="10" data-ability="charisma">
                <div class="modifier" data-ability="charisma">+0</div>
            </div>
        </div>
        <div class="proficiency-bonus">
            <div class="proficiency-value" id="proficiency-bonus">+2</div>
            <div class="proficiency-label">Бонус мастерства</div>
        </div>
        <div class="saving-throws">
            <h3>Спасброски</h3>
            <div class="saving-throw">
                <input type="checkbox" class="proficiency" data-ability="strength">
                <label>Сила</label>
                <div class="modifier" data-ability="strength">+0</div>
            </div>
            <div class="saving-throw">
                <input type="checkbox" class="proficiency" data-ability="dexterity">
                <label>Ловкость</label>
                <div class="modifier" data-ability="dexterity">+0</div>
            </div>
            <div class="saving-throw">
                <input type="checkbox" class="proficiency" data-ability="constitution">
                <label>Телосложение</label>
                <div class="modifier" data-ability="constitution">+0</div>
            </div>
            <div class="saving-throw">
                <input type="checkbox" class="proficiency" data-ability="intelligence">
                <label>Интеллект</label>
                <div class="modifier" data-ability="intelligence">+0</div>
            </div>
            <div class="saving-throw">
                <input type="checkbox" class="proficiency" data-ability="wisdom">
                <label>Мудрость</label>
                <div class="modifier" data-ability="wisdom">+0</div>
            </div>
            <div class="saving-throw">
                <input type="checkbox" class="proficiency" data-ability="charisma">
                <label>Харизма</label>
                <div class="modifier" data-ability="charisma">+0</div>
            </div>
        </div>
        <div class="skills">
            <h3>Навыки</h3>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="acrobatics">
                <input type="checkbox" class="expertise" data-skill="acrobatics">
                <label>Акробатика (Лов)</label>
                <div class="modifier" data-skill="acrobatics">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="animal-handling">
                <input type="checkbox" class="expertise" data-skill="animal-handling">
                <label>Уход за животными (Муд)</label>
                <div class="modifier" data-skill="animal-handling">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="arcana">
                <input type="checkbox" class="expertise" data-skill="arcana">
                <label>Магия (Инт)</label>
                <div class="modifier" data-skill="arcana">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="athletics">
                <input type="checkbox" class="expertise" data-skill="athletics">
                <label>Атлетика (Сил)</label>
                <div class="modifier" data-skill="athletics">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="deception">
                <input type="checkbox" class="expertise" data-skill="deception">
                <label>Обман (Хар)</label>
                <div class="modifier" data-skill="deception">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="history">
                <input type="checkbox" class="expertise" data-skill="history">
                <label>История (Инт)</label>
                <div class="modifier" data-skill="history">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="insight">
                <input type="checkbox" class="expertise" data-skill="insight">
                <label>Проницательность (Муд)</label>
                <div class="modifier" data-skill="insight">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="intimidation">
                <input type="checkbox" class="expertise" data-skill="intimidation">
                <label>Запугивание (Хар)</label>
                <div class="modifier" data-skill="intimidation">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="investigation">
                <input type="checkbox" class="expertise" data-skill="investigation">
                <label>Расследование (Инт)</label>
                <div class="modifier" data-skill="investigation">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="medicine">
                <input type="checkbox" class="expertise" data-skill="medicine">
                <label>Медицина (Муд)</label>
                <div class="modifier" data-skill="medicine">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="nature">
                <input type="checkbox" class="expertise" data-skill="nature">
                <label>Природа (Инт)</label>
                <div class="modifier" data-skill="nature">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="perception">
                <input type="checkbox" class="expertise" data-skill="perception">
                <label>Восприятие (Муд)</label>
                <div class="modifier" data-skill="perception">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="performance">
                <input type="checkbox" class="expertise" data-skill="performance">
                <label>Выступление (Хар)</label>
                <div class="modifier" data-skill="performance">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="persuasion">
                <input type="checkbox" class="expertise" data-skill="persuasion">
                <label>Убеждение (Хар)</label>
                <div class="modifier" data-skill="persuasion">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="religion">
                <input type="checkbox" class="expertise" data-skill="religion">
                <label>Религия (Инт)</label>
                <div class="modifier" data-skill="religion">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="sleight-of-hand">
                <input type="checkbox" class="expertise" data-skill="sleight-of-hand">
                <label>Ловкость рук (Лов)</label>
                <div class="modifier" data-skill="sleight-of-hand">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="stealth">
                <input type="checkbox" class="expertise" data-skill="stealth">
                <label>Скрытность (Лов)</label>
                <div class="modifier" data-skill="stealth">+0</div>
            </div>
            <div class="skill">
                <input type="checkbox" class="proficiency" data-skill="survival">
                <input type="checkbox" class="expertise" data-skill="survival">
                <label>Выживание (Муд)</label>
                <div class="modifier" data-skill="survival">+0</div>
            </div>
        </div>
    </div>
    <div class="combat-stats">
        <div class="armor-class">
            <h3>Класс доспеха</h3>
            <div class="value" id="armor-class">10</div>
        </div>
        <div class="initiative">
            <h3>Инициатива</h3>
            <div class="value" id="initiative">+0</div>
        </div>
        <div class="speed">
            <h3>Скорость</h3>
            <div class="value" id="speed">30</div>
        </div>
        <div class="hit-points">
            <h3>Хиты</h3>
            <div class="max-hp">
                <label>Максимум</label>
                <input type="number" placeholder="HP" id="max-hp">
            </div>
            <div class="current-hp">
                <label>Текущие</label>
                <input type="number" placeholder="HP" id="current-hp">
            </div>
            <div class="temp-hp">
                <label>Временные</label>
                <input type="number" placeholder="HP" id="temp-hp">
            </div>
        </div>
        <div class="hit-dice">
            <h3>Кости хитов</h3>
            <div class="value" id="hit-dice">1d8</div>
        </div>
        <div class="death-saves">
            <h3>Спасброски от смерти</h3>
            <div class="successes">
                <label>Успехи</label>
                <div class="boxes">
                    <input type="checkbox" class="death-save">
                    <input type="checkbox" class="death-save">
                    <input type="checkbox" class="death-save">
                </div>
            </div>
            <div class="failures">
                <label>Провалы</label>
                <div class="boxes">
                    <input type="checkbox" class="death-save">
                    <input type="checkbox" class="death-save">
                    <input type="checkbox" class="death-save">
                </div>
            </div>
        </div>
    </div>
    <div class="attacks">
        <h3>Атаки и заклинания</h3>
        <table>
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Бонус атаки</th>
                    <th>Урон/Тип</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" placeholder="Название оружия"></td>
                    <td><input type="text" placeholder="+0"></td>
                    <td><input type="text" placeholder="1d6+0"></td>
                </tr>
                <tr>
                    <td><input type="text" placeholder="Название оружия"></td>
                    <td><input type="text" placeholder="+0"></td>
                    <td><input type="text" placeholder="1d6+0"></td>
                </tr>
                <tr>
                    <td><input type="text" placeholder="Название оружия"></td>
                    <td><input type="text" placeholder="+0"></td>
                    <td><input type="text" placeholder="1d6+0"></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="equipment">
        <h3>Снаряжение</h3>
        <textarea placeholder="Перечислите ваше снаряжение здесь..."></textarea>
    </div>
    <div class="features">
        <h3>Особенности и черты</h3>
        <textarea placeholder="Перечислите ваши особенности и черты здесь..."></textarea>
    </div>
    <div class="spells">
        <h3>Заклинания</h3>
        <div class="spellcasting-ability">
            <label>Характеристика заклинаний:</label>
            <input type="text" placeholder="Характеристика" id="spellcasting-ability">
        </div>
        <div class="spell-save-dc">
            <label>Сл спасброска от заклинаний:</label>
            <div class="value" id="spell-save-dc">8</div>
        </div>
        <div class="spell-attack-bonus">
            <label>Бонус атаки заклинаниями:</label>
            <div class="value" id="spell-attack-bonus">+0</div>
        </div>
        <div class="spell-slots">
            <h4>Ячейки заклинаний</h4>
            <div class="slot-levels">
                <div class="slot-level">
                    <label>1-й</label>
                    <input type="number" placeholder="0" min="0" max="4">
                </div>
                <div class="slot-level">
                    <label>2-й</label>
                    <input type="number" placeholder="0" min="0" max="3">
                </div>
                <div class="slot-level">
                    <label>3-й</label>
                    <input type="number" placeholder="0" min="0" max="3">
                </div>
                <div class="slot-level">
                    <label>4-й</label>
                    <input type="number" placeholder="0" min="0" max="3">
                </div>
                <div class="slot-level">
                    <label>5-й</label>
                    <input type="number" placeholder="0" min="0" max="2">
                </div>
                <div class="slot-level">
                    <label>6-й</label>
                    <input type="number" placeholder="0" min="0" max="2">
                </div>
                <div class="slot-level">
                    <label>7-й</label>
                    <input type="number" placeholder="0" min="0" max="1">
                </div>
                <div class="slot-level">
                    <label>8-й</label>
                    <input type="number" placeholder="0" min="0" max="1">
                </div>
                <div class="slot-level">
                    <label>9-й</label>
                    <input type="number" placeholder="0" min="0" max="1">
                </div>
            </div>
        </div>
        <div class="spells-known">
            <h4>Известные заклинания</h4>
            <textarea placeholder="Перечислите известные заклинания здесь..."></textarea>
        </div>
    </div>

</div>

<script>
// Функция для расчета модификатора характеристики
function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
}
// Функция для расчета бонуса мастерства
function calculateProficiencyBonus(level) {
    return Math.floor((level - 1) / 4) + 2;
}
// Функция для обновления модификаторов характеристик
function updateAbilityModifiers() {
    document.querySelectorAll('.score-value').forEach(input => {
        const ability = input.dataset.ability;
        const score = parseInt(input.value) || 0;
        const modifier = calculateModifier(score);
        const modifierElement = document.querySelector(`.modifier[data-ability="${ability}"]`);
        modifierElement.textContent = modifier >= 0 ? `+${modifier}` : modifier;
    });
}
// Функция для обновления бонуса мастерства
function updateProficiencyBonus() {
    const level = parseInt(document.getElementById('character-level').value) || 1;
    const bonus = calculateProficiencyBonus(level);
    document.getElementById('proficiency-bonus').textContent = `+${bonus}`;
}
// Функция для обновления модификаторов навыков
function updateSkillModifiers() {
    const proficiencyBonus = parseInt(document.getElementById('proficiency-bonus').textContent);
    
    document.querySelectorAll('.skill').forEach(skill => {
        const skillName = skill.querySelector('label').textContent;
        const abilityMatch = skillName.match(/\(([А-Яа-я]+)\)/);
        if (abilityMatch) {
            const ability = abilityMatch[1];
            const abilityModifier = parseInt(document.querySelector(`.modifier[data-ability="${ability.toLowerCase()}"]`).textContent);
            const isProficient = skill.querySelector('.proficiency').checked;
            const isExpert = skill.querySelector('.expertise').checked;
            
            let totalModifier = abilityModifier;
            if (isProficient) totalModifier += proficiencyBonus;
            if (isExpert) totalModifier += proficiencyBonus;
            
            skill.querySelector('.modifier').textContent = totalModifier >= 0 ? `+${totalModifier}` : totalModifier;
        }
    });
}
// Функция для обновления спасбросков
function updateSavingThrows() {
    const proficiencyBonus = parseInt(document.getElementById('proficiency-bonus').textContent);
    
    document.querySelectorAll('.saving-throw').forEach(throwEl => {
        const ability = throwEl.querySelector('label').textContent.toLowerCase();
        const abilityModifier = parseInt(document.querySelector(`.modifier[data-ability="${ability}"]`).textContent);
        const isProficient = throwEl.querySelector('.proficiency').checked;
        
        let totalModifier = abilityModifier;
        if (isProficient) totalModifier += proficiencyBonus;
        
        throwEl.querySelector('.modifier').textContent = totalModifier >= 0 ? `+${totalModifier}` : totalModifier;
    });
}
// Функция для обновления Сл спасброска от заклинаний
function updateSpellSaveDC() {
    const proficiencyBonus = parseInt(document.getElementById('proficiency-bonus').textContent);
    const spellcastingAbility = document.getElementById('spellcasting-ability').value.toLowerCase();
    const abilityModifier = parseInt(document.querySelector(`.modifier[data-ability="${spellcastingAbility}"]`).textContent);
    
    const spellSaveDC = 8 + proficiencyBonus + abilityModifier;
    document.getElementById('spell-save-dc').textContent = spellSaveDC;
}
// Функция для обновления бонуса атаки заклинаниями
function updateSpellAttackBonus() {
    const proficiencyBonus = parseInt(document.getElementById('proficiency-bonus').textContent);
    const spellcastingAbility = document.getElementById('spellcasting-ability').value.toLowerCase();
    const abilityModifier = parseInt(document.querySelector(`.modifier[data-ability="${spellcastingAbility}"]`).textContent);
    
    const spellAttackBonus = proficiencyBonus + abilityModifier;
    document.getElementById('spell-attack-bonus').textContent = spellAttackBonus >= 0 ? `+${spellAttackBonus}` : spellAttackBonus;
}
// Добавляем обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    // Обновляем все значения при загрузке страницы
    updateProficiencyBonus();
    updateAbilityModifiers();
    updateSkillModifiers();
    updateSavingThrows();
    
    // Обработчики для обновления значений при изменении
    document.getElementById('character-level').addEventListener('change', () => {
        updateProficiencyBonus();
        updateSkillModifiers();
        updateSavingThrows();
        updateSpellSaveDC();
        updateSpellAttackBonus();
    });
    
    document.querySelectorAll('.score-value').forEach(input => {
        input.addEventListener('change', () => {
            updateAbilityModifiers();
            updateSkillModifiers();
            updateSavingThrows();
            updateSpellSaveDC();
            updateSpellAttackBonus();
        });
    });
    
    document.querySelectorAll('.proficiency').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateSkillModifiers();
            updateSavingThrows();
        });
    });
    
    document.querySelectorAll('.expertise').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateSkillModifiers();
        });
    });
    
    document.getElementById('spellcasting-ability').addEventListener('change', () => {
        updateSpellSaveDC();
        updateSpellAttackBonus();
    });
});
</script>
```
