# Tractian dashboard 
This was created as a solution for the [challenge proposed by Tractian](https://github.com/tractian/challenges/blob/main/front-end/README.md) for their front-end engineering position.

### [Video demonstration](https://www.youtube.com/embed/XRcbedv6eec?si=ACddTl1PgcBFoUkx)

## How to run
Install dependencies
```
npm install
```
Run in dev mode
```
npm run dev
```
## What I would improve
The main thing I would like to do is to clarify some of the requirements. I tried to infer the most reasonable implementation based on the information that was given, but having direct contact with a UX team and/or even the client would be nice for clarifying some of the use cases and user flows.

The CSS could be more modular, but since no one will ever use it, it felt unnecessary.

The performance for the third company is acceptable, but I don't know if it could handle a bigger company with, say, double that size. I started working on an algorithm to virtualize the tree and limit the number of nodes without having to flatten the structure into a list, looking to preserve the accessibility of the "details" element in HTML and scroll position handling, but there are too many edge cases and I didn't have the time to find an elegant enough implementation that accounted for all of them.

Unit and integration tests would also be nice, but again, I am not going to write tests for code that will never be used or refactored. Hopefully that's okay with you!
