---
health: 38
temp_hp: 0
max_hp: 38
death: 0
wound: 0
r_dmg: 0
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

**Health**: `VIEW[{health}][text]`  / `VIEW[{max_hp}][text]`  | Temp: `VIEW[{temp_hp}][text]`
`INPUT[number(class(input-w-hp)):wound]` 
`BUTTON[self-damage]` | `BUTTON[recover-hp]` | `BUTTON[temp]`

`BUTTON[long]`