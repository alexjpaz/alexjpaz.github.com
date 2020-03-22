---
layout: home-live
---

<h2>Projects</h2>

{% for project in site.projects %}
<h3>
    <a href="{{ project.url }}">{{ project.name }}</a>
</h3>
<p>{{ project.content | markdownify }}</p>
{% endfor %}


