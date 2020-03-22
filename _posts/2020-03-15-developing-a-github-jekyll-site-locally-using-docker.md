---
layout: post-live
tags:
  - docker
  - jekyll
  - github
---

# Why would anyone want to do this?

I wanted to start practicing writing a dev blog for my various interests. While my [homepage](https://alexjpaz.com) is built on [netlify and gatsby](https://github.com/alexjpaz/alexjpaz.com/tree/master/packages/home-gatsby) I didn't want to scale out each potential project in my github account with with a deployment pipeline and have the nightmare of mainting it and applying security patches (I've had to update my homepage project several times after running `npm audit fix`). 

While I appreciate github alerting me when ther is a new security vunerablity and I have a duty as an software engineer to respond . I want to write, create, and explore my interests for *fun*, not another job (One reason I never seriously considered playing *Death Stranding*).

Therefore I started exploring – or rather rediscovering – using github pages and jekyll. However, it became appartent that I needed to develop a way to see my changes while I was making edits to my posts.

A typical development cycle is to install jekyll on your workstation and run it locally. I typically like to keep my development free of installed packages. I also tend to hop from machine to machine and from project to project. My common practice is to create an single entrypoint in the project to boostrap everything a contributor would need to start coding right away.

>
1. Clone the repository
2. Run the entrypoint script (in this case Make)
3. Start coding

As a bonus, this is a fun little meta post on how I finally getting started on a project rather than *thinking  about starting a project*.

# Running jekyll in a container

Docker hub provided an image [`jekyll/jekyll`](https://hub.docker.com/r/jekyll/jekyll/) that you can use to generate and serve files from your project.

```
docker run -p 4000:4000 jekyll/jekyll jekyll serve
```

Since I didn't want to remember that command I wrote a small [docker-compose file](/docker-compose.yml) to simplify my development environment.

```yaml
version: "3"

services:
  jekyll:
    image: "jekyll/jekyll:builder"
    ports:
      - "4000:4000"
    volumes:
      - ./:/srv/jekyll
    environment:
      "JEKYLL_ENV": "development"
    command:
      - jekyll
      - serve
```

Running the command `docker-compose up` will start the services and you should see the following output in your terminal:

```
ʕ •ᴥ•ʔ docker-compose up
Starting alexjpazgithubcom_jekyll_1 ... done
Attaching to alexjpazgithubcom_jekyll_1
jekyll_1  | ruby 2.6.5p114 (2019-10-01 revision 67812) [x86_64-linux-musl]
jekyll_1  | Configuration file: /srv/jekyll/_config.yml
jekyll_1  |             Source: /srv/jekyll
jekyll_1  |        Destination: /srv/jekyll/_site
jekyll_1  |  Incremental build: disabled. Enable with --incremental
jekyll_1  |       Generating...
jekyll_1  |        Jekyll Feed: Generating feed for posts
jekyll_1  |                     done in 0.709 seconds.
jekyll_1  |  Auto-regeneration: enabled for '/srv/jekyll'
jekyll_1  |     Server address: http://0.0.0.0:4000
jekyll_1  |   Server running... press ctrl-c to stop.
```

You can then open your browser to `http://localhost:4000` and you should see your generated site!

### Other goodies

Typically with web frameworks such as `webpack` and command-line tools like `entr` there is the concept of "live reloading" or reloading the application when there is changes made to a project.

Doing a quick search I landed on `livejs` and including this in my layouts for jekyll

```html
<script type="text/javascript" src="http://livejs.com/live.js"></script>
```

## What is next?

I'm going to try and keep writing and hopefully I start improving my writing skills. I'm hoping to start another article about creating a game in the browser or [pico-8](https://www.lexaloffle.com/pico-8.php).
