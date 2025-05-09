import { App, ItemView, WorkspaceLeaf, Modal, Setting, TextComponent } from 'obsidian';

interface Combatant {
    id: string;
    name: string;
    initiative: number;
    maxHp: number;
    currentHp: number;
    tempHp: number;
}

const VIEW_TYPE = 'initiative-tracker-view';

export class InitiativeTrackerView extends ItemView {
    combatants: Combatant[] = [];

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType(): string {
        return VIEW_TYPE;
    }

    getDisplayText(): string {
        return 'Трекер Инициативы и ХП';
    }

    async onOpen(): Promise<void> {
        const container = this.containerEl.children[1];
        container.empty();
        container.addClass('initiative-tracker');

        this.renderTracker(container);
    }

    renderTracker(container: HTMLElement): void {
        // Header with add button
        const header = container.createDiv('initiative-tracker-header');
        const addButton = header.createEl('button', {
            text: 'Добавить участника',
            cls: 'add-combatant-btn'
        });
        addButton.addEventListener('click', () => this.showAddCombatantModal());

        // Combatant list
        const list = container.createDiv('combatant-list');
        this.renderCombatants(list);
    }

    renderCombatants(container: HTMLElement): void {
        container.empty();
        
        // Sort combatants by initiative
        const sortedCombatants = [...this.combatants].sort((a, b) => b.initiative - a.initiative);
        
        sortedCombatants.forEach(combatant => {
            const item = container.createDiv('combatant-item');
            
            // Header with name and initiative
            const header = item.createDiv('combatant-header');
            header.createDiv('combatant-name', { text: combatant.name });
            header.createDiv('combatant-initiative', { text: `Инициатива: ${combatant.initiative}` });
            
            // HP Bar
            const hpBarContainer = item.createDiv('hp-bar-container');
            const hpBar = hpBarContainer.createDiv('hp-bar');
            const tempHpBar = hpBarContainer.createDiv('temp-hp-bar');
            
            const hpPercentage = (combatant.currentHp / combatant.maxHp) * 100;
            const tempHpPercentage = (combatant.tempHp / combatant.maxHp) * 100;
            
            hpBar.style.width = `${hpPercentage}%`;
            tempHpBar.style.width = `${tempHpPercentage}%`;
            
            // HP Text
            item.createDiv('hp-text', {
                text: `ХП: ${combatant.currentHp}/${combatant.maxHp}${combatant.tempHp > 0 ? ` + ${combatant.tempHp} врем.` : ''}`
            });
            
            // Controls
            const controls = item.createDiv('hp-controls');
            const damageInput = controls.createEl('input', {
                type: 'number',
                cls: 'damage-input',
                attr: { placeholder: 'Количество' }
            });
            
            const damageBtn = controls.createEl('button', {
                text: 'Урон',
                cls: 'action-btn damage-btn'
            });
            
            const healBtn = controls.createEl('button', {
                text: 'Лечение',
                cls: 'action-btn heal-btn'
            });
            
            const tempHpBtn = controls.createEl('button', {
                text: 'Временное ХП',
                cls: 'action-btn temp-hp-btn'
            });
            
            // Event listeners
            damageBtn.addEventListener('click', () => {
                const amount = parseInt(damageInput.value) || 0;
                if (amount > 0) {
                    this.applyDamage(combatant.id, amount);
                    damageInput.value = '';
                }
            });
            
            healBtn.addEventListener('click', () => {
                const amount = parseInt(damageInput.value) || 0;
                if (amount > 0) {
                    this.applyHeal(combatant.id, amount);
                    damageInput.value = '';
                }
            });
            
            tempHpBtn.addEventListener('click', () => {
                const amount = parseInt(damageInput.value) || 0;
                if (amount > 0) {
                    this.applyTempHp(combatant.id, amount);
                    damageInput.value = '';
                }
            });
        });
    }

    showAddCombatantModal(): void {
        new AddCombatantModal(this.app, (combatant: Combatant) => {
            this.combatants.push(combatant);
            this.renderCombatants(this.containerEl.children[1].querySelector('.combatant-list'));
        }).open();
    }

    applyDamage(combatantId: string, amount: number): void {
        const combatant = this.combatants.find(c => c.id === combatantId);
        if (!combatant) return;

        if (combatant.tempHp > 0) {
            if (combatant.tempHp >= amount) {
                combatant.tempHp -= amount;
                amount = 0;
            } else {
                amount -= combatant.tempHp;
                combatant.tempHp = 0;
            }
        }

        combatant.currentHp = Math.max(0, combatant.currentHp - amount);
        this.renderCombatants(this.containerEl.children[1].querySelector('.combatant-list'));
    }

    applyHeal(combatantId: string, amount: number): void {
        const combatant = this.combatants.find(c => c.id === combatantId);
        if (!combatant) return;

        combatant.currentHp = Math.min(combatant.maxHp, combatant.currentHp + amount);
        this.renderCombatants(this.containerEl.children[1].querySelector('.combatant-list'));
    }

    applyTempHp(combatantId: string, amount: number): void {
        const combatant = this.combatants.find(c => c.id === combatantId);
        if (!combatant) return;

        combatant.tempHp = amount;
        this.renderCombatants(this.containerEl.children[1].querySelector('.combatant-list'));
    }
}

class AddCombatantModal extends Modal {
    onSubmit: (combatant: Combatant) => void;

    constructor(app: App, onSubmit: (combatant: Combatant) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen(): void {
        const { contentEl } = this;
        contentEl.empty();

        contentEl.createEl('h2', { text: 'Добавить участника' });

        new Setting(contentEl)
            .setName('Имя')
            .addText(text => text
                .setPlaceholder('Введите имя')
                .onChange(() => {}));

        new Setting(contentEl)
            .setName('Инициатива')
            .addText(text => text
                .setPlaceholder('Введите инициативу')
                .onChange(() => {}));

        new Setting(contentEl)
            .setName('Максимальное ХП')
            .addText(text => text
                .setPlaceholder('Введите максимальное ХП')
                .onChange(() => {}));

        new Setting(contentEl)
            .addButton(btn => btn
                .setButtonText('Добавить')
                .onClick(() => {
                    const nameInput = contentEl.querySelector('input[placeholder="Введите имя"]') as HTMLInputElement;
                    const initiativeInput = contentEl.querySelector('input[placeholder="Введите инициативу"]') as HTMLInputElement;
                    const maxHpInput = contentEl.querySelector('input[placeholder="Введите максимальное ХП"]') as HTMLInputElement;

                    const name = nameInput.value;
                    const initiative = parseInt(initiativeInput.value) || 0;
                    const maxHp = parseInt(maxHpInput.value) || 0;

                    if (name && maxHp > 0) {
                        this.onSubmit({
                            id: Date.now().toString(),
                            name,
                            initiative,
                            maxHp,
                            currentHp: maxHp,
                            tempHp: 0
                        });
                        this.close();
                    }
                }));
    }

    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default class InitiativeTrackerPlugin {
    async onload() {
        this.registerView();
    }

    registerView() {
        this.app.workspace.registerLeafView(VIEW_TYPE, (leaf) => new InitiativeTrackerView(leaf));
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE);
    }
} 