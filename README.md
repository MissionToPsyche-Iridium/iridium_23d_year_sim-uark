# Iridium 23D UARK: Informational Psyche Webpage

The Iridium 23D UARK project is apart of other projects that are part of the Psyche mission. The Psyche mission is a NASA mission to explore the asteroid 16 Psyche, which is believed to be the exposed metallic core of a protoplanet. This webpage serves as an informational resource for the mission, providing the general public with educational, informational, and interactive visuals.

## Screenshots

![Homepage Screenshot](../iridium_23d_year_sim-uark/psyche-website/public/screenshots/homepage.png)

### Psyche Size Comparison

![Psyche Size Comparison Screenshot](../iridium_23d_year_sim-uark/psyche-website/public/screenshots/psyche-size-comp.png)

Here is a screenshot of the Psyche size comparison page. This page provides an interactive visual that compares the size of the asteroid Psyche to other celestial bodies, including Earth and Mars. The user can click on the "Compare" button to see the size comparison in real-time.

![Psyche Size Comparison Screenshot](../iridium_23d_year_sim-uark/psyche-website/public/screenshots/psyche-size-comp2.png)

### Year of Psyche Mission Animation

![Year of Psyche Mission Animation Screenshot](../iridium_23d_year_sim-uark/psyche-website/public/screenshots/psyche-year-animation.png)

Here is a screenshot of the Psyche year animation page. This page provides an interactive visual that shows the year of the Psyche mission. The user can click on the "Start" button to see the animation in real-time.

### Psyche Orbital Visualization

![Psyche Orbital Visualization Screenshot](../iridium_23d_year_sim-uark/psyche-website/public/screenshots/psyche-orbital.png)

When the use clicks on the "Click to Explore" button, the user is taken to a new page that provides an interactive visual of the Psyche orbital visualization. The user can then see the 4 different orbits of the Psyche mission.

![Psyche Orbital Visualization Screenshot](../iridium_23d_year_sim-uark/psyche-website/public/screenshots/psyche-orbital2.png)

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/MissionToPsyche-Iridium/iridium_23d_year_sim-uark.git

cd iridium_23d_year_sim-uark
```

Then, install the dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Current Issues

Currently, React + Next.js has a current file size limit of 50 MB. This is a problem because there are some files that are larger than 50 MB. This is a problem because the files are too large to be uploaded to the server. We tried to use `Microsoft Azure` to upload the files, but it was too large to use consistently. This has caused for smartphones (iPhones and Androids) to not be able to load the files in time (over 2 seconds at times).

Similarly to smartphones, some vertical screens like iPads and other tablets have the same issue in portrait or vertical mode. In protrait mode, the components and visuals become crunched together and the user is unable to see the visuals properly. However, in landscape mode, the visuals are able to be seen properly.

On the contrary, the website works for most desktop computers and laptops. However, the issue becomes when the screen is too wide (think over 26-28 inches). The visuals become too wide and the user is unable to see the components properly. 
