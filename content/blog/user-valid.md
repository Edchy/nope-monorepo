---
title: "Improving Forms with :user-valid and :user-invalid"
description: "Simplifying form validation with CSS pseudo-classes"
date: 2024-07-01
tags: [css, nerdstuff, ux]
draft: false
color: "5"
---

CSS has had `:valid` and `:invalid` pseudo-classes for a while. The problem with them is that they apply immediately — before the user has even touched the field. An empty required input shows as `:invalid` the moment the page loads, which looks broken and feels aggressive.

`:user-valid` and `:user-invalid` fix that. They only kick in after the user has actually interacted with the field — typed something, then left. Same logic, better timing.

```css
input:user-invalid {
  border-color: red;
}

input:user-valid {
  border-color: green;
}
```

That's it. The browser handles the validation rules you've already declared in HTML (`required`, `type="email"`, `minlength`, etc.) — you just style the result.

Compare the two approaches:

```css
/* fires immediately on page load — bad UX */
input:invalid { border-color: red; }

/* fires only after the user has interacted — good UX */
input:user-invalid { border-color: red; }
```

Browser support is solid in modern browsers. If you need to support older ones, `:user-invalid` degrades gracefully — fields just won't show validation styles, which is better than showing wrong ones.

A small CSS upgrade that removes a lot of JavaScript you'd otherwise write to track "has this field been touched yet."
