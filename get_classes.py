import re
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
classes = set(re.findall(r'class=\"([^\"]+)\"', content))
all_classes = set()
for c in classes:
    all_classes.update(c.split())
print(sorted(list(all_classes)))
