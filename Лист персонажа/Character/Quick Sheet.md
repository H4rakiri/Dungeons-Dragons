---
tags: 
health: 38
temp_hp: 0
max_hp: 38
ship_hp: 150
max_ship_hp: 150
death: 0
wound: 0
r_dmg: 0
damage: 0
---
```meta-bind-button
label: "Wound"
style: destructive
hidden: true
id: "self-damage"
actions:
  - type: updateMetadata
    bindTarget: r_dmg
    evaluate: true
    value: getMetadata('wound') >= getMetadata('temp_hp') && getMetadata('wound') - getMetadata('temp_hp') || getMetadata('death')
  - type: updateMetadata
    bindTarget: temp_hp
    evaluate: true
    value: getMetadata('wound') <= x && x - getMetadata('wound') || getMetadata('death')
  - type: updateMetadata
    bindTarget: health
    evaluate: true
    value: getMetadata('death') <= x - getMetadata('r_dmg') && x - getMetadata('r_dmg') || getMetadata('death')
  - type: updateMetadata
    bindTarget: wound
    evaluate: true
    value: getMetadata('death')
  - type: updateMetadata
    bindTarget: r_dmg
    evaluate: true
    value: getMetadata('death')
```
```meta-bind-button
label: "Recover"
style: primary
hidden: true
id: "recover-hp"
actions:
  - type: updateMetadata
    bindTarget: health
    evaluate: true
    value: getMetadata('max_hp') >= x + getMetadata('wound') && x + getMetadata('wound') || getMetadata('max_hp')
  - type: updateMetadata
    bindTarget: wound
    evaluate: true
    value: getMetadata('death')
```
```meta-bind-button
label: "Vitality"
style: primary
hidden: true
id: "vitality"
actions:
  - type: updateMetadata
    bindTarget: temp_hp
    evaluate: true
    value: 15
```
```meta-bind-button
label: "Damage"
style: destructive
hidden: true
id: "ship-damage"
actions:
  - type: updateMetadata
    bindTarget: ship_hp
    evaluate: true
    value: getMetadata('death') <= x - getMetadata('damage') && x - getMetadata('damage') || getMetadata('death')
  - type: updateMetadata
    bindTarget: damage
    evaluate: true
    value: getMetadata('death')
```
```meta-bind-button
label: "Repairs"
style: primary
hidden: true
id: "repair-ship"
actions:
  - type: updateMetadata
    bindTarget: ship_hp
    evaluate: true
    value: getMetadata('max_ship_hp') >= x + getMetadata('damage') && x + getMetadata('damage') || getMetadata('max_ship_hp')
  - type: updateMetadata
    bindTarget: damage
    evaluate: true
    value: getMetadata('death')
```
```meta-bind-button
label: "Temp HP"
style: primary
hidden: true
id: "temp"
actions:
  - type: updateMetadata
    bindTarget: temp_hp
    evaluate: true
    value: getMetadata('wound')
```
```meta-bind-button
label: "Long Rest"
style: primary
hidden: true
id: "long"
actions:
  - type: updateMetadata
    bindTarget: health
    evaluate: true
    value: getMetadata('max_hp')
```

# Player

## [Warlock](Assets/SRD_2014/Character%20Options/Classes/Warlock/Warlock.md)
**Level**: 5
**AC**: 17
**Initiative**: +2
**Proficiency**: +3
**Health**: `VIEW[{health}][text]`  / `VIEW[{max_hp}][text]`   *Temp*: `VIEW[{temp_hp}][text]`
`INPUT[number(class(input-w-hp)):wound]` `BUTTON[self-damage]`  `BUTTON[recover-hp]` 
`BUTTON[temp]` `BUTTON[long]`


```ad-abilities
collapse: closed

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
|  19 (4) |  14 (2) |  14 (2) |  11 (0) |  14 (2) |  20 (5) |
| 4 | 2 | 2 | 0 | 5 | 8 |



|                  |     |                        |     |
|:------------------------- |:---:|:------------------------------- |:---:|
| Acrobatics (**Dex**)      | +2  | Medicine (**Wis**)              | +2  |
| Animal Handling (**Wis**) | +2  | Nature (**Int**)                | +0  |
| Arcana (**Int**)          | +3  | Perception (**Wis**)            | +5  |
| Athletics (**Str**)       | +7  | Performance (**Cha**)           | +5  |
| Deception (**Cha**)       | +5  | Persuasion (**Cha**)            | +5  |
| History (**Int**)         | +0  | Religion (**Int**)              | +3  |
| Insight (**Wis**)         | +2  | Sleight of Hand (**Dex**)&nbsp; | +2  |
| Intimidation (**Cha**)    | +5  | Stealth (**Dex**)               | +2  |
| Investigation (**Int**)   | +0  | Survival (**Wis**)              | +5  |
				
```
# 

- !!!col
	- 1
		```ad-actions
		>| Action   |  Range   | Hit/DC  | Damage |
		>|:-------- |:------:|:-----:|:---------: |
		>| **Battleaxe**  | 5 | +8  | `1d8+5`/`1d10+5`|
		>| **Glaive** | 10 | +8  | `1d10+5`  |
		>| **Greataxe**  |    5     |   +8    | `1d12+5`    |
		>| [Grapple](Grapple.md) |    5   | STR&nbsp;15  | -    |
		>| [Shove](Shove.md) |    5     | STR 15 | -        |
		>
		>| Cantrip               |    Range     | Hit/DC | Effect   |
		>|:--------------------- |:------------:|:------:|:--------: |
		>| [Eldritch Blast](eldritch-blast.md) *(x2)* |   120    |   +8   | `1d10+5` |
		>| [Mage Hand](mage-hand.md)             |    30    |   -    | Utility  |
		>| [Mind Sliver](mind-sliver.md)           |    60   | INT 16 | `2d6`    |
		>| [Sword Burst](sword-burst.md)           | 5 | DEX 16 | `2d6`    |
		>
		>| Spell <br><input type="checkbox"><input type="checkbox">                             |     Range     | Hit/DC | Effect |
		>|:--------------------------------- |:-------------:|:------:|:------: |
		>| [Arms-of-hadar](arms-of-hadar.md) | 10 ft. | STR 16 | `4d6`  |
		>| [Shatter](shatter.md)             |    60 ft.     | CON 16 | `4d8`  |
		```


					
	- 1
		```ad-bonusaction
		>| Spell                    | Range  | Hit/DC | Effect            |
		>|:------------------------ |:------:|:------:|:-----------------: |
		>| [Hex](hex.md)            | 90 ft. |   -    | +`1d6`            |
		>| Telekenetic: Shove       | 30 ft. | STR&nbsp;16 | Utility |
		```
		```ad-reaction
		>| Spell          |    Range     | Hit/DC | Effect  |
		>|:-------------- |:------------:|:------:|:-------:|
		>| Counterspell   | 60 ft.&nbsp; |   -    | Utility |
		```
		```ad-resistances
		collapse: closed
		- *Advantage* against being Charmed
		- *Immune* to Magical Sleep
		```
		```ad-senses
		collapse: closed
		- Passive Perception: 15
		- Passive Investigation: 10
		- Passive Insight: 12
		- Darkvision: 60 ft.
		```

`````ad-hint
title: Other Info
collapse: closed

````col
```col-md
flexGrow=1
===
## Features & Traits
### Class Features:

- [[Assets/SRD_2014/Character Options/Classes/Warlock/Warlock#Pact Magic|Pact Magic]]
- [[Pact of the Blade]]

### Invocations:

- [[Assets/SRD_2014/Character Options/Classes/Warlock/Warlock#Improved Pact Weapon|Improved Pact Weapon]]
- [[Assets/SRD_2014/Character Options/Classes/Warlock/Warlock#Agonizing Blast|Agonizing Blast]]
- [[Assets/SRD_2014/Character Options/Classes/Warlock/Warlock#Thirsting Blade|Thirsting Blade]]

### Feats:

- [Telekenetic](Magic%20Feats#Telekinetic)
- [[Magic Feats#Eldritch Adept|Eldritch Adept]]

### Speed
- Walking: 30 ft. 
```

```col-md
flexGrow=1.5
===
## Proficiencies & Training
### Armor
- [Light Armor](Assets/SRD_2014/Playing%20the%20Game/Equipment/Armor.md)
### Weapons
- [Simple Weapons](Weapons.md) 
### Tools
- Jeweler's Tools 
- Navigator's Tools 
- Vehicles (Water)
### Languages
- Celestial 
- Common 
- Elvish 
- Primordial 
```
````
`````
# 
```ad-statblock
title: Ship Stats
collapse: closed

# Explorer Class Longship (Gargantuan Vehicle)

- **Armor Class**: 16  
- **Damage Threshold**: 15
> **Ship Health**: `VIEW[{ship_hp}][text]`  / `VIEW[{max_ship_hp}][text]`
> <span></span> 
> `INPUT[number:damage]` `BUTTON[ship-damage]` | `BUTTON[repair-ship]`
# 

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 18 (+4) | 9 (-1) | 15 (+2) | 10 (+0) | 10 (+0) | 10 (+0) |

# 

- **Damage Immunities**: poison, psychic  
- **Condition Immunities**: blinded, charmed, deafened, exhaustion, frightened, incapacitated, paralyzed, petrified, poisoned, prone, stunned, unconscious

# 

- **Creature Capacity**: 14 Crew, 10 Passengers
- **Cargo**: 2 tons
- **Travel Pace**: 6 miles per hour (140 miles per day)
- **Combat Movement (Oars)**: 20 ft. (requires 10 crew)
- **Combat Movement (Sails)**: 50 ft. 
- **Cost**: 6,500 gp
- **Special**: Able to portage
```

# 

````ad-spells
collapse: closed

[Spell Lists](Spell%20Lists.md)

````
# 

>[!danger | bg-c-green]- Action References
>>[!cards| dataview]
>> ```dataview 
TABLE
FROM #5eAction
SORT file.link ASC

# 

>[! important  |color-yellow n-th]- Conditions
>```dataview
>TABLE WITHOUT ID file.link AS Type, effect
>FROM #5econdition
>SORT file.link ASC
>```

# 

> [!example]- Rules Reference
>>[!cards| dataview]
>>```dataview
>>TABLE 
>>FROM #5er-ref
>>SORT file.link ASC



# 
