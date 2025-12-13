# Array of component IDs
$components = @(
  "aspect_ratio", "avatar", "badge",
  "breadcrumb", "button", "button_group", "calendar", "card", "carousel",
  "chart", "checkbox", "collapsible", "combobox", "command", "context_menu",
  "data_table", "date_picker", "dialog", "drawer", "dropdown_menu", "empty",
  "field", "form", "hover_card", "input", "input_group", "input_otp",
  "item", "kbd", "label", "menubar", "navigation_menu", "pagination",
  "popover", "progress", "radio_group", "resizable", "scroll_area", "select",
  "separator", "sheet", "sidebar", "skeleton", "slider", "sonner",
  "spinner", "switch", "table", "tabs", "textarea", "toast",
  "toggle", "toggle_group", "tooltip"
)

# Create components directory
New-Item -ItemType Directory -Force -Path ".\src\components\ui" | Out-Null

# Create each component file
foreach ($component in $components) {
  New-Item -ItemType File -Path ".\src\components\ui\$component.js" -Force | Out-Null
  Write-Host "✓ Created: $component.js" -ForegroundColor Green
}

Write-Host "`n✨ Successfully created $($components.Count) component files!" -ForegroundColor Cyan
