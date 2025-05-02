---
ship_hp: 150
max_ship_hp: 150
death: 0
damage: 0
---
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

**Ship Health**: `VIEW[{ship_hp}][text]`  / `VIEW[{max_ship_hp}][text]` `INPUT[number:damage]` `BUTTON[ship-damage]` | `BUTTON[repair-ship]`
