<p align="center">
   <br/>
   <a href="https://monmatos.org" target="_blank"><img src="https://monmatos.org/favicon.ico" width="80px"/></a>
   <h3 align="center">MonMatos</h3>
   <p align="center">Scouting equipement management tool</p>
   <br/>
</p>


## The stack

- [Typescript](https://www.typescriptlang.org)
- [Next.js](https://nextjs.org)
- [Next-Auth.js](https://next-auth.js.org)
- [tRPC](https://trpc.io/)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [Planetscale](https://planetscale.com)
- [Vercel](https://vercel.com)

## Installation

### Requirements
- [Node.js](https://nodejs.org) installed
- [MySQL](https://dev.mysql.com/) database (local or remote)  
  
_NOTE : you can use another sql database engine (PostgreSQL, SQLite, etc.) but make sure that your engine supports_ `prisma/schema.prisma` _types (eg: enums, list of primitives, etc.)._  
  
_You can use [Planetscale](https://planetscale.com) or [Railway](https://railway.app) free tiers to have a database running in 2 minutes._

1. Clone the repository

```bash
$ git clone https://github.com/omelette-watin/monmatos
```
2. Install dependencies

```bash
$ npm install
```

3. Set up database
- rename `.env.example` to `.env` 
- specify a database url in `DATABASE_URL` environement variable
- apply schema to this database : 

```bash
$ npx prisma db push
```

4. Start the developpement server

```bash
$ npm run dev
``` 

5. Visit the app on your [browser](http://localhost:3000)
