# Life Timeline Explorer

A React application for visualizing and exploring events across time, built with TypeScript and Vite.

## Prerequisites
* Node.js (v18 or higher)
* npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/username/life-timeline-explorer.git
cd life-timeline-explorer
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```
The application will be available at http://localhost:5173

## Project Structure
```
src/
  ├── components/         # React components
  │   ├── EventCard       # Individual event display
  │   ├── EventFilter     # Date range filtering
  │   └── EventList       # Main event list component
  ├── services/           # API and data services
  ├── types/              # TypeScript type definitions
  ├── data/               # Sample calendar data
```

## Scripts
* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run preview` - Preview production build
* `npm run lint` - Run ESLint
* `npm run test:run` - run tests

## Design Decisions
* I chose to use React built with Vite as it's the tooling combo I'm most familiar with. I also used typescript for type safety. 

* Uses global css and css variables for theming. This seems fine for a smaller application like this, but may not be sufficient for larger applications. 

* Uses React's useState for local state, which is simple and works for this scale, but if the app grows, using React's context API could be more appropriate for event caching and so that state is more easliy shared across components.

* Uses flat array of events that are all loaded from a file. In a production version of this application, implementing a pagination/chunking strategy could be worthwhile depending on how many events we expect to load from the backend.  

* The events are all simply renderered to the dom. It could be better for performance to use a virtualized list if we expect more events to be shown, or if the dom nodes become more complicated to render. Performance could also be improved by memoizing the EventCards. The state management could be improved by consolidating it into a single object - this would reduce re-renders. 

* Uses a simple directory structure that separates the view from data handling and business logic. Includes a service layer so that api interactions can be added more easily if needed. This layer acts as a centralized location for interacting with backend APIs, abstracting the logic away from the react components. At this scale though, this service layer is arguably overkill. 

* Assumes the event data is properly formatted and safe to process without validation. I made this assumption because in a production environment, the data would have been validated on it's way into the system. 

* UI/UX - the flat list could of events could be greatly improved. As it is, it's difficult to get a sense of where in time you are as you scroll through the events. It's hard to get a sense of what or how much happened in any given period of time with this UI. That said, I chose a simple UI like this because this application does not have a well defined usecase. Some potential improvements that could be made anyway:
  * sticky headings to group the events by month and year - so the user has an idea about where they are in time in the list.
  * stacked year/month buttons on the side to reflect the timeline, so the user can quickly navigate to the desired period of time.
  * color code by event type - so the user can glean the types of activities that their time is composed of.
  * extra filters for the user to group events by type or any other relevant dimension - may help extract insights about how their time is spent

Other improvements that could be considered
* telemetry
* loading/error states/error boundaries