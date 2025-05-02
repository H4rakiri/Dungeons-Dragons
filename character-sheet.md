---
cssclasses:
  - character-sheet
---

# Лист персонажа D&D 5e

<div class="character-sheet">
  <div class="section header">
    <h2>Основная информация</h2>
    <div class="grid-2">
      <div class="field">
        <label>Имя персонажа:</label>
        <input type="text" name="name" />
      </div>
      <div class="field">
        <label>Класс и уровень:</label>
        <input type="text" name="class" />
        <input type="number" name="level" min="1" max="20" />
      </div>
      <div class="field">
        <label>Предыстория:</label>
        <input type="text" name="background" />
      </div>
      <div class="field">
        <label>Имя игрока:</label>
        <input type="text" name="playerName" />
      </div>
      <div class="field">
        <label>Раса:</label>
        <input type="text" name="race" />
      </div>
      <div class="field">
        <label>Мировоззрение:</label>
        <input type="text" name="alignment" />
      </div>
      <div class="field">
        <label>Очки опыта:</label>
        <input type="number" name="experience" />
      </div>
    </div>
  </div>
  <div class="section abilities">
    <h2>Характеристики</h2>
    <div class="grid-6">
      <div class="ability">
        <div class="ability-name">Сила</div>
        <input type="number" name="strength" min="1" max="30" />
        <div class="modifier">+0</div>
      </div>
      <div class="ability">
        <div class="ability-name">Ловкость</div>
        <input type="number" name="dexterity" min="1" max="30" />
        <div class="modifier">+0</div>
      </div>
      <div class="ability">
        <div class="ability-name">Телосложение</div>
        <input type="number" name="constitution" min="1" max="30" />
        <div class="modifier">+0</div>
      </div>
      <div class="ability">
        <div class="ability-name">Интеллект</div>
        <input type="number" name="intelligence" min="1" max="30" />
        <div class="modifier">+0</div>
      </div>
      <div class="ability">
        <div class="ability-name">Мудрость</div>
        <input type="number" name="wisdom" min="1" max="30" />
        <div class="modifier">+0</div>
      </div>
      <div class="ability">
        <div class="ability-name">Харизма</div>
        <input type="number" name="charisma" min="1" max="30" />
        <div class="modifier">+0</div>
      </div>
    </div>
  </div>
  <div class="section proficiency">
    <h2>Бонус мастерства</h2>
    <div class="proficiency-bonus">+2</div>
  </div>
  <div class="section saving-throws">
    <h2>Спасброски</h2>
    <div class="grid-3">
      <div class="saving-throw">
        <input type="checkbox" name="strengthSaveProficient" />
        <label>Сила</label>
        <div class="modifier">+0</div>
      </div>
      <div class="saving-throw">
        <input type="checkbox" name="dexteritySaveProficient" />
        <label>Ловкость</label>
        <div class="modifier">+0</div>
      </div>
      <div class="saving-throw">
        <input type="checkbox" name="constitutionSaveProficient" />
        <label>Телосложение</label>
        <div class="modifier">+0</div>
      </div>
      <div class="saving-throw">
        <input type="checkbox" name="intelligenceSaveProficient" />
        <label>Интеллект</label>
        <div class="modifier">+0</div>
      </div>
      <div class="saving-throw">
        <input type="checkbox" name="wisdomSaveProficient" />
        <label>Мудрость</label>
        <div class="modifier">+0</div>
      </div>
      <div class="saving-throw">
        <input type="checkbox" name="charismaSaveProficient" />
        <label>Харизма</label>
        <div class="modifier">+0</div>
      </div>
    </div>
  </div>
  <div class="section skills">
    <h2>Навыки</h2>
    <div class="grid-3">
      <div class="skill">
        <input type="checkbox" name="acrobaticsProficient" />
        <input type="checkbox" name="acrobaticsExpert" />
        <label>Акробатика (Лов)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="animalHandlingProficient" />
        <input type="checkbox" name="animalHandlingExpert" />
        <label>Уход за животными (Муд)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="arcanaProficient" />
        <input type="checkbox" name="arcanaExpert" />
        <label>Магия (Инт)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="athleticsProficient" />
        <input type="checkbox" name="athleticsExpert" />
        <label>Атлетика (Сил)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="deceptionProficient" />
        <input type="checkbox" name="deceptionExpert" />
        <label>Обман (Хар)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="historyProficient" />
        <input type="checkbox" name="historyExpert" />
        <label>История (Инт)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="insightProficient" />
        <input type="checkbox" name="insightExpert" />
        <label>Проницательность (Муд)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="intimidationProficient" />
        <input type="checkbox" name="intimidationExpert" />
        <label>Запугивание (Хар)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="investigationProficient" />
        <input type="checkbox" name="investigationExpert" />
        <label>Расследование (Инт)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="medicineProficient" />
        <input type="checkbox" name="medicineExpert" />
        <label>Медицина (Муд)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="natureProficient" />
        <input type="checkbox" name="natureExpert" />
        <label>Природа (Инт)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="perceptionProficient" />
        <input type="checkbox" name="perceptionExpert" />
        <label>Восприятие (Муд)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="performanceProficient" />
        <input type="checkbox" name="performanceExpert" />
        <label>Выступление (Хар)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="persuasionProficient" />
        <input type="checkbox" name="persuasionExpert" />
        <label>Убеждение (Хар)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="religionProficient" />
        <input type="checkbox" name="religionExpert" />
        <label>Религия (Инт)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="sleightOfHandProficient" />
        <input type="checkbox" name="sleightOfHandExpert" />
        <label>Ловкость рук (Лов)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="stealthProficient" />
        <input type="checkbox" name="stealthExpert" />
        <label>Скрытность (Лов)</label>
        <div class="modifier">+0</div>
      </div>
      <div class="skill">
        <input type="checkbox" name="survivalProficient" />
        <input type="checkbox" name="survivalExpert" />
        <label>Выживание (Муд)</label>
        <div class="modifier">+0</div>
      </div>
    </div>
  </div>

  <!-- Боевые характеристики -->
  <div class="section combat-stats">
    <h2>Боевые характеристики</h2>
    <div class="grid-3">
      <div class="combat-stat">
        <label>Класс доспеха:</label>
        <input type="number" name="armorClass" min="0" />
      </div>
      <div class="combat-stat">
        <label>Инициатива:</label>
        <div class="modifier">+0</div>
      </div>
      <div class="combat-stat">
        <label>Скорость:</label>
        <input type="number" name="speed" min="0" />
      </div>
    </div>
    <div class="hit-points">
      <h3>Хиты</h3>
      <div class="grid-3">
        <div class="hp-stat">
          <label>Максимум:</label>
          <input type="number" name="maxHp" min="0" />
        </div>
        <div class="hp-stat">
          <label>Текущие:</label>
          <input type="number" name="currentHp" min="0" />
        </div>
        <div class="hp-stat">
          <label>Временные:</label>
          <input type="number" name="tempHp" min="0" />
        </div>
      </div>
    </div>
    <div class="hit-dice">
      <label>Кости хитов:</label>
      <input type="text" name="hitDice" />
    </div>
    <div class="death-saves">
      <h3>Спасброски от смерти</h3>
      <div class="grid-2">
        <div class="death-save">
          <label>Успехи:</label>
          <div class="boxes">
            <input type="checkbox" name="deathSaveSuccess0" />
            <input type="checkbox" name="deathSaveSuccess1" />
            <input type="checkbox" name="deathSaveSuccess2" />
          </div>
        </div>
        <div class="death-save">
          <label>Провалы:</label>
          <div class="boxes">
            <input type="checkbox" name="deathSaveFailure0" />
            <input type="checkbox" name="deathSaveFailure1" />
            <input type="checkbox" name="deathSaveFailure2" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section attacks">
    <h2>Атаки и заклинания</h2>
    <table class="attacks-table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Бонус атаки</th>
          <th>Урон/Тип</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="text" name="attack0Name" /></td>
          <td><input type="text" name="attack0Bonus" /></td>
          <td><input type="text" name="attack0Damage" /></td>
          <td><button class="delete-row">×</button></td>
        </tr>
      </tbody>
    </table>
    <button class="add-row" data-table="attacks-table">+ Добавить атаку</button>
  </div>
  <div class="section equipment">
    <h2>Снаряжение</h2>
    <table class="equipment-table">
      <thead>
        <tr>
          <th>Предмет</th>
          <th>Количество</th>
          <th>Вес</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="text" name="equipment0Name" /></td>
          <td><input type="number" name="equipment0Quantity" min="1" /></td>
          <td>
            <input type="number" name="equipment0Weight" min="0" step="0.1" />
          </td>
          <td><button class="delete-row">×</button></td>
        </tr>
      </tbody>
    </table>
    <button class="add-row" data-table="equipment-table">
      + Добавить предмет
    </button>
  </div>
  <div class="section features">
    <h2>Особенности и черты</h2>
    <table class="features-table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Описание</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="text" name="feature0Name" /></td>
          <td><textarea name="feature0Description"></textarea></td>
          <td><button class="delete-row">×</button></td>
        </tr>
      </tbody>
    </table>
    <button class="add-row" data-table="features-table">
      + Добавить особенность
    </button>
  </div>
  <div class="section spells">
    <h2>Заклинания</h2>
    <div class="spellcasting-info">
      <div class="spellcasting-stat">
        <label>Характеристика заклинаний:</label>
        <input type="text" name="spellcastingAbility" />
      </div>
      <div class="spellcasting-stat">
        <label>Сл спасброска от заклинаний:</label>
        <div class="value">8</div>
      </div>
      <div class="spellcasting-stat">
        <label>Бонус атаки заклинаниями:</label>
        <div class="value">+0</div>
      </div>
    </div>
    <div class="spell-slots">
      <h3>Ячейки заклинаний</h3>
      <div class="grid-9">
        <div class="spell-slot">
          <label>1-й</label>
          <input type="number" name="spellSlot1" min="0" max="4" />
        </div>
        <div class="spell-slot">
          <label>2-й</label>
          <input type="number" name="spellSlot2" min="0" max="3" />
        </div>
        <div class="spell-slot">
          <label>3-й</label>
          <input type="number" name="spellSlot3" min="0" max="3" />
        </div>
        <div class="spell-slot">
          <label>4-й</label>
          <input type="number" name="spellSlot4" min="0" max="3" />
        </div>
        <div class="spell-slot">
          <label>5-й</label>
          <input type="number" name="spellSlot5" min="0" max="3" />
        </div>
        <div class="spell-slot">
          <label>6-й</label>
          <input type="number" name="spellSlot6" min="0" max="2" />
        </div>
        <div class="spell-slot">
          <label>7-й</label>
          <input type="number" name="spellSlot7" min="0" max="2" />
        </div>
        <div class="spell-slot">
          <label>8-й</label>
          <input type="number" name="spellSlot8" min="0" max="1" />
        </div>
        <div class="spell-slot">
          <label>9-й</label>
          <input type="number" name="spellSlot9" min="0" max="1" />
        </div>
      </div>
    </div>
    <div class="spells-known">
      <h3>Известные заклинания</h3>
      <table class="spells-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Уровень</th>
            <th>Время накладывания</th>
            <th>Дистанция</th>
            <th>Компоненты</th>
            <th>Длительность</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" name="spell0Name" /></td>
            <td><input type="number" name="spell0Level" min="0" max="9" /></td>
            <td><input type="text" name="spell0CastingTime" /></td>
            <td><input type="text" name="spell0Range" /></td>
            <td><input type="text" name="spell0Components" /></td>
            <td><input type="text" name="spell0Duration" /></td>
            <td><button class="delete-row">×</button></td>
          </tr>
        </tbody>
      </table>
      <button class="add-row" data-table="spells-table">
        + Добавить заклинание
      </button>
    </div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    function addRow(tableId) {
      const table = document.querySelector(`.${tableId} tbody`);
      const newRow = table.insertRow();
      const template = table.querySelector("tr").cloneNode(true);
      newRow.innerHTML = template.innerHTML;
      const inputs = newRow.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        const name = input.getAttribute("name");
        const newName = name.replace(/\d+/, table.rows.length - 1);
        input.setAttribute("name", newName);
      });
    }
    document.querySelectorAll(".add-row").forEach((button) => {
      button.addEventListener("click", function () {
        addRow(this.dataset.table);
      });
    });
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-row")) {
        const row = e.target.closest("tr");
        if (row.closest("tbody").rows.length > 1) {
          row.remove();
        }
      }
    });
    function calculateModifier(score) {
      return Math.floor((score - 10) / 2);
    }
    function updateModifiers() {
      const abilities = [
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
      ];
      abilities.forEach((ability) => {
        const score =
          parseInt(document.querySelector(`input[name="${ability}"]`).value) ||
          10;
        const modifier = calculateModifier(score);
        document.querySelector(
          `.ability[data-ability="${ability}"] .modifier`
        ).textContent = modifier >= 0 ? `+${modifier}` : modifier;
      });
    }
    document
      .querySelectorAll(
        'input[name^="strength"], input[name^="dexterity"], input[name^="constitution"], input[name^="intelligence"], input[name^="wisdom"], input[name^="charisma"]'
      )
      .forEach((input) => {
        input.addEventListener("change", updateModifiers);
      });
  });
</script>
