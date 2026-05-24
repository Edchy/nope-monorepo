---
title: "Improving Forms with :user-valid and :user-invalid"
subtitle: "Enhancing User Experience with CSS Pseudo-Classes"
pubDate: 2024-07-01
description: "Simplifying form validation with CSS pseudo-classes"
author: "E3E"
tags: ["css", "nerdstuff", "ux"]
---

What pseudo-classes
difference between psudo-classes and pseudo-elements

Forms

Improve forms with :user-valid and :user-invalid

in:range

```html
<input type="range" min="0" max="100" value="50" class="range-input" />
```

```css
.range-input:valid {
  background-color: lightgreen;
}
.range-input:invalid {
  background-color: lightcoral;
}
```

```html
<input type="text" required pattern="[a-zA-Z]{3,}" class="text-input" />
```

```css
.text-input:valid {
  border-color: green;
}
.text-input:invalid {
  border-color: red;
}
```

```html
<input type="email" required class="email-input" />
```

```css
.email-input:valid {
  border-color: green;
}
.email-input:invalid {
  border-color: red;
}
```

```html
<input type="password" required minlength="8" class="password-input" />
```

```css
.password-input:valid {
  border-color: green;
}

Kolla igenom alla mina notes och göra små posts av. samt allt jag har i min "UX html sida"
```
